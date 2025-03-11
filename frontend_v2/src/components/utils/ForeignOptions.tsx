// ClientSelectOptions.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

import UniversalAxiosRequest from '../../services/UniversalAxiosRequest.ts';
import { FormField } from '../../types/TableTypes.ts';


interface Option {
    id: number
    value: string
}
interface ForeignOptionsProps {
    field: FormField
}
const ForeignOptions = ({field}: ForeignOptionsProps) => {
    const [options, setOptions] = useState<Option[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getOptions = async () => {
        try {
            const activeTable = new FormData();
            if (field.select_type) {
                activeTable.append('name_table', field.select_type);
                const response = await UniversalAxiosRequest(`${apiUrl}/database/get_foreign_data`, 'POST', activeTable);
                if (Array.isArray(response)) {
                    setOptions(response);

                }
            } else {
                console.error('field.select_type is undefined')
            }
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) && error.response ? error.response.data.detail || 'Неизвестная ошибка!': 'Неизвестная ошибка !';
			console.log(errorMessage);
        }
    };
    useEffect(() => {
        if (field.select_type) {
            getOptions();
        }
    }, [field.select_type]);

    return (
        <>
            {options.length > 0 ? (
                options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))
            ) : (
                field.options?.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                        {option}
                    </option>
                ))
            )}
        </>
    );
};

export default ForeignOptions;
