const program = require('commander')
const { prompt } = require('inquirer')
// Require logic.js file and extract controller functions using JS destructing
const { addContact, getContact } = require('./logic')

// Craft questions to present to users
const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter firstname ...'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter lastname ...'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter phone number ...'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address ...'
    }
];

program
    .version('0.0.1')
    .description('Contact management system')

program
    .command('addContact') // No need of specifying arguments here
    .alias('a')
    .description('Add a contact')
    .action(() => {
        prompt(questions).then(answers =>
            addContact(answers));
    });

program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name))

program.parse(process.argv)