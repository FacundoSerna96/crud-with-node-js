const Customer = require("../models/customer.model.js");

// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a customer
  const customer = new Customer({
    customerName: req.body.customerName,
    phone: req.body.phone,
    country: req.body.country,
    city:req.body.city,
    addressLine1: req.body.addressLine1
  });

  console.log(customer);

  // Save customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Customer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};


// Find a single Customer by Id
exports.findOne = (req, res) => {
  Customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Customers
exports.findAllPublished = (req, res) => {
  Customer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};

// Update a Customer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Customer.updateById(
    req.params.id,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.id
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};



//cantidad de clientes de la base de datos
exports.count = (req, res) => {
  const title = req.query.title;

  Customer.count(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data[0]);
  });
}

exports.findByPage = (req,res) =>{
  Customer.findByPage(req.params.page, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
}

//lista de paises
exports.findCountries = (req, res) => {
  const title = req.query.title;

  Customer.findCountries(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
}

//lista de ciudades
exports.findCities = (req, res) => {
  const title = req.query.title;

  Customer.findCities(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
}

