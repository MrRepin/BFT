import moment from 'moment';
import { getParsedData } from '../../utils';

export const renderTable = (remoteData) => {
    const table = document.createElement('table');
    const data = remoteData;
    const parsedData = getParsedData(data);

    if (data.data.length === 0) {
        table.innerHTML = 'Не найдены элементы с такими параметрами!'
    } else {
        table.innerHTML = `
            <thead>
                ${parsedData.columns.map(item => {
                return `<th>${item.label}</th>`;
            }).join('')}
            </thead>
            <tbody>
                ${parsedData.data.map(line => {
                return `<tr>
                                ${line.map(column => {
                    if (column[0] === 'date') {
                        return `<td>${moment(column[1]).format('DD.MM.YYYY')}</td>`;
                    }
    
                    return `<td>${column[1]}</td>`;
                }).join('')}
                            </tr>`;
            }).join('')}
            </tbody>
        `;
    }

    return table;
};
