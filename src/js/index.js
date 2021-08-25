import '@babel/polyfill';
import '../styles/styles.css';
import * as remoteData from '../json/data.json';

import { renderTable } from './widgets/table';
import { filter } from './widgets/filter';

const renderApp = (components) => {
    const app = document.getElementById('app');

    for (const component of components) {
        app.appendChild(component);
    }
};

renderApp([
    filter(1, remoteData, [
        renderTable,
    ]),
    filter(2, remoteData, [
        renderTable,
        renderTable,
    ]),
    renderTable(remoteData),
]);
