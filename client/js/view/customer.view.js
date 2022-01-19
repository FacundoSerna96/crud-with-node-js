$(document).ready(function(){
    $("#customerForm").hide();
    $(".alert-success").hide();
    $(".alert-danger").hide();
    $(".alert-primary").hide();
});
  

function deletePage(){
    body = ''
    document.getElementById("tabla").innerHTML = body;
}

function showFormCustomer(){
    if ($('#customerForm').is(':visible')) {
        $('#customerForm').slideUp();
    } else {
        $('#customerForm').slideDown();
    }
}


function loadAllCustomersView(data){
    let body = ''
  
    for(let i=0; i<data.length; i++){
        body += `<tr>
                    <td>${data[i].customerNumber}</td>
                    <td>${data[i].customerName}</td>
                    <td>${data[i].phone}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].addressLine1}</td>
                    <td>${data[i].country}</td>
                    
                    
                </tr>`
                //<td><button type="button" class="btn btn-primary">Editar</button></td>
    }
    document.getElementById('tabla').innerHTML = body;
}

function loadCustomerView(data){
    $("#id").val(data.customerNumber);
    $("#textBoxName").val(data.customerName);
    $("#textBoxPhone").val(data.phone);
    $("#textBoxAddress").val(data.addressLine1);
    $("#comboBoxCountry").val(data.country);
    $("#comboBoxCity").val(data.city);

    $("#buttonDeleteCustomer").show();;
}

function loadPageView(data){
     
     //borramos pagina anterior
     deletePage();
  
     let body = ''
     

    for(let i=0; i<data.length; i++){
        
        
        body += `<tr>
                    <td>${data[i].customerNumber}</td>
                    <td>${data[i].customerName}</td>
                    <td>${data[i].phone}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].addressLine1}</td>
                    <td>${data[i].country}</td>       
                </tr>`
                //<td><button type="button" class="btn btn-primary">Editar</button></td>
    }

     document.getElementById('tabla').innerHTML = body;
}

function loadNumPageView(data){
    let pages = data["count(*)"]/10;
  
    //agrega una pagina mas si 
    //los registros no son multiplos de 10
    if((data["count(*)"] % 10) > 0){
        pages++
    }

    let body = '';

    body = `<li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>`

    for(let i = 1; i<pages ; i++){
        body += `<li class="page-item"><a class="page-link" id="${i}" href="" onclick="loadPageDB(${i}); return false;">${i} </a></li>`
    }
    
    body += `<li class="page-item"> 
            <a class="page-link" href="#" >Next</a>
            </li>`

    document.getElementById('pageList').innerHTML = body;
  
}

function setActualPageView(actualPage){
    $("#" + actualPage).css("padding : 20%;");  
}

function loadCitiesView (data) {  
    body = '';
  
    for (let i=0; i< data.length; i++){
        body += `<option value="${data[i].city}">${data[i].city}</option>`;
    }

    document.getElementById('comboBoxCity').innerHTML = body;
}

function loadCountriesView(data){
    body = '';
  
    for (let i=0; i< data.length; i++){
        body += `<option value="${data[i].country}">${data[i].country}</option>`;
    }

    document.getElementById('comboBoxCountry').innerHTML = body;
}

function createCustomerView(){
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
        addressLine1 : addressLine1
      };

    return customer;
}


function updateCustomerView(){
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
        addressLine1 : addressLine1
      };

    return update;
}

function deletePage(){
    body = ''
    document.getElementById("tabla").innerHTML = body;
}


function deleteFormCustomer(){{
    idCustomer = 0;
    $("#textBoxName").val("");
    $("#textBoxPhone").val("");
    $("#textBoxAddress").val("");
    $("#comboBoxCountry").val("");
    $("#comboBoxCity").val("");
}}

function alertSuccess(){
    $(".alert-success").show();   
}

function showAlert(type){
    switch(type){
      case "success":
        $(".alert-success").fadeTo(2000, 500).slideUp(500, function(){
          $(".alert-success").slideUp(500);
        });
        break;
      case "error":
        $(".alert-danger").fadeTo(2000, 500).slideUp(500, function(){
          $(".alert-danger").slideUp(500);
        });
        break;
      case "delete":
        $(".alert-primary").fadeTo(2000, 500).slideUp(500, function(){
          $(".alert-primary").slideUp(500);
        });
        break;
    }
  }

function showModal() {
    $("#modal").show;
}

function searchCustomerView(data){
    let body = ''

    for(let i=0; i<data.length; i++){
        body += `<tr>
                    <td>${data[i].customerNumber}</td>
                    <td>${data[i].customerName}</td>
                    <td>${data[i].phone}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].addressLine1}</td>
                    <td>${data[i].country}</td>
                    
                    
                </tr>`
    }
    document.getElementById('tabla').innerHTML = body;
}