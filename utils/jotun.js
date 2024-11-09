const Jotun = require("../models/jotun");

const jotun = async () => {
  const allAvailable = await Jotun.find({ used: false });
  if (!allAvailable) {
    throw new Error("No available Jotun colors");
  }
  const random = Math.floor(Math.random() * allAvailable.length + 1);
  const randomJotun = allAvailable[random];

  const { _id, name, hex } = randomJotun;
  randomJotun.used = true;
  await randomJotun.save();

  return { name, hex };
};

module.exports = jotun;
