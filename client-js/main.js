import {
    displayCustomers, mockCustomers
} from './customers.js';

const init = {
    adminPage: () => {
        displayCustomers();
        mockCustomers();
    }
}

window.addEventListener('DOMContentLoaded', () => {

    const body = document.getElementsByTagName('body')[0];

    if (body.id === '') return;
    if (!init.hasOwnProperty(body.id)) return;

    init[body.id]();
})
