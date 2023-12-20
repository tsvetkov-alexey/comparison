import React from 'react';
import { useSelector } from 'react-redux';
import { Phone, selectExtractedItems } from '../redux/slices/phones';

import checked from '../assets/checked.svg';
import notChecked from '../assets/notChecked.svg';
import { RootState } from '../redux/store';

const TableInfo: React.FC = () => {
  const extractedItems: Phone[] = useSelector(selectExtractedItems);
  const isChecked = useSelector((state: RootState) => state.filter.isChecked);

  const getUniqueValues = (arr: (string | number)[]): (string | number)[] => [...new Set(arr)];
  const hasDifferences = (arr: (string | number)[]): boolean => getUniqueValues(arr).length > 1;

  const imageByClass: Record<string, string> = {
    checked,
    notChecked,
  };

  const columnNames: Record<string, string> = {
    manufacturer: 'ПРОИЗВОДИТЕЛЬ',
    releaseYear: 'ГОД ВЫПУСКА',
    diagonal: 'ДИАГОНАЛЬ',
    country: 'СТРАНА',
    memory: 'ПАМЯТЬ',
    screenRefresh: 'ЧАСТОТА ОБНОВЛЕНИЯ ЭКРАНА',
    NFC: 'NFC',
    ESIM: 'ESIM',
    Charger: 'БЕСПРОВОДНАЯ ЗАРЯДКА',
    Price: 'ЦЕНА',
  };

  const renderColumn = (columnKey: string) => {
    const values = extractedItems.map((obj) => obj[columnKey as keyof Phone]);

    if (isChecked) {
      if (!hasDifferences(values)) {
        return null;
      }
    }

    return (
      <>
        <td className="t-header">{columnNames[columnKey]}</td>
        {values.map((value, index) => (
          <td key={index}>
            {columnKey === 'NFC' || columnKey === 'ESIM' || columnKey === 'Charger' ? (
              <img src={imageByClass[value]} alt={String(value)} />
            ) : (
              value
            )}
          </td>
        ))}
      </>
    );
  };

  return (
    <div className="tableData">
      <div className="wrapper">
        <table>
          <tbody>
            {[
              'manufacturer',
              'releaseYear',
              'diagonal',
              'country',
              'memory',
              'screenRefresh',
              'NFC',
              'ESIM',
              'Charger',
              'Price',
            ].map((column) => (
              <tr key={column}>{renderColumn(column)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableInfo;
