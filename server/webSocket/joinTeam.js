const { updataPakageAction } = require('./updataPakage');

module.exports = socket => {
  socket.on('join team', teamId => {
    const teamIdString = teamId.toString();
    socket.join(teamIdString);
  });

  socket.on('pakckage updated Request For Action', updataPakageAction);
};
