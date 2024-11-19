const TeamDescription = require("../models/teamDescription");

const teamDescription = async () => {
  const allAvailable = await TeamDescription.find({ used: false });
  if (!allAvailable) {
    throw new Error("No available teams");
  }
  const random = Math.floor(Math.random() * allAvailable.length + 1);
  const randomTeam = allAvailable[random];

  const { _id, name, hex } = randomTeam;
  randomTeam.used = true;
  await randomTeam.save();

  return { name, hex };
};

module.exports = teamDescription;
