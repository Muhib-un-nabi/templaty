const includesData = ['contacts', 'snippets', 'templates', 'actions'];

const Team = require('../models/teamModule');

module.exports = async (Model, req) => {
  try {
    const name = await Model.modelName.toLowerCase();
    console.log(name);
    if (!includesData.includes(name)) return;
    const teamIdString = req.user.team.toString();

    const docLength = await Model.find({
      team: req.user.team
    }).countDocuments();

    await global.io
      .to(teamIdString)
      .emit('pakckage updated', { [name]: docLength });

    await Team.findByIdAndUpdate(req.user.team, {
      $set: {
        [`current.${name}`]: docLength
      }
    });
  } catch (e) {
    console.log(`Can't Updata Pakage details`);
  }
};
