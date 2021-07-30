import socketIo from 'socket.io-client';
const io = socketIo();

export const joinTeam = (user) => io.emit('join team', user.team);

export const updataPakageActionEmmiter = (teamID) =>
  io.emit('pakckage updated Request For Action', teamID);

export default io;
