import React from 'react';
import { Service, Client, Order, Review, Payment, ResponseTypes, TableNames } from '../../types/tableTypes.ts';
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable, ColumnDef} from '@tanstack/react-table';

import AxiosTableData from '../../services/AxiosTableData.ts';

const clientColumnHelper = createColumnHelper<Client>()
const serviceColumnHelper = createColumnHelper<Service>()
const orderColumnHelper = createColumnHelper<Order>()
const reviewColumnHelper = createColumnHelper<Review>()
const paymentsColumnHelper = createColumnHelper<Payment>()


const columnsMap: Record<TableNames, ColumnDef<any, any>[]> = {
	clients:  [
		clientColumnHelper.accessor('id', {
			  header: () => <span>ID</span>,
		}),
		clientColumnHelper.accessor('first_name', {
			  header: () => <span>Имя</span>,
		}),
		clientColumnHelper.accessor('last_name', {
		  header: () => <span>Фамилия</span>,
		}),
		clientColumnHelper.accessor('phone', {
			  header: () => <span>Телефон</span>,
		}),
		clientColumnHelper.accessor('email', {
			  header: () => <span>Почта</span>,
		}),
		clientColumnHelper.accessor('registration_date', {
		  header: () => <span>Дата регистрации</span>
		}),
	],
  	services: [
		serviceColumnHelper.accessor('id', {
			  header: () => <span>ID</span>,
		}),
		serviceColumnHelper.accessor('name', {
			  header: () => <span>Услуга</span>,
		}),
		serviceColumnHelper.accessor('description', {
			  header: () => <span>Описание</span>,
		}),
		serviceColumnHelper.accessor('price', {
			  header: () => <span>Цена</span>,
		})
	],
	orders: [
		orderColumnHelper.accessor('id', {
			  header: () => 'ID',
		}),
		orderColumnHelper.accessor('service_id', {
			  header: () => 'ID Услуги',
		}),
		orderColumnHelper.accessor('client_id', {
			  header: () => <span>ID Клиента</span>,
		}),
		orderColumnHelper.accessor('status', {
			  header: () => <span>Статус</span>,
		}),
  	],
	reviews: [
		reviewColumnHelper.accessor('id', {
		  header: () => <span>ID</span>,
		}),
		reviewColumnHelper.accessor('service_id', {
			  header: () => <span>ID Сервиса</span>,
		}),
		reviewColumnHelper.accessor('client_id', {
		  header: () => <span>ID Клиента</span>
		}),
		reviewColumnHelper.accessor('review_date', {
			  header: () => <span>Дата отзыва</span>,
		}),
		reviewColumnHelper.accessor('rating', {
			  header: () => <span>Оценка</span>,
		}),
		reviewColumnHelper.accessor('text', {
			  header: () => <span>Текст</span>,
		}),
  	],
	payments: [
		paymentsColumnHelper.accessor('id', {
			  header: () => <span>ID</span>,
		}),
		paymentsColumnHelper.accessor('order_id', {
			  header: () => <span>ID Заказа</span>,
		}),
		paymentsColumnHelper.accessor('payment_date', {
			  header: () => <span>Дата платежа</span>,
		}),
		paymentsColumnHelper.accessor('payment_method', {
			  header: () => <span>Метод оплаты</span>,
		}),
  	]
}

interface GenericTableProps {
  name_table: TableNames;
}
 
function GenerateTableView({ name_table }: GenericTableProps) {
  	const [data, setData] = React.useState<ResponseTypes[]>([]);
  	const rerender = React.useReducer(() => ({}), {})[1]
  	const apiUrl = import.meta.env.VITE_API_URL;

  	// Выбор столбцов в зависимости от name_table
  	const choosen_columns = columnsMap[name_table];

  	console.log('choosen_columns', choosen_columns)

  	const table = useReactTable({
  	  	data,
  	  	columns: choosen_columns,
  	  	getCoreRowModel: getCoreRowModel(),
  	});

  	const fetchData = async () => {
  	  	try {
  	  	  	const formData = new FormData();
  	  	  	formData.append('name_table', name_table);
  	  	  	const response = await AxiosTableData(`${apiUrl}/database/get_table`, 'POST', formData);
  	  	  	if (Array.isArray(response)) {
				setData(response as ResponseTypes[]);
			} else {
				console.error('Expected an array but received:', response);
			}
  	  	  	console.log(response)
  	  	} catch (error) {
  	  	  	console.error('Error posting data:', error);
  	  	}
  	};

  	const handleRerenderAndFetch = async () => {
  	  	await fetchData();
  	  	rerender();
  	};

  	React.useEffect(() => {
  	  	fetchData();
  	}, [name_table]);

  	if (!table) {
  	  	return <div color='black'>Loading...</div>; // Показываем индикатор загрузки, пока таблица не инициализирована
  	}

  	return (
  	  	<div className="p-2">
  	  	  	<table>
  	  	  	  	<thead>
  	  	  	  	  	{table.getHeaderGroups().map(headerGroup => (
  	  	  	  	  	  	<tr key={headerGroup.id}>
  	  	  	  	  	  	  	{headerGroup.headers.map(header => (
  	  	  	  	  	  	  	  	<th key={header.id}>
  	  	  	  	  	  	  	  	  	{header.isPlaceholder
  	  	  	  	  	  	  	  	  	  	? null
  	  	  	  	  	  	  	  	  	  	: flexRender(
  	  	  	  	  	  	  	  	  	  	    header.column.columnDef.header,
  	  	  	  	  	  	  	  	  	  	    header.getContext()
										)
									}
  	  	  	  	  	  	  	  	</th>
  	  	  	  	  	  	  	))}
  	  	  	  	  	  	</tr>
  	  	  	  	  	))}
  	  	  	  	</thead>
  	  	  	  	<tbody>
  	  	  	  	  	{table.getRowModel().rows.map(row => (
  	  	  	  	  	  	<tr key={row.id}>
  	  	  	  	  	  	  	{row.getVisibleCells().map(cell => (
  	  	  	  	  	  	  	  	<td key={cell.id}>
  	  	  	  	  	  	  	  		{flexRender(cell.column.columnDef.cell, cell.getContext())}
  	  	  	  	  	  	  	  	</td>
  	  	  	  	  	  	  		))
							}
  	  	  	  	  	  	</tr>
  	  	  	  	  	))}
  	  	  	  	</tbody>
  	  	  	  	<tfoot>
  	  	  	  	  	{table.getFooterGroups().map(footerGroup => (
  	  	  	  	  	  	<tr key={footerGroup.id}>
  	  	  	  	  	  	  	{footerGroup.headers.map(header => (
  	  	  	  	  	  	  	  	<th key={header.id}>
  	  	  	  	  	  	  	  	  	{header.isPlaceholder
  	  	  	  	  	  	  	  	  	  	? null
  	  	  	  	  	  	  	  	  	  	: flexRender(
  	  	  	  	  	  	  	  	  	  	  	header.column.columnDef.footer,
  	  	  	  	  	  	  	  	  	  	  	header.getContext()
  	  	  	  	  	  	  	  	  		)
									}
  	  	  	  	  	  	  	  	</th>
  	  	  	  	  	  	  	))}
  	  	  	  	  	  	</tr>
  	  	  	  	  	))}
  	  	  	  	</tfoot>
  	  	  	</table>
  	  	  	<div className="h-4"/>
  	  	  	<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  	  	  	  <button onClick={handleRerenderAndFetch} className='defaultButton' style={{margin: '1%'}}>Обновить данные</button>
  	  	  	</div>
  	  	</div>
  	)
}

export default GenerateTableView