import {useState} from 'react';
import { TableNames, TablesList } from '../../types/TableTypes.ts';

import Header from '../../components/base/Header.tsx'
import GenerateFilteredTableView from '../../components/tables/GenerateFilteredTableView.tsx';
import Footer from '../../components/base/Footer.tsx'

import '../../styles/components.css'


const FilteredTableView = () => {
  const [activeTable, setActiveTable] = useState<TableNames>('clients');

    const renderTable = () => {
        return <GenerateFilteredTableView activeTable={activeTable} />;
    };

    return (
      <>
        <Header />
        <div className='menuTable'>
            {TablesList.map((table) => (
                        <button
                            key={table.name}
                            className={`defaultButton ${activeTable === table.name ? 'activeButton' : 'inactiveButton'}`}
                            onClick={() => setActiveTable(table.name as TableNames)}>
                            {table.label}
                        </button>
                    ))}
        </div>
        <div className='mainSection'>
            {renderTable()}
        </div>
        <Footer />
        </>
    )
  }
  
  export default FilteredTableView