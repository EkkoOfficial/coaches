import {customersMock} from './mock/customersMock.js';

const CUSTOMERS_STORAGE_KEY = 'customers';


export function mockCustomers() {
    if (!window.localStorage.getItem(CUSTOMERS_STORAGE_KEY)) {
        saveCustomersToLS(customersMock);
    }
}

/**
 *
 * @param customerData
 */
function createCustomer(customerData) {

    const customers = {
        ...window.localStorage.getItem(CUSTOMERS_STORAGE_KEY),
        customerData
    }

    window.localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
}

/***
 * @returns Array<Customers>
 */
export function getCustomersFromLS() {
    return JSON.parse(window.localStorage.getItem(CUSTOMERS_STORAGE_KEY));
}

/**
 * saves the customers to the localStorage
 * @param customers
 */
export function saveCustomersToLS(customers) {
    window.localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
}

/**
 *
 * @param customerId
 */
export function deleteCustomerById(customerId) {
    const customers = getCustomersFromLS();
    const customersNew = customers.filter(c => c.id.toString() !== customerId);
    saveCustomersToLS(customersNew);
    displayCustomers();
}

export function getCustomerById(customerId) {
    const customers = getCustomersFromLS();
    return customers.find(c => c.id.toString() === customerId);
}

export function updateCustomer(customerData) {
    const customers = getCustomersFromLS();
    const index = customers.findIndex(c => c.id.toString() === customerData.id);
    customers[index] = customerData;
    saveCustomersToLS(customers);
}

/**
 * displays the customers
 */
export function displayCustomers() {

    const customers = getCustomersFromLS();

    const tbody = document.querySelector('#members_list tbody');
    tbody.innerHTML = null;

    customers.forEach(customer => {

        const tr = document.createElement('tr');
        Object.entries(customer).forEach((value, index) => {
            if (index < 1) return;
            const td = document.createElement('td');
            td.innerText = value[1].toString();
            tr.appendChild(td);
        });

        const actions = document.createElement('td');
        const deleteAction = document.createElement('a');
        deleteAction.rel = customer.id;
        deleteAction.innerText = 'X';

        deleteAction.addEventListener('click', (e) => {
            deleteCustomerById(e.target.rel)
        });


        const editAction = document.createElement('a');
        editAction.href = `bearbeiten.html?customerId=${customer.id}`;
        editAction.innerText = 'E';
        actions.appendChild(editAction);
        actions.appendChild(deleteAction);
        tr.appendChild(actions);

        tbody.appendChild(tr);
    });
}

export function loadCustomer() {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    const customer = getCustomerById(customerId);

    document.querySelector('#customerId').setAttribute('value', customer.id);
    document.querySelector('#prename').setAttribute('value', customer.prename);
    document.querySelector('#lastname').setAttribute('value', customer.lastname);
    document.querySelector('#address').setAttribute('value', customer.address);
    document.querySelector('#city').setAttribute('value', customer.city);
    document.querySelector('#zipCode').setAttribute('value', customer.zipCode);
}

export function registerCustomerSaveEvent() {
    const editCustomerForm = document.querySelector('#editCustomerForm');

    editCustomerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(editCustomerForm);
        const customer = {};
        formData.forEach((entry, index) => {
            customer[index] = entry;
        });

        updateCustomer(customer);
        window.history.back();
    });
}