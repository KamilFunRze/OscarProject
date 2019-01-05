const http = require('http');
const app = require('../app');

const port = process.env.PORT || 5555 ;

app.set('port', port);

const server = http.createServer(app);


server.listen(port, (_) => {
  console.log("Server runs on port " + port);
});
