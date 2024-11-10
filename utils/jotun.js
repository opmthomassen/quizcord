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

// Arctic Bears
// Thunder Hawks
// Iron Wolves
// Crimson Dragons
// Blue Sharks
// Silver Storm
// Wild Stallions
// Golden Raptors
// Steel Panthers
// Midnight Lions
// Frost Giants
// Phoenix Fury
// Red Vipers
// Black Owls
// Blazing Bulls
// Desert Scorpions
// Avalanche Falcons
// Copper Cobras
// Stormbringers
// Nightshade Wolves
// Scarlet Ravens
// Electric Eels
// Glacier Guardians
// Titan Tigers
// Razorback Rhinos
// Emerald Knights
// Fire Ants
// Tidal Titans
// Silverback Gorillas
// Blaze Badgers
// Frostbite Cougars
// Thunderbolts
// Crimson Coyotes
// Ironclad Mustangs
// Steel Sabres
// Golden Grizzlies
// Blue Hornets
// Wild Boars
// Stone Dragons
// Inferno Hawks
// Night Raiders
// Storm Chasers
// Crimson Cobras
// Bronze Bulls
// Ice Eagles
// Diamond Devils
// Redwood Bears
// Black Widows
// Lightning Lynx
// Shadow Scorpions
// Iron Kings
// Flame Falcons
// Emerald Eagles
// Glacier Gators
// Crimson Stags
// Thunder Rams
// Electric Wolves
// Arctic Foxes
// Steel Cyclones
// Vortex Vipers
// Blazing Falcons
// Scarlet Serpents
// Golden Wildcats
// Black Raptors
// Frostfire Dragons
// Night Howlers
// Storm Hawks
// Diamond Dolphins
// Glacier Gryphons
// Blue Barracudas
// Iron Bisons
// Inferno Raptors
// Frost Wolves
// Silver Serpents
// Thunder Bears
// Crimson Titans
// Tundra Tigers
// Steel Sharks
// Blazing Beavers
// Black Eagles
// Scarlet Falcons
// Diamond Jackals
// Redwood Rattlers
// Night Fury
// Vortex Hawks
// Icebreakers
// Arctic Eagles
// Bronze Bears
// Iron Panthers
// Crimson Lions
// Frost Sabres
// Thunder Stingers
// Wild Whales
// Golden Bisons
// Night Crawlers
// Electric Panthers
// Blaze Wolves
// Diamond Drakes
// Arctic Stallions
// Scarlet Stingrays
// Glacier Eagles
// Steel Thunder
// Phoenix Knights
// Frost Giants
// Black Jaguars
// Tidal Wave
// Blazing Rhinos
// Redwood Wolves
// Thunder Hawks
// Inferno Griffins
// Crimson Raptors
// Diamond Scorpions
// Arctic Avengers
// Steel Falcons
// Blue Marauders
// Frost Knights
// Scarlet Stallions
// Wild Boars
// Night Stalkers
// Storm Titans
// Golden Lions
// Glacier Knights
// Red Barracudas
// Thunder Wolves
// Black Rhinos
// Silver Wolves
// Blazing Dragons
// Ice Panthers
// Crimson Vortex
// Golden Eagles
// Night Owls
// Arctic Flames
// Vortex Scorpions
// Emerald Vipers
// Steel Wolves
// Black Dragons
// Diamond Rams
// Blazing Knights
// Frost Guardians
// Storm Wolves
// Scarlet Pythons
// Blue Coyotes
// Thunderbolts
// Iron Griffins
// Crimson Blizzards
// Golden Stingers
// Night Marauders
// Blaze Falcons
// Storm Riders
// Arctic Rhinos
