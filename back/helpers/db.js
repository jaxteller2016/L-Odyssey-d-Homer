const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'steaua1984',
    database : 'L_Odyssey_d_Homer'
});
module.exports  =  connection;