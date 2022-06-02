const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

  const readWrite = (file,contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch (page) {
    case '/': 
      readWrite('index.html','text/html')
      break;
    case '/otherpage':
      readWrite('otherpage.html','text/html')
      break;
    case '/otherotherpage':
      readWrite('otherotherpage.html','text/html')
      break;
    case '/api':
      let botChoice = Math.random() <= .33 ? 'rock'
                    : Math.random() <= .66 ? 'paper'
                    : 'scissors' ;
      let explain = 'The computer chose '
      explain+=botChoice.toUpperCase();
      rpsGame = () => {
      if (params['student']=='rock'){
        switch(botChoice){
          case 'rock':
            return 'You Tied'
            break;
          case 'paper':
            return 'You Lose'
            break;
          case 'scissors':
            return 'You Win'
            break;
        }
      } else if (params['student']=='paper'){
        switch(botChoice){
          case 'rock':
            return 'You Win'
            break;
          case 'paper':
            return 'You Tied'
            break;
          case 'scissors':
            return 'You Lose'
            break;
        } 
      } else if (params['student']=='scissors'){
        switch(botChoice){
          case 'rock':
            return 'You Lose'
            break;
          case 'paper':
            return 'You Win'
            break;
          case 'scissors':
            return 'You Tied'
            break;
        }
      } else {
        explain = ''
        return 'Choose either rock, paper or scissors!';
      }
    }

      
      flipFlip = rpsGame()


      res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: explain,
          status: flipFlip,
        }
        res.end(JSON.stringify(objToJson));
      break;
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
          });
      break;
    case '/js/main.js':
      readWrite('js/main.js','text/javascript')
      break;
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
     break; 
  }
});

server.listen(8000);
