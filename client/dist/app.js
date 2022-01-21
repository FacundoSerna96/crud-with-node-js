"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document).ready(function () {
    loadPageDB(1);
    loadNumPageDB();
    loadCitiesDB();
    loadCountriesDB();
});
$("#buttonCustomer").click(function () {
    $("#buttonDeleteCustomer").hide();
    deleteFormCustomer();
    showFormCustomer();
});
$("#buttonSaveCustomer").click(function () {
    $("#buttonDeleteCustomer").hide();
    saveCustomer();
});
$("#buttonDeleteCustomerConfirm").click(function () {
    deleteCustomer();
});
$("#tabla").on("dblclick", "tr", function () {
    $('#customerForm').slideDown();
    var data = new Array();
    var td = $(this).find("td");
    for (var i = 0; i < td.length; i++) {
        data.push(td.eq(i).text());
    }
    loadCustomerDB(td.eq(0).text());
    $("#buttonDeleteCustomer").show();
});
$("#buttonSearch").click(function () {
    let search = $("#textBoxSearch").val();
    if (search == "") {
        loadPageDB(1);
    }
    else {
        searchCustomerDB(search);
    }
});
function loadAllCustomers(data) { loadAllCustomersView(data); }
function loadCustomer(data) { loadCustomerView(data); }
function loadNumPage(data) { loadNumPageView(data); }
function setActualPage(actualPage) { setActualPageView(actualPage); }
function loadPage(data) { loadPageView(data); }
function loadCities(data) { loadCitiesView(data); }
function loadCountries(data) { loadCountriesView(data); }
function saveCustomer() {
    if ($("#id").val() == 0) {
        createCustomer();
    }
    else {
        updateCustomer();
    }
}
function createCustomer() {
    let newCustomer = createCustomerView();
    createCustomerDB(newCustomer);
    loadPageDB(1);
    showAlert("success");
    deleteFormCustomer();
    showFormCustomer();
}
function updateCustomer() {
    let update = updateCustomerView();
    updateCustomerDB(update);
    loadPageDB(1);
    loadPageDB(1);
    showAlert("success");
    deleteFormCustomer();
    showFormCustomer();
}
function deleteCustomer() {
    deleteCustomerDB();
    updateFormTable();
}
function updateFormTable() {
    loadPageDB(1);
    loadPageDB(1);
    deleteFormCustomer();
    showFormCustomer();
}
function searchCustomer(data) { searchCustomerView(data); }
const baseURL = "http://localhost:8080/api";
let idCustomer = "";
let actualPage = 1;
function loadAllCustomersDB() {
    var url = baseURL + "/customer/page/1";
    fetch(url)
        .then(response => response.json())
        .then(data => loadAllCustomers(data))
        .catch(error => console.log(error));
}
function loadCustomerDB(id) {
    var url = 'http://localhost:8080/api/customer/' + id;
    idCustomer = id;
    fetch(url)
        .then(response => response.json())
        .then(data => loadCustomer(data))
        .catch(error => console.log(error));
}
function loadPageDB(myPage) {
    var url = baseURL + "/customer/page/" + myPage;
    var myData;
    setActualPage(myPage);
    fetch(url)
        .then(response => response.json())
        .then(data => { loadPage(data); })
        .catch(error => { console.log(error); });
}
function loadNumPageDB() {
    var url = baseURL + "/customer/count";
    fetch(url)
        .then(response => response.json())
        .then(data => loadNumPage(data))
        .catch(error => console.log(error));
}
function loadCitiesDB() {
    var url = 'http://localhost:8080/api/customer/cities';
    fetch(url)
        .then(response => response.json())
        .then(data => loadCities(data))
        .catch(error => console.log(error));
}
function loadCountriesDB() {
    var url = 'http://localhost:8080/api/customer/countries';
    fetch(url)
        .then(response => response.json())
        .then(data => loadCountries(data))
        .catch(error => console.log(error));
}
function createCustomerDB(customer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = fetch(`${baseURL}/customer`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(customer),
            });
            if (!(yield res).ok) {
                const message = `An error has occured: ${(yield res).status} - ${(yield res).statusText}`;
                throw new Error(message);
            }
            const data = (yield res).json();
            const result = {
                status: (yield res).status + "-" + (yield res).statusText,
                headers: {
                    "Content-Type": (yield res).headers.get("Content-Type"),
                    "Content-Length": (yield res).headers.get("Content-Length"),
                },
                data: data,
            };
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
function updateCustomerDB(update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = fetch(`${baseURL}/customer/${idCustomer}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(update),
            });
            if (!(yield res).ok) {
                const message = `An error has occured: ${(yield res).status} - ${(yield res).statusText}`;
                throw new Error(message);
            }
            const data = (yield res).json();
            const result = {
                status: (yield res).status + "-" + (yield res).statusText,
                headers: { "Content-Type": (yield res).headers.get("Content-Type") },
                data: data,
            };
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
function deleteCustomerDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = fetch(`${baseURL}/customer/${idCustomer}`, { method: "delete" });
            const data = (yield res).json();
            const result = {
                status: (yield res).status + "-" + (yield res).statusText,
                headers: { "Content-Type": (yield res).headers.get("Content-Type") },
                data: data,
            };
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
function searchCustomerDB(name) {
    var url = baseURL + "/customer/?title=" + name;
    fetch(url)
        .then(response => response.json())
        .then(data => searchCustomer(data))
        .catch(error => console.log(error));
}
class Customer {
    constructor(customerNumber, customerName, phone, country, city, addressLine1) {
        this.customerNumber = customerNumber;
        this.customerName = customerName;
        this.phone = phone;
        this.country = country;
        this.city = city;
        this.addressLine1 = addressLine1;
    }
}
$(document).ready(function () {
    $("#customerForm").hide();
    $(".alert-success").hide();
    $(".alert-danger").hide();
    $(".alert-primary").hide();
});
function showFormCustomer() {
    if ($('#customerForm').is(':visible')) {
        $('#customerForm').slideUp();
    }
    else {
        $('#customerForm').slideDown();
    }
}
function loadAllCustomersView(data) {
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `<tr>
                    <td>${data[i].customerNumber}</td>
                    <td>${data[i].customerName}</td>
                    <td>${data[i].phone}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].addressLine1}</td>
                    <td>${data[i].country}</td>
                    
                    
                </tr>`;
    }
    document.getElementById('tabla').innerHTML = body;
}
function loadCustomerView(data) {
    $("#id").val(data.customerNumber);
    $("#textBoxName").val(data.customerName);
    $("#textBoxPhone").val(data.phone);
    $("#textBoxAddress").val(data.addressLine1);
    $("#comboBoxCountry").val(data.country);
    $("#comboBoxCity").val(data.city);
    $("#buttonDeleteCustomer").show();
    ;
}
function loadPageView(data) {
    deletePage();
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `<tr>
                    <td>${data[i].customerNumber}</td>
                    <td>${data[i].customerName}</td>
                    <td>${data[i].phone}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].addressLine1}</td>
                    <td>${data[i].country}</td>       
                </tr>`;
    }
    document.getElementById('tabla').innerHTML = body;
}
function loadNumPageView(data) {
    let pages = data["count(*)"] / 10;
    if ((data["count(*)"] % 10) > 0) {
        pages++;
    }
    let body = '';
    body = `<li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>`;
    for (let i = 1; i < pages; i++) {
        body += `<li class="page-item"><a class="page-link" id="${i}" href="" onclick="loadPageDB(${i}); return false;">${i} </a></li>`;
    }
    body += `<li class="page-item"> 
            <a class="page-link" href="#" >Next</a>
            </li>`;
    document.getElementById('pageList').innerHTML = body;
}
function setActualPageView(actualPage) {
}
function loadCitiesView(data) {
    let body = "";
    for (let i = 0; i < data.length; i++) {
        body += `<option value="${data[i].city}">${data[i].city}</option>`;
    }
    document.getElementById('comboBoxCity').innerHTML = body;
}
function loadCountriesView(data) {
    let body = "";
    for (let i = 0; i < data.length; i++) {
        body += `<option value="${data[i].country}">${data[i].country}</option>`;
    }
    document.getElementById('comboBoxCountry').innerHTML = body;
}
function createCustomerView() {
    let customerName = $("#textBoxName").val();
    let phone = $("#textBoxPhone").val();
    let country = $("#comboBoxCountry").val();
    let city = $("#comboBoxCity").val();
    let addressLine1 = $("#textBoxAddress").val();
    const customer = {
        customerName: customerName,
        phone: phone,
        country: country,
        city: city,
        addressLine1: addressLine1
    };
    console.log(customer);
    return customer;
}
function updateCustomerView() {
    let id = $("#id").val();
    let customerName = $("#textBoxName").val();
    let phone = $("#textBoxPhone").val();
    let country = $("#comboBoxCountry").val();
    let city = $("#comboBoxCity").val();
    let addressLine1 = $("#textBoxAddress").val();
    const update = {
        customerName: customerName,
        phone: phone,
        country: country,
        city: city,
        addressLine1: addressLine1
    };
    return update;
}
function deletePage() {
    let body = '';
    document.getElementById("tabla").innerHTML = body;
}
function deleteFormCustomer() {
    {
        $("#textBoxName").val("");
        $("#textBoxPhone").val("");
        $("#textBoxAddress").val("");
        $("#comboBoxCountry").val("");
        $("#comboBoxCity").val("");
    }
}
function alertSuccess() {
    $(".alert-success").show();
}
function showAlert(type) {
    switch (type) {
        case "success":
            $(".alert-success").fadeTo(2000, 500).slideUp(500, function () {
                $(".alert-success").slideUp(500);
            });
            break;
        case "error":
            $(".alert-danger").fadeTo(2000, 500).slideUp(500, function () {
                $(".alert-danger").slideUp(500);
            });
            break;
        case "delete":
            $(".alert-primary").fadeTo(2000, 500).slideUp(500, function () {
                $(".alert-primary").slideUp(500);
            });
            break;
    }
}
function showModal() {
    $("#modal").show;
}
function searchCustomerView(data) {
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `<tr>
                    <td>${data[i].customerNumber}</td>
                    <td>${data[i].customerName}</td>
                    <td>${data[i].phone}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].addressLine1}</td>
                    <td>${data[i].country}</td>
                    
                    
                </tr>`;
    }
    document.getElementById('tabla').innerHTML = body;
}
