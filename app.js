var express = require('express');
var app = express();

app.use(express.bodyParser());
app.post('/contact', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var query = "INSERT INTO user values(NULL,'" + name + "','" + email + "');";
  console.log('query', query);
  connection.query(query, function(err, rows, fields) {
    console.log('err?', err);
  });


  res.send('Hello world<br>' + req.body);
  res.end();
  getUsers();
  sendEmail(name, email);
});
app.use(express.static(__dirname + '/app'));
app.listen(8765, null);






function sendEmail(name, email) {
  console.log('sending email to ', name, email);
  var nodemailer = require("nodemailer");

  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
        user: "schmzr@gmail.com",
        pass: "schmoozeschmooze"
      }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: "Schmooz R <schmzr@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Nice to meet you", // Subject line
      text: "It was a pleasure meeting you, " + name + "!", // plaintext body
      html: "<b>It was a pleasure meeting you, " + name + "!</b>" // plaintext body
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }

      // if you don't want to use this transport object anymore, uncomment following line
      smtpTransport.close(); // shut down the connection pool, no more messages
  });
}







var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'schmoozer'
});


function getUsers() {
  connection.query('SELECT * from user', function(err, rows, fields) {
    if (err) throw err;
    console.log('Users:');
    for(var i = 0; i < rows.length; i++) {
      var row = rows[i];
      console.log(row);
    }
  });


}




connection.connect();

getUsers();
