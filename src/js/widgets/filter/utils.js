import moment from "moment";

import { getParsedData, getUniqDataItems } from "../../utils";

export const getFilterControls = (data) => {
    const parsedData = getParsedData(data);

    const getOptions = (columnIndex, column) => {
        return getUniqDataItems(parsedData).map((option, optionIndex) => {
            if (columnIndex !== optionIndex) return null;

            return option.map(optionItem => {
                if (column.code === 'date') {
                    return `<option value="${optionItem}">${moment(optionItem).format('DD.MM.YYYY')}</option>`;
                }

                return `<option value="${optionItem}">${optionItem}</option>`;
            });
        });
    };

    return parsedData.columns.map((column, index) => {
        return `<select class="filter_select" name="${column.code}">
                    <option value="all" selected>Все</option>
                    ${getOptions(index, column)}
                </select>`;
    }).join('');
};

export const getFilteredData = (activeFields, baseData) => {
    let newData = JSON.parse(JSON.stringify(baseData));
    const fields = Object.keys(activeFields);

    for (const field of fields) {
        const columnIndex = baseData.columns.findIndex(columnItem => columnItem.code === field);

        newData.data = newData.data.filter(dataItem => {
            return `${dataItem[columnIndex]}` === activeFields[field];
        });
    }

    return newData;
};
