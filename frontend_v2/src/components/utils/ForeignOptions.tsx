// ClientSelectOptions.tsx
import React, { useState, useEffect } from 'react';
import { FormField } from '../tables/GenerateAddDataForm.tsx';
import AxiosTableData from '../../services/AxiosTableData.ts';

interface Option {
    id: number;
    value: string;
}

interface ForeignSelectProps {
    field: FormField;
}

const ForeignOptions: React.FC<ForeignSelectProps> = ({ field }) => {
    const [options, setOptions] = useState<Option[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
        try {
            const formData = new FormData();
            if (field.select_type) { // Проверяем, что select_type определен
                formData.append('name_table', field.select_type);
                const response = await AxiosTableData(`${apiUrl}/database/get_table_data_fields`, 'POST', formData);
                if (Array.isArray(response)) {
                    setOptions(response);
                } else {
                    console.error('Expected an array but received:', response);
                }
            } else {
                console.error('field.select_type is undefined');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    

    useEffect(() => {
        if (field.select_type) {
            fetchData();
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
