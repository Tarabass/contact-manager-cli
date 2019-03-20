const mongoose = require('mongoose')
const assert = require('assert')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/contact-manager')
const db = mongoose.connection

// Converts value to lowercase
function toLower(v) {
    return v.toLowerCase()
}

// Define a contact Schema
const contactSchema = mongoose.Schema({
    firstname: { type: String, set: toLower },
    lastname: { type: String, set: toLower },
    phone: { type: String, set: toLower },
    email: { type: String, set: toLower },
})

// Define model as an interface with the database
const Contact = mongoose.model('Contact', contactSchema)

/**
 * @function [addContact]
 * @returns {String} Status
 */
const addContact = (contact) => {
    Contact.create(contact, (err) => {
        assert.equal(null, err);
        console.info('New contact added')
        db.close()
    })
}

/**
 * @function [getContact]
 * @returns {Json} contacts
 */
const getContact = (name) => {
    // Define search criteria. The search here is case-insensitive and inexact.
    const search = new RegExp(name, 'i')
    Contact.find({$or: [{firstname: search}, {lastname: search}]})
    .exec((err, contact) => {
        assert.equal(null, err)
        console.info(contact)
        console.info(`${contact.length}`)
        db.close()
    })
}

// Export all methods
module.exports = {
    addContact,
    getContact
}