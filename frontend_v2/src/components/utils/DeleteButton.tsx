import React from 'react';
import axios from 'axios';

import { Row, Cell } from '@tanstack/react-table';

import UniversalAxiosRequest from '../../services/UniversalAxiosRequest';

import '../../styles/components.css';

interface RowData {id: number}
interface DeleteButtonProps {
    row: Row<RowData>
    activeTable: string
    onSave: () => void
    setErrorMessage: (message: string | null) => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({row, activeTable, onSave, setErrorMessage}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleButtonClick = async (rowId: number) => {
        try {
            const deleteData = new FormData()
            deleteData.append('name_table', activeTable)
            deleteData.append('row_id', rowId.toString())
            await UniversalAxiosRequest(`${apiUrl}/database/delete_data`, 'DELETE', deleteData)
            setErrorMessage(null)
            onSave()
        } catch (error) {
            let errorMessage = 'Неизвестная ошибка!';
            if (axios.isAxiosError(error) && error.response) {
                if (error.status === 400)
                    errorMessage = 'Нельзя удалить запись от которой зависят другие записи!'
            }
			setErrorMessage(errorMessage)
        }
    };

    return (
        <>
            <button className='saveOrDeleteButton staticButton' onClick={() => {
					const idCell = row.getVisibleCells().find((cell: Cell<RowData, any>) => cell.column.id === 'id')
					const rowId = idCell ? Number(idCell.getValue()) : null
					handleButtonClick(Number(rowId));
				}}>
					Удалить
				</button>
        </>
    );
};

export default DeleteButton;
