module.exports = socket => {
  socket.on('join team', teamId => {
    const teamIdString = teamId.toString();
    socket.join(teamIdString);
  });

  socket.on('pakckage updated Request', data => {
    console.log(data);
  });
};
