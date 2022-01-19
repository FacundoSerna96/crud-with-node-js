const baseURL = "http://localhost:8080/api";
var idCustomer = 0;

$(document).ready(function(){
    $("#customerForm").hide();
    $(".alert-success").hide();
    $(".alert-danger").hide();
    $(".alert-primary").hide();


    //loadAllCustomers();
    loadPage(1);
    loadNumPage();
    loadCities();
    loadCountries();

    
});


function showFormCustomer(){
    if ($('#customerForm').is(':visible')) {
        $('#customerForm').slideUp();
    } else {
        $('#customerForm').slideDown();
    }
}



//--------------------------------------

function loadAllCustomers(){


  

  let customerList = new Object();

  //peticion fetch ajax
  var url= baseURL + "/customer/page/1"

  fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error))

  var mostrarData = (data) => {

    
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
    

    
  
}

function loadCustomer(id){
    //peticion fetch ajax
    var url= 'http://localhost:8080/api/customer/' + id;

    idCustomer = id;
    console.log(idCustomer);

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => {console.log(error); showAlert("error");})

    var mostrarData = (data) => {
        $("#id").val(id);
        $("#textBoxName").val(data.customerName);
        $("#textBoxPhone").val(data.phone);
        $("#textBoxAddress").val(data.addressLine1);
        $("#comboBoxCountry").val(data.country);
        $("#comboBoxCity").val(data.city);
  }

  $("#buttonDeleteCustomer").show();;
}

function loadNumPage(){
  //peticion fetch ajax
  var url= baseURL + "/customer/count"

  fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => {console.log(error); showAlert("error");})

  var mostrarData = (data) => {

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
        body += `<li class="page-item"><a class="page-link" id="${i}" href="" onclick="loadPage(${i}); return false;">${i} </a></li>`
      }
      
      body += `<li class="page-item"> 
              <a class="page-link" href="#">Next</a>
              </li>`

      document.getElementById('pageList').innerHTML = body;

     
  }
}

function loadPage(myPage){

    //borramos pagina anterior
    deletePage();

    
    //peticion fetch ajax
    var url= baseURL + "/customer/page/" + myPage;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => {console.log(error); showAlert("error");})

    var mostrarData = (data) => {

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

    let id = "#" + parseInt(myPage);

    $(id).innerHTML = `<span class="sr-only">(current)</span>`;
    
   
}

function loadCities(){
    //peticion fetch ajax
    var url= 'http://localhost:8080/api/customer/cities';

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => {console.log(error); showAlert("error");})

    var mostrarData = (data) => {
        
        body = '';

        for (let i=0; i< data.length; i++){
            body += `<option value="${data[i].city}">${data[i].city}</option>`;
        }

        document.getElementById('comboBoxCity').innerHTML = body;
  }
}

function loadCountries(){
    //peticion fetch ajax
    var url= 'http://localhost:8080/api/customer/countries';

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => {console.log(error); showAlert("error");})

    var mostrarData = (data) => {
        
        body = '';

        for (let i=0; i< data.length; i++){
            body += `<option value="${data[i].country}">${data[i].country}</option>`;
        }

        document.getElementById('comboBoxCountry').innerHTML = body;
  }
}

function searchCustomer(name){
  //peticion fetch ajax
  var url= baseURL + "/customer/?title=" + name

  fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error))

  var mostrarData = (data) => {

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
}

function saveCustomer(){
    if($("#id").val() == 0){
        createCustomer();
    } else{
        updateCustomer();
    }
    
    $("#buttonDeleteCustomer").hide();
}

function createCustomer(){

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
    
      try {
        const res = fetch(`${baseURL}/customer`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(customer),
        });
    
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
    
        const data =  res.json();
    
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };
    
        console.log(result);
      } catch (err) {
        console.log(err.message);
        showAlert("error");
      }

      //recargamos la lista
      loadAllCustomers();
      loadAllCustomers();

      showAlert("success");
}

function updateCustomer(){
  
    
    let id = $("#id").val();
    let customerName = $("#textBoxName").val();
    let phone = $("#textBoxPhone").val();
    let country = $("#comboBoxCountry").val();
    let city = $("#comboBoxCity").val();
    let addressLine1 = $("#textBoxAddress").val();

    console.log(addressLine1);

    const update = {
        customerName: customerName,
        phone: phone,
        country: country,
        city: city,
        addressLine1 : addressLine1
      };
  
      console.log(update);
  
    try {
      const res = fetch(`${baseURL}/customer/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(update),
      });
  
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
  
      const data = res.json();
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: { "Content-Type": res.headers.get("Content-Type") },
        data: data,
      };
  
      console.log(result);
    } catch (err) {
      console.log(err.message);
      showAlert("error");
    }

    //recargamos la lista
    loadAllCustomers();
    loadAllCustomers();

    //mensaje de guardado con exito
    showAlert("success");
}

function deleteCustomer(idCustomer){

    var id = idCustomer;

    try {
        const res = fetch(`${baseURL}/customer/${id}`, { method: "delete" });

        const data = res.json();

        const result = {
        status: res.status + "-" + res.statusText,
        headers: { "Content-Type": res.headers.get("Content-Type") },
        data: data,
        };

        console.log(result);
    } catch (err) {
        console.log(err.message);
        showAlert("error");
    }

    updateFormTable();
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

function updateFormTable() { 
    loadAllCustomers();
    loadAllCustomers();
 }

function showModal() {
    $("#modal").show;
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
