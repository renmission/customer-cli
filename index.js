const mongoose = require('mongoose')

//Map global promise - get rid of warning
mongoose.Promise = global.Promise
//Connect to db
const db = mongoose.connect('mongodb+srv://missionrenjr:missionrenjr@nodeapi-b5zu1.mongodb.net/customercli?retryWrites=true', { useNewUrlParser: true } )

//Import model
const Customer = require('./models/customer')

//app start


// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer)
        .then(customer => {
        console.info('New Customer Added');
    })
    .catch(err => {
        console.log('catched error: ', err )
        db.close();
    })
}

// Find Customer
const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name, 'i')
    Customer.find( {$or: [ { firstname: search }, { lastname: search } ] } )
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`);
            
        })
        .catch(err => {
            console.log('catched error: ', err )
            db.close();
        })
}

// Update customer
const updateCustomer = (_id, customer) => {
    Customer.update( { _id }, customer )
        .then(customer => {
            console.info('Customer Updated')
        })
        .catch(err => {
            console.log('error: ', err )
            db.close();
        })
}

// Remove customer
const removeCustomer = (_id) => {
    Customer.deleteOne( { _id } )
        .then(customer => {
            console.info('Customer Removed')
        })
        .catch(err => {
            console.log('error: ', err )
            db.close();
        })
}

// List Customers
const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers)
            console.info(`${ customers.length } matches`)
        })
        .catch(err => {
            console.log('error: ', err )
            db.close();
        })
}

// Export all methods
module.exports = {
    addCustomer,
    findCustomer,
    removeCustomer,
    updateCustomer,
    listCustomers
}

