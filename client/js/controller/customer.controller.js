$(document).ready(function(){
  loadPageDB(1);
  loadNumPageDB();
  loadCitiesDB();
  loadCountriesDB();
});


//EVENTOS

$("#buttonCustomer").click(function () {
    $("#buttonDeleteCustomer").hide();
    deleteFormCustomer();
    showFormCustomer();
});

$("#buttonSaveCustomer").click(function () {
    $("#buttonDeleteCustomer").hide();
    saveCustomer();
});

$("#buttonDeleteCustomerConfirm").click(function(){
  deleteCustomer();
});


//detecta el click de una fila
//y manda a cargar el cliente
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


$("#buttonSearch").click(function(){
  let search = $("#textBoxSearch").val()

  if (search == ""){
    loadPageDB(1);
  }else{
    searchCustomerDB($("#textBoxSearch").val());
  }
});


//---------------------------------


function loadAllCustomers(data){loadAllCustomersView(data)}
  
function loadCustomer(data){loadCustomerView(data)}
  
function loadNumPage(data){loadNumPageView(data);}

function setActualPage(actualPage){setActualPageView(actualPage);}

function loadPage(data){loadPageView(data);}
  
function loadCities(data){loadCitiesView(data)}
  
function loadCountries(data){loadCountriesView(data)}
  
function saveCustomer(){
  if($("#id").val() == 0){
    createCustomer();
  } else{
      updateCustomer();
  }
      
}

function createCustomer(){
  let newCustomer = createCustomerView();
  createCustomerDB(newCustomer);

  //recargamos la lista
  loadPageDB(1);
  
  //mensaje de guardado con exito
  showAlert("success");   
  
  deleteFormCustomer();
  showFormCustomer();
}

function updateCustomer(){
  let update = updateCustomerView();
  updateCustomerDB(update);

  //recargamos la lista
  loadPageDB(1);
  loadPageDB(1);

  //mensaje de guardado con exito
  showAlert("success"); 

  deleteFormCustomer();
  showFormCustomer();
}

function deleteCustomer(idCustomer){
  deleteCustomerDB();
  updateFormTable();
}

function updateFormTable() { 
    loadPageDB(1);
    loadPageDB(1);
    deleteFormCustomer();
    showFormCustomer();
}


function searchCustomer(data){searchCustomerView(data)}