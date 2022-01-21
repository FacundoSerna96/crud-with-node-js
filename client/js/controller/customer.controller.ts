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
  let search : any = $("#textBoxSearch").val()

  if (search == ""){
    loadPageDB(1);
  }else{ 
    searchCustomerDB(search);
  }
});


//---------------------------------


function loadAllCustomers(data: any){loadAllCustomersView(data)}
  
function loadCustomer(data : any){loadCustomerView(data)}
  
function loadNumPage(data : any){loadNumPageView(data);}

function setActualPage(actualPage : number){setActualPageView(actualPage);}

function loadPage(data : any){loadPageView(data);}
  
function loadCities(data : any){loadCitiesView(data)}
  
function loadCountries(data : any){loadCountriesView(data)}
  
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

function deleteCustomer(){
  deleteCustomerDB();
  updateFormTable();
}

function updateFormTable() { 
    loadPageDB(1);
    loadPageDB(1);
    deleteFormCustomer();
    showFormCustomer();
}


function searchCustomer(data: any){searchCustomerView(data)}