const newFamousPersonInput = process.argv.slice(2);
const settings = require('./settings');
var knex = require('knex')({
  client : 'pg',
  connection: {
    user : settings.user,
    password : settings.password,
    database : settings.database,
    host : settings.hostname,
    port : settings.port,
    ssl : settings.ssl
  }
});

const newFirstName = newFamousPersonInput[0];
const newLastName = newFamousPersonInput[1];
const newBirthDate = newFamousPersonInput[2];

knex('famous_people')
  .insert({
    first_name: newFirstName,
    last_name: newLastName,
    birthdate: newBirthDate
  })
  .returning('*')
  .asCallback((err, insertResults) => {
    console.log(insertResults);
    knex.destroy();
  });