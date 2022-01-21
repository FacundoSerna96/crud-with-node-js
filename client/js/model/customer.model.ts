const baseURL = "http://localhost:8080/api";
let idCustomer = "";
let actualPage = 1;

function loadAllCustomersDB(){
    //peticion fetch ajax
    var url= baseURL + "/customer/page/1"
  
    fetch(url)
        .then(response => response.json())
        .then(data => loadAllCustomers(data))
        .catch(error => console.log(error))
  }

function loadCustomerDB(id: string){
    //peticion fetch ajax
    var url= 'http://localhost:8080/api/customer/' + id;

    idCustomer = id;

    fetch(url)
        .then(response => response.json())
        .then(data => loadCustomer(data))
        .catch(error => console.log(error))
}

function loadPageDB(myPage: number){
    //peticion fetch ajax
    var url= baseURL + "/customer/page/" + myPage;

    var myData;

    setActualPage(myPage);

    fetch(url)
         .then(response => response.json())
         .then(data => {loadPage(data)})
         .catch(error => {console.log(error);})

}

function loadNumPageDB(){
    //peticion fetch ajax
    var url= baseURL + "/customer/count"
  
    fetch(url)
        .then(response => response.json())
        .then(data => loadNumPage(data))
        .catch(error => console.log(error))
}

function loadCitiesDB(){
    //peticion fetch ajax
    var url= 'http://localhost:8080/api/customer/cities';
  
    fetch(url)
        .then(response => response.json())
        .then(data => loadCities(data))
        .catch(error => console.log(error))
}

function loadCountriesDB(){
    //peticion fetch ajax
    var url= 'http://localhost:8080/api/customer/countries';
  
    fetch(url)
        .then(response => response.json())
        .then(data => loadCountries(data))
        .catch(error => console.log(error))
}

async function createCustomerDB(customer: any){
    try {
        const res = fetch(`${baseURL}/customer`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(customer),
        });
    
        if (!(await res).ok) {
          const message = `An error has occured: ${(await res).status} - ${(await res).statusText}`;
          throw new Error(message);
        }
    
        const data =  (await res).json();
    
        const result = {
          status: (await res).status + "-" + (await res).statusText,
          headers: {
            "Content-Type": (await res).headers.get("Content-Type"),
            "Content-Length": (await res).headers.get("Content-Length"),
          },
          data: data,
        };
    
      } catch (err: any) {
        console.log(err.message);
      }
}

async function updateCustomerDB(update: any){
    try {
        const res = fetch(`${baseURL}/customer/${idCustomer}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(update),
        });
    
        if (!(await res).ok) {
          const message = `An error has occured: ${(await res).status} - ${(await res).statusText}`;
          throw new Error(message);
        }
    
        const data = (await res).json();
    
        const result = {
          status: (await res).status + "-" + (await res).statusText,
          headers: { "Content-Type": (await res).headers.get("Content-Type") },
          data: data,
        };
    
      } catch (err : any) {
        console.log(err.message);
      }
}

async function deleteCustomerDB(){
    try {
        const res = fetch(`${baseURL}/customer/${idCustomer}`, { method: "delete" });

        const data = (await res).json();

        const result = {
        status: (await res).status + "-" + (await res).statusText,
        headers: { "Content-Type": (await res).headers.get("Content-Type") },
        data: data,
        };

    } catch (err : any) {
        console.log(err.message);
    }
}


function searchCustomerDB(name: any){
    //peticion fetch ajax
  var url= baseURL + "/customer/?title=" + name;

  fetch(url)
      .then(response => response.json())
      .then(data => searchCustomer(data))
      .catch(error => console.log(error))
}