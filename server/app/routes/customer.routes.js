module.exports = app => {
  const customer = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customer.create);

  // Retrieve all Customers
  router.get("/", customer.findAll);

  // Retrieve all published Customers
  router.get("/published", customer.findAllPublished);

  //cantidad de clientes
  router.get("/count", customer.count);

  router.get("/page", customer.findAll);

  //Conseguir con limit
  router.get("/page/:page", customer.findByPage);

  //Conseguir paises
  router.get("/countries", customer.findCountries);

  //Conseguir ciudades
  router.get("/cities", customer.findCities);

  // Retrieve a single Customer with id
  router.get("/:id", customer.findOne);

  // Update a Customer with id
  router.put("/:id", customer.update);

  // Delete a Customer with id
  router.delete("/:id", customer.delete);

  // Delete all Customers
  //router.delete("/", customer.deleteAll);


  

  app.use('/api/customer', router);
};
