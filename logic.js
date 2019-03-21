const mongoose = require('mongoose')
const assert = require('assert')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/contact-manager', { useNewUrlParser: true }, (err, database) => {
    assert.equal(null, err)
    console.log('connected to contact-manager')
    database.close()
})
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
        assert.equal(null, err)
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

/**
 * @function  [getContactList]
 * @returns {Sting} status
 */
const updateContact = (_id, contact) => {
    Contact.update({ _id }, contact)
        .exec((err, status) => {
            assert.equal(null, err)
            console.info('Updated successfully')
            db.close()
        })
}

/**
 * @function  [deleteContact]
 * @returns {String} status
 */
const deleteContact = (_id) => {
    Contact.deleteOne({ _id })
        .exec((err, status) => {
            assert.equal(null, err)
            console.info('Deleted successfully')
            db.close()
        })
}

/**
 * @function  [getContactList]
 * @returns [contactlist] contacts
 */
const getContactList = () => {
    Contact.find()
        .exec((err, contacts) => {
            assert.equal(null, err)
            console.info(contacts)
            console.info(`${contacts.length} matches`)
            db.close()
        })
}

// Export all methods
module.exports = {
    addContact,
    getContact,
    getContactList,
    updateContact,
    deleteContact
}