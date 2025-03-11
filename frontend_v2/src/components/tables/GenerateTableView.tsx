import React from 'react';
import axios from 'axios';

import { flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';

import { ResponseTypes, TableNames } from '../../types/TableTypes.ts';

import UniversalAxiosRequest from '../../services/UniversalAxiosRequest.ts';
import CreateColumnsMap from '../../services/CreateColumnsMap.tsx';
import GenerateAddDataForm from './GenerateAddDataForm.tsx';

interface GenerateTableViewProps {activeTable: TableNames}
function GenerateTableView({ activeTable }: GenerateTableViewProps) {
	const [tableData, setTableData] = React.useState<ResponseTypes[]>([]);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null); // Состояние для сообщения об ошибке
	const rerender = React.useReducer(() => ({}), {})[1]
	const apiUrl = import.meta.env.VITE_API_URL;
	
	const handleRerenderAndGetTableData = async () => {
		await getTableData();
		rerender();
  	};
	React.useEffect(() => {
		getTableData();
  	}, [activeTable]);
	
	const handleSetErrorMessage = (message: string | null) => {
        setErrorMessage(message);
        if (message) {
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };
	
  	const getTableData = async () => {
  	  	try {
  	  	  	const name_table = new FormData();
  	  	  	name_table.append('name_table', activeTable);
  	  	  	const response = await UniversalAxiosRequest(`${apiUrl}/database/get_table`, 'POST', name_table);
			setTableData(response as ResponseTypes[]);
  	  	} catch (error) {
			const errorMessage = axios.isAxiosError(error) && error.response ? error.response.data.detail || 'Неизвестная ошибка!': 'Неизвестная ошибка !';
			setErrorMessage(errorMessage);
  	  	}
  	};

  	
	//Получение столбцов
	const columnsMap = CreateColumnsMap(activeTable, handleRerenderAndGetTableData, handleSetErrorMessage)
  	const choosen_columns = columnsMap[activeTable];

  	const renderedTable = useReactTable({data: tableData, columns: choosen_columns,getCoreRowModel: getCoreRowModel()});

  	if (!renderedTable) {
  	  	return <div color='black'>Loading...</div>;
  	}
	  
  	return (
  	  	<div className='activeTable'>
  	  	  	<table>
  	  	  	  	<thead>
  	  	  	  	  	{renderedTable.getHeaderGroups().map(headerGroup => (
  	  	  	  	  		<tr key={headerGroup.id}>
  	  	  	  	  		  	{headerGroup.headers.map(header => (
  	  	  	  	  		  	  	<th key={header.id}>
  	  	  	  	  		  	  	  	{header.isPlaceholder? null : flexRender(header.column.columnDef.header, header.getContext())}
  	  	  	  	  		  	  	</th>
  	  	  	  	  		  	))}
  	  	  	  	  		</tr>
  	  	  	  	  	))}
  	  	  	  	</thead>
  	  	  	  	<tbody>
  	  	  	  	  	{renderedTable.getRowModel().rows.map(row => (
  	  	  	  	  	  	<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} id={`${cell.column.id}-${row.id}`} data-value={cell.getValue()}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}

						</tr>
  	  	  	  	  	))}
  	  	  	  	</tbody>
  	  	  	  	<tfoot>
					<GenerateAddDataForm activeTable={activeTable} onSave={handleRerenderAndGetTableData} setErrorMessage={handleSetErrorMessage}/>
  	  	  	  	</tfoot>
  	  	  	</table>
  	  	  	{errorMessage && <div className="error-message">{errorMessage}</div>} {/* Отображаем сообщение об ошибке */}
  	  	</div>
  	)
}

export default GenerateTableView