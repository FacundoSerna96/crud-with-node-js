$("#buttonCustomer").click(function () {
    $("#buttonDeleteCustomer").hide();
    deleteFormCustomer();
    showFormCustomer();
});

$("#buttonSaveCustomer").click(function () {
    saveCustomer();
    deleteFormCustomer();
    showFormCustomer();
});


$("#buttonDeleteCustomerConfirm").click(function(){
    deleteCustomer($("#id").val());
    deleteFormCustomer();
    showFormCustomer();
    showAlert("delete");
});

$("#buttonSearch").click(function(){
    if ($("#textBoxSearch").val() == ""){
        loadPage(1);
    }else{
        let name = $("#textBoxSearch").val();
        searchCustomer(name);
    }
    
})

//detecta el click de una fila
//y manda a cargar el cliente
$("#tabla").on("dblclick", "tr", function () {

    $('#customerForm').slideDown();

    var data = new Array();
    var td = $(this).find("td");
    for (var i = 0; i < td.length; i++) {
        data.push(td.eq(i).text());
    }
    loadCustomer(td.eq(0).text());

    $("#buttonDeleteCustomer").show();
});
