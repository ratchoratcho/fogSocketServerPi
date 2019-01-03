const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const EventEmitter = require('events');
const myEvent = new EventEmitter();

io.on('connection', socket => {
  console.log('a user connected');
  // sensing data = {"send": '200kB', "rtt": xxxxxxxxxx}
  myEvent.on('sensingComplete', (sensingData) => {
    io.emit('sensingData', sensingData);
  });
});

http.listen(4000, () => {
  console.log('listening on 4000 ...');
});

app.listen(5000, () => {
  console.log('litening on 5000 ...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/sensingData', (req, res, next) => {
  console.log('sensing data received');
  console.log(req.body);
  myEvent.emit('sensingComplete', req.body);
  res.send('sensing data received');
});
