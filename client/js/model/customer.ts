class Customer {
  customerNumber : number;
  customerName: string;
  phone: string;
  country: string;
  city: string;
  addressLine1: string;


    constructor(customerNumber: number, 
                customerName: string, 
                phone : string, 
                country : string, 
                city : string, 
                addressLine1 : string) {

      this.customerNumber = customerNumber
      this.customerName = customerName;
      this.phone = phone;
      this.country = country;
      this.city = city;
      this.addressLine1 = addressLine1;
    }
  }