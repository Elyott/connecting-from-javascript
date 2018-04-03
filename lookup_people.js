const args = process.argv[2];
const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user : settings.user,
  password : settings.password,
  database : settings.database,
  host : settings.hostname,
  port : settings.port,
  ssl : settings.ssl
});


client.connect((err) => {
    if(err){
      return console.error('Connection Error', err);
    }
  findByName(args);
});

function findByName(name){
    console.log('Searching ... ');
    searchTable(name);
}

function searchTable(name){
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [name], (err, result) => {
    if(err){
      return console.error('Error Running query', err);
    }
    if(result){
      printResults(name, result.rows);
    }
  client.end();
  });
}

function printResults(name, results){
  console.log(`Found ${results.length} person(s) by the name ${name}:`)
  for(var i = 0; i < results.length; i++){
    console.log(`- ${i + 1}: ${results[i].first_name} ${results[i].last_name}, born ${(results[i].birthdate).toISOString().slice(0, 10)} `);
  }
}

