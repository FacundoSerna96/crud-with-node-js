const sql = require("./db.js");


//constructor
const Customer = function(customer) {
  this.customerName = customer.customerName;
  this.phone =  customer.phone;
  this.country = customer.country;
  this.city = customer.city;
  this.addressLine1 = customer.addressLine1;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (id, result) => {
  sql.query(`SELECT * FROM customers WHERE customerNumber = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Customers: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = (title, result) => {
  let query = "SELECT * FROM customers ";

  if (title) {
    query += ` WHERE customerName LIKE '%${title}%'`;
  }

  query += " order by customerNumber DESC;"

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.getAllPublished = result => {
  sql.query("SELECT * FROM customers WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(

    `UPDATE customers SET 
              customerName = ?, 
              phone = ?, 
              country = ?,
              city = ?,
              addressLine1 = ?
                WHERE customerNumber = ?`,

    [customer.customerName, 
        customer.phone, 
        customer.country,
        customer.city,
        customer.addressLine1, 
        id],
        
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE customerNumber = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Customers with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};


Customer.count = (title, result) => {
 
  let query = "SELECT count(*) FROM customers";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
}


Customer.findByPage = (page, result) => {

  let limit =(page * 10) - 10;

  sql.query(`SELECT * FROM customers order by customerNumber DESC LIMIT ${limit} , 10`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Customers: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
}


Customer.findCountries = (title, result) => {
 
  let query = "select distinct country from customers order by country  ASC";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
}

Customer.findCities = (title, result) => {
 
  let query = "select distinct city from customers order by city ASC";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
}

module.exports = Customer;

