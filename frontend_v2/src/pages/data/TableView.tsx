import { useState } from 'react';
import { TableNames } from '../../types/tableTypes.ts';

import Header from '../../components/base/Header.tsx';
import GenerateTableView from '../../components/tables/GenerateTableView.tsx';
import Footer from '../../components/base/Footer.tsx';

import '../../styles/components.css';

interface Table {
    name: string;
    label: string;
}

const tables: Table[] = [
    { name: 'clients', label: 'Клиенты' },
    { name: 'services', label: 'Услуги' },
    { name: 'orders', label: 'Заказы' },
    { name: 'reviews', label: 'Отзывы' },
    { name: 'payments', label: 'Платежи' },
];

const ViewTable = () => {
    const [activeTable, setActiveTable] = useState<TableNames>('clients');

    const renderTable = () => {
        return <GenerateTableView name_table={activeTable} />;
    };

    return (
        <>
            <Header />
            <div className='menuTable'>
                {tables.map((table) => (
                    <button
                        key={table.name}
                        className={`defaultButton ${activeTable === table.name ? 'active' : ''}`}
                        onClick={() => setActiveTable(table.name as 'clients' | 'services' | 'orders' | 'reviews' | 'payments')}
                    >
                        {table.label}
                    </button>
                ))}
            </div>
            <div className='mainSection'>
                {renderTable()}
            </div>
            <Footer />
        </>
    );
};

export default ViewTable;
