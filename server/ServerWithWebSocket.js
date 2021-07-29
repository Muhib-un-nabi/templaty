const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

global.io = io;

const joinTeam = require('./webSocket/joinTeam');

io.on('connection', joinTeam);
module.exports = server;
