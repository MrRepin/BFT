export const getParsedData = (baseData) => {
    const parsedData = JSON.parse(JSON.stringify(baseData));
    const dataTypes = parsedData.columns.map(column => column.code);
    const newData = parsedData.data.map(dataItem => {
        return dataItem.map((item, index) => {
            return [dataTypes[index], item];
        });
    });

    return {
        ...baseData,
        data: newData,
    };
};

export const getUniqDataItems = (data) => {
    return data.columns.map((column, index) => {
        const dataByIndex = data.data.map(dataItem => {
            return dataItem[index][1];
        });

        return Array.from(new Set(dataByIndex));
    });
};
