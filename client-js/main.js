import {
    displayCustomers, mockCustomers
} from './customers.js';

const init = {
    mock: () => {
        mockCustomers();
    },
    default: () => {

    },
    adminPage: () => {
        displayCustomers();
        mockCustomers();
    }
}

window.addEventListener('DOMContentLoaded', () => {

    init.mock();
    init.default();

    const body = document.getElementsByTagName('body')[0];

    if (body.id === '') return;
    if (!init.hasOwnProperty(body.id)) return;

    init[body.id]();
})
