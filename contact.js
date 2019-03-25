#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')
// Require logic.js file and extract controller functions using JS destructing
const {
    addContact,
    getContact,
    getContacts,
    getContactList,
    updateContact,
    deleteContact
} = require('./logic')

// Craft questions to present to users
const questions = [{
    type: 'input',
    name: 'firstname',
    message: 'Enter firstname ...'
}, {
    type: 'input',
    name: 'lastname',
    message: 'Enter lastname ...'
}, {
    type: 'input',
    name: 'phone',
    message: 'Enter phone number ...'
}, {
    type: 'input',
    name: 'email',
    message: 'Enter email address ...'
}]

program
    .version('0.0.1')
    .description('Contact management system')

program
    .command('addContact') // No need of specifying arguments here
    .alias('a')
    .description('Add a contact')
    .action(() => {
        prompt(questions).then(answers =>
            addContact(answers))
    })

program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name))

program
    .command('updateContact <_id>')
    .alias('u')
    .description('Update contact')
    .action(_id => {
        prompt(questions).then(answers =>
            updateContact(_id, answers))
    })

program
    .command('deleteContact <_id>')
    .alias('d')
    .description('Delete contact')
    .action(_id => deleteContact(_id))

program
    .command('getContactList')
    .alias('l')
    .description('List contacts')
    .action(() => getContactList())

const contactsToChoice = {
    type: 'list',
    name: 'contact',
    message: 'Choose a contact:'
}

program
    .command('getContacts')
    .alias('g')
    .description('Choose contact')
    .action(() => {
        getContacts().then(contacts => {
            contactsToChoice.choices = contacts.map(contact => {
                return contact.firstname + ' ' + contact.lastname
            })
            contactsToChoice.default = contactsToChoice.choices[0]

            prompt(contactsToChoice).then(answer => {
                let name = answer.contact

                getContact(name.substring(0, name.indexOf(' ')))
            })
        })
    })

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudlg]/.test(process.argv.slice(2))) {
    program.outputHelp()
    process.exit()
}

program.parse(process.argv)