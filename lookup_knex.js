const nameInput = process.argv[2];

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

knex('famous_people').select('first_name', 'last_name', 'birthdate')
  .where('first_name', nameInput)
  .orWhere('last_name', nameInput)
  .asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    }
    printResults(nameInput, rows);
    knex.destroy();
  });

function printResults(name, results){
  console.log(`Found ${results.length} person(s) by the name ${name}:`)
  for(var i = 0; i < results.length; i++){
    console.log(`- ${i + 1}: ${results[i].first_name} ${results[i].last_name}, born ${(results[i].birthdate).toISOString().slice(0, 10)} `);
  }
}