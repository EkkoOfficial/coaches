import {
    displayCustomers, loadCustomer, mockCustomers, registerCustomerSaveEvent
} from './customers.js';

const init = {
    mock: () => {
        mockCustomers();
    },
    default: () => {

    },
    adminPage: () => {
        displayCustomers();
    },
    editCustomerPage() {
        loadCustomer();
        registerCustomerSaveEvent();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    /**
     * initialize testdata
     */
    init.mock();
    /**
     * initialize global functions
     */
    init.default();
    /**
     * initialize per page functions
     */
    const body = document.getElementsByTagName('body')[0];

    if (body.id === '') return;
    if (!init.hasOwnProperty(body.id)) return;

    init[body.id]();
})
