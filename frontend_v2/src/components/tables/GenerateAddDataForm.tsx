import React, { useState } from 'react';
import axios from 'axios';

import UniversalAxiosRequest from '../../services/UniversalAxiosRequest.ts';
import { TableNames } from '../../types/TableTypes.ts'
import { AddFormFields } from '../../types/TableTypes.ts';

import ForeignOptions from '../utils/ForeignOptions.tsx';

interface GenerateAddDataFormProps {
    activeTable: TableNames;
    onSave: () => void;
    setErrorMessage: (message: string | null) => void;
}

interface FormOfAddedData {[key: string]: string | number;}
function GenerateAddDataForm({ activeTable, onSave , setErrorMessage}: GenerateAddDataFormProps) {
    const [isDirty, setIsDirty] = React.useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const [formOfAddedData, setFormOfAddedData] = useState<FormOfAddedData>(() => {
        const savedData = localStorage.getItem('formOfAddedData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (error) {
                console.error('Ошибка при парсинге formOfAddedData из localStorage:', error);
                return {};
            }
        }
        return {};
    });

    const handleChangeInputOrSelectField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = (name.includes('id')) ? Number(value) : value;
        setFormOfAddedData({
            ...formOfAddedData,
            [name]: newValue,
        });
        setIsDirty(true);
    };

    const handleSubmit = async () => {
        const insertData = new FormData();
        insertData.append('name_table', activeTable || '');
    
        for (const key in formOfAddedData) {insertData.append(key, formOfAddedData[key] as string);}
    
        try {
            await UniversalAxiosRequest(`${apiUrl}/database/save_data`, 'POST', insertData);
            setFormOfAddedData({});
            setIsDirty(false);
            setErrorMessage(null);
        } catch (error) {
            let errorMessage = 'Неизвестная ошибка!';
            
            if (axios.isAxiosError(error) && error.response) {
                if (error.status === 422)
                    errorMessage = 'Пожалуйста заполните все поля!'
            }
            
            setErrorMessage(errorMessage);
        }
        onSave();
    };

    React.useEffect(() => {
        const handleBeforeUnload = () => {
            if (isDirty) {
                const message = 'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?';
                return message;
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, activeTable]);

    const renderedFields = AddFormFields[activeTable];
    
    return (
        <>
        
        <tr>
        <td style={{ width: '1px'}}></td>
        {renderedFields.map(
            (field, index) => (
            <td key={index} className="form-group">
                {field.type === 'input' ? (
                    <input
                    style={{margin: 0}}
                    type={field.input_type}
                    name={field.name}
                    id={field.name}
                    onChange={handleChangeInputOrSelectField}
                    required={true}
                    placeholder={field.placeholder}
                    />
                ) : field.type === 'select' ? (
                    <select
                        style={{margin: 0}}
                        name={field.name}
                        id={field.name}
                        onChange={handleChangeInputOrSelectField}
                        required={true}
                    >
                        {field.select_type ? (
                            field.options?.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>
                                    {option}
                                </option>
                            ))
                        ): null}
                        <ForeignOptions field={field}/>
                    </select>
                ) : null}
            </td>
        ))}
        <td style={{ width: '1px'}}>
            <button className='saveOrDeleteButton staticButton' onClick={handleSubmit}>Добавить</button>
        </td>
        </tr>
        </>
  );
};

export default GenerateAddDataForm;

