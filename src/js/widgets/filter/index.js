import { getFilterControls, getFilteredData } from './utils';

export const filter = (filterId = 1, remoteData, tables) => {
    const filter = document.createElement('div');
    const formWrapper = document.createElement('div');
    const filterContent = document.createElement('div');

    let data = remoteData;
    let activeFilterFields = {};

    filter.className = 'filter';
    formWrapper.className = 'formWrapper';
    filterContent.className = 'filterContent';

    formWrapper.innerHTML = `
        <form class="filter_form">
            ${getFilterControls(data)}
        </form>
    `;

    filter.appendChild(formWrapper);

    const renderTables = (tableData) => {
        for (const table of tables) {
            filterContent.appendChild(table(tableData, filterId));
        }

        filter.appendChild(filterContent);
    };

    const resetContent = () => {
        filterContent.innerHTML = '';
    };

    const changeContent = () => {
        resetContent();
        renderTables(getFilteredData(activeFilterFields, data));
    };

    filter.addEventListener('input', (e) => {
        if (e.target.tagName !== 'SELECT') return;

        if (e.target.value === 'all') {
            delete activeFilterFields[e.target.name];
        } else {
            activeFilterFields[e.target.name] = e.target.value;
        }

        changeContent();
    });

    if (tables) {
        renderTables(data);
    }

    return filter;
};
