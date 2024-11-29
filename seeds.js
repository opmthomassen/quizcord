const mongoose = require("mongoose");
const Player = require("./models/player");
const Team = require("./models/team");
//const Jotun = require("./models/jotun");
const TeamDescription = require("./models/teamDescription");
const categories = require("./utils/categories");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quizcord");
  console.log("Mongo connection open");
}

// CLEAR DATABASE

//

const wipe = async () => {
  //await Jotun.deleteMany({});
  await TeamDescription.deleteMany({});
  await Team.deleteMany({});
  await Player.deleteMany({});
};

wipe();

const players = [
  {
    name: "Fredrik",
    age: 23,
    gender: "♂ Male",
    active: true,
  },
  {
    name: "Ole Petter",
    age: 83,
    gender: "♂ Male",
    active: true,
  },
  {
    name: "Jonathan",
    age: 17,
    gender: "♂ Male",
    active: true,
  },
  {
    name: "ElisabetH",
    age: 40,
    gender: "♀ Female",
    active: true,
  },
  {
    name: "Nhatalie",
    age: 37,
    gender: "♀ Female",
    active: true,
  },
];

Player.insertMany(players);

const jotunArr = [
  { name: "Comfort Grey", hex: "#BEB9AF" },
  { name: "Kokos", hex: "#E3DDCD" },
  { name: "Ascott", hex: "#C8C3B8" },
  { name: "Malmø", hex: "#E4DCBC" },
  { name: "Adventure", hex: "#A38269" },
  { name: "Hvit Te", hex: "#D4CBB9" },
  { name: "Peach Sky", hex: "#EAD0B1" },
  { name: "Tender Greige", hex: "#908C85" },
  { name: "Muted Coral", hex: "#BB7D69" },
  { name: "Shams", hex: "#E3C4A2" },
  { name: "Sandbeige", hex: "#B7AD9C" },
  { name: "Mellow", hex: "#8B7467" },
  { name: "Free Spirit", hex: "#6B7E7E" },
  { name: "Darjeeling", hex: "#9BADAB" },
  { name: "Spring Breeze", hex: "#D5E0DC" },
  { name: "Pistachio", hex: "#C8CDAF" },
  { name: "Peachy", hex: "#C1A082" },
  { name: "Cypress", hex: "#929D82" },
  { name: "Forest Light", hex: "#D8C8A2" },
  { name: "Silky Blue", hex: "#D2DADB" },
  { name: "Earthy Yellow", hex: "#CDBC94" },
  { name: "Shade", hex: "#9D9385" },
  { name: "Secret Green", hex: "#D9DDC5" },
  { name: "Avocado Green", hex: "#B8BF9B" },
  { name: "Grey Touch", hex: "#D8D4CB" },
  { name: "Athenian Blue", hex: "#8B9B99" },
  { name: "Sea Mist", hex: "#BCD0CC" },
  { name: "Rural", hex: "#AF957A" },
  { name: "Sunny Green", hex: "#D0CCB1" },
  { name: "Khaki Yellow", hex: "#AF9E7A" },
  { name: "Frostrøyk", hex: "#E4E0D3" },
  { name: "Soothing Beige", hex: "#CAC0AF" },
  { name: "Antwerp Beige", hex: "#B9AF9F" },
  { name: "Sheer Grey", hex: "#CCC7BD" },
  { name: "Comfort Grey", hex: "#BEB9AF" },
  { name: "Bergknatt", hex: "#696967" },
  { name: "Soft Brown", hex: "#89755F" },
  { name: "Rock Sugar", hex: "#BD9E7A" },
  { name: "Klassisk Hvit", hex: "#F0EFE9" },
  { name: "Mindful Green", hex: "#7C877C" },
  { name: "Subtle Green", hex: "#ABAF9B" },
  { name: "Green Tea", hex: "#9F9B7C" },
  { name: "Mexico", hex: "#B99E6B" },
  { name: "Fresh Pasta", hex: "#E9DAB1" },
  { name: "True Blue", hex: "#426884" },
  { name: "Muted Coral", hex: "#BB7D69" },
  { name: "Jord", hex: "#7E6A62" },
  { name: "Healing Lavender", hex: "#A59D9A" },
  { name: "Fabrikk", hex: "#BBC0C0" },
  { name: "Refleksjon", hex: "#EBE9E1" },
  { name: "Earthy Yellow", hex: "#CDBC94" },
  { name: "Pistachio", hex: "#C8CDAF" },
  { name: "Indi Pink", hex: "#D1B9AA" },
  { name: "Urtehage", hex: "#B2A97F" },
  { name: "Lysning", hex: "#CDB385" },
  { name: "Soft", hex: "#DCD1BA" },
  { name: "Burnt Ochre", hex: "#C99765" },
  { name: "Rustic Brown", hex: "#887E6E" },
  { name: "Contemporary White", hex: "#E1DACA" },
  { name: "Natural Green", hex: "#7A7861" },
  { name: "Silke", hex: "#EAE7DC" },
  { name: "Dempet Savanne", hex: "#BCAA8F" },
  { name: "Sophisticated Red", hex: "#7C5953" },
  { name: "Soft Radiance", hex: "#D9CCB0" },
  { name: "Statement Red", hex: "#A6544A" },
  { name: "Poetry Red", hex: "#9B6156" },
  { name: "Collected Blue", hex: "#99A6A5" },
  { name: "Bella", hex: "#D9916D" },
  { name: "Dusk Green", hex: "#C4C7B1" },
  { name: "Vårluft", hex: "#D6CBA4" },
  { name: "Cheerful Peach", hex: "#F0CFA6" },
  { name: "Kokos", hex: "#E3DDCD" },
  { name: "Space", hex: "#D6CFBF" },
  { name: "Lavender Touch", hex: "#BBB2AD" },
  { name: "Sans", hex: "#E6DFCE" },
  { name: "Observe", hex: "#CEBDA2" },
  { name: "0 Caravan", hex: "#CCB394" },
  { name: "Kalkoker", hex: "#C49F71" },
  { name: "Shade", hex: "#9D9385" },
  { name: "Hvit Te", hex: "#D4CBB9" },
  { name: "Embrace", hex: "#B58D6F" },
  { name: "Rusty", hex: "#A47251" },
  { name: "Iron Blue", hex: "#6F7677" },
  { name: "Chi", hex: "#F3F4EE" },
  { name: "Imagine", hex: "#ADC0B7" },
  { name: "Wish", hex: "#89A5A2" },
  { name: "Sjøsmaragd", hex: "#739592" },
  { name: "Hope", hex: "#AFAD88" },
  { name: "Palmetto", hex: "#758168" },
  { name: "Lavender Touch", hex: "#BBB2AC" },
  { name: "Fresh Pasta", hex: "#E9DAB1" },
  { name: "Sommersol", hex: "#E9CE8D" },
  { name: "Slate Lavender", hex: "#8E8687" },
  { name: "Frostrøyk", hex: "#E4E0D3" },
  { name: "Present", hex: "#B5AB9E" },
  { name: "Soft Comfort", hex: "#8A8176" },
  { name: "Gentle Whisper", hex: "#D2CBBF" },
  { name: "Friendly Pink", hex: "#C5B5A7" },
  { name: "Thoughtful", hex: "#B5A395" },
  { name: "Antique Brass", hex: "#BC9683" },
  { name: "Lys Granitt", hex: "#D3B9A5" },
  { name: "Pale Linden", hex: "#C6C6B6" },
  { name: "Coastal Blue", hex: "#6D7D83" },
  { name: "Natural Blue", hex: "#88959A" },
  { name: "Ocean Air", hex: "#9DAAAF" },
  { name: "Cityscape", hex: "#8C9893" },
  { name: "Iconic", hex: "#A1ABA6" },
  { name: "Løvsal", hex: "#C5C6B8" },
  { name: "Vintage Brown", hex: "#887D73" },
  { name: "Granskygge", hex: "#B9AF9B" },
  { name: "Mørk Strandsand", hex: "#CDC6B4" },
  { name: "Mellow", hex: "#8B7467" },
  { name: "Soft", hex: "#DCD1BA" },
  { name: "Silhouette", hex: "#BFB49C" },
  { name: "Belgian Brown", hex: "#7F7160" },
  { name: "Contemporary White", hex: "#E1DACA" },
  { name: "Gul Antikk", hex: "#D4B58B" },
  { name: "Hummus", hex: "#DACBB3" },
  { name: "Welcoming Red", hex: "#A06C5E" },
  { name: "Desert Pink", hex: "#BF9F86" },
  { name: "Earthy Brown", hex: "#6F5846" },
  { name: "Impression", hex: "#BBA78E" },
  { name: "Observe", hex: "#CEBDA2" },
  { name: "Silke", hex: "#EAE7DB" },
  { name: "Tidløs", hex: "#E0DDD2" },
  { name: "Natural Clay", hex: "#B07C5A" },
  { name: "Exhale", hex: "#B7BDB3" },
  { name: "Curious Mind", hex: "#B7A992" },
  { name: "Local Green", hex: "#948A6F" },
  { name: "Adventure", hex: "#A38269" },
  { name: "Wisdom", hex: "#615957" },
  { name: "Humble Yellow", hex: "#D3C5AB" },
  { name: "Daydream", hex: "#806A62" },
  { name: "Statement Blue", hex: "#395068" },
  { name: "Free Spirit", hex: "#6B7E7E" },
  { name: "Grounded Red", hex: "#92695A" },
  { name: "Lively Red", hex: "#A87362" },
  { name: "Serene Blue", hex: "#798484" },
  { name: "Slate Lavender", hex: "#8E8687" },
  { name: "Peachy", hex: "#C1A082" },
  { name: "Amber Red", hex: "#9B6C5C" },
  { name: "Northern Mystic", hex: "#696D61" },
  { name: "Tidløs", hex: "#E0DDD2" },
  { name: "Space", hex: "#D6CFBF" },
  { name: "Soothing Beige", hex: "#CAC0AF" },
  { name: "Modern Beige", hex: "#BFB3A3" },
  { name: "Refleksjon", hex: "#EBE9E1" },
  { name: "Sheer Grey", hex: "#CCC7BD" },
  { name: "Comfort Grey", hex: "#BEB9AF" },
  { name: "Varmgrå", hex: "#AFA99C" },
  { name: "Airy Green", hex: "#D8DBCF" },
  { name: "Refresh", hex: "#CACFC3" },
  { name: "Treasure", hex: "#A3A798" },
  { name: "Antique Green", hex: "#8A8F81" },
  { name: "Gleam", hex: "#E4DBC4" },
  { name: "Soft Radiance", hex: "#D9CCAF" },
  { name: "Silky Yellow", hex: "#CCBD9D" },
  { name: "Refined Yellow", hex: "#C2B08D" },
  { name: "Soft Touch", hex: "#DCD0BF" },
  { name: "Devine", hex: "#D2BEA9" },
  { name: "Dusky Peach", hex: "#C0A78D" },
  { name: "Rural", hex: "#AF957A" },
  { name: "Transparent Pink", hex: "#DACEC0" },
  { name: "Rustic Pink", hex: "#CAB7A7" },
  { name: "Senses", hex: "#BEA795" },
  { name: "Organic Red", hex: "#987A6A" },
  { name: "Red Maple", hex: "#795956" },
  { name: "Dusty Rose", hex: "#A0847A" },
  { name: "Silky Pink", hex: "#BDA79F" },
  { name: "Myk/Artist Clay", hex: "#CBC0B9" },
  { name: "Industrial Blue", hex: "#4E616C" },
  { name: "Blåis/Icy Blue", hex: "#808D92" },
  { name: "Dusky Blue", hex: "#9EADB2" },
  { name: "Nordic Breeze Milano", hex: "#BBC6C8" },
  { name: "Dark Teal", hex: "#506364" },
  { name: "Evening Green", hex: "#808985" },
  { name: "Soft Teal", hex: "#9AA49E" },
  { name: "Tender Green", hex: "#B7C1BD" },
  { name: "Golden Bronze", hex: "#887760" },
  { name: "Sandy", hex: "#A29179" },
  { name: "Raw Canvas", hex: "#BEAF97" },
  { name: "Tidløs/Timeless", hex: "#E0DDD2" },
  { name: "Smoked Oak", hex: "#6C6358" },
  { name: "Hipster brown", hex: "#857C6E" },
  { name: "Almond Beige", hex: "#A69A88" },
  { name: "Space", hex: "#D6CFBF" },
  { name: "Norwegian Wood", hex: "#7F5C47" },
  { name: "Savanna Sunset", hex: "#AF8A76" },
  { name: "Blushing Peach", hex: "#C3A590" },
  { name: "Soft Skin", hex: "#CBBBAC" },
  { name: "Organic Green", hex: "#646556" },
  { name: "Green Tea", hex: "#9F9B7C" },
  { name: "Laurbær/Laurel", hex: "#B0AE96" },
  { name: "Pale Linden", hex: "#C6C6B6" },
  { name: "Elegant", hex: "#605D58" },
  { name: "Valmuefrø/Pebblestone", hex: "#96938B" },
  { name: "Antikkgrå/Objective", hex: "#BEBCB2" },
  { name: "Lys Antikkgrå/Bare", hex: "#D4D3C8" },
  { name: "Linblå", hex: "#919DA0" },
  { name: "St. Pauls Blue", hex: "#697477" },
  { name: "Minty Breeze", hex: "#ACB2A8" },
  { name: "Band Stone", hex: "#7F7971" },
  { name: "Form", hex: "#9B948A" },
  { name: "Washed Linen", hex: "#C9C3B6" },
  { name: "Klassisk Hvit", hex: "#F0EFE9" },
  { name: "Cashmere", hex: "#B19C80" },
  { name: "Letthet", hex: "#F2F1E8" },
  { name: "Frostrøyk", hex: "#E4E0D3" },
  { name: "Deco Pink", hex: "#DBC4B7" },
  { name: "Dusty Red", hex: "#806159" },
  { name: "Velvet Grey", hex: "#766F66" },
  { name: "Pale Green", hex: "#BABAA5" },
  { name: "Evergreen", hex: "#787664" },
  { name: "Delightful Pink", hex: "#CBAB99" },
  { name: "Sjel", hex: "#ECE8D7" },
  { name: "Skandinavisk Lys", hex: "#E7DFCD" },
  { name: "Dijon Yellow", hex: "#A98259" },
  { name: "Kilim", hex: "#714F44" },
  { name: "Olive Brown", hex: "#7F644C" },
  { name: "Heat", hex: "#995F4D" },
  { name: "Masala", hex: "#C79F6E" },
  { name: "Dusty Purple", hex: "#7D6668" },
];

const sportNames = [
  { name: "Arctic Bears", hex: "#2E8B57" },
  { name: "Thunder Hawks", hex: "#1E90FF" },
  { name: "Iron Wolves", hex: "#696969" },
  { name: "Crimson Dragons", hex: "#DC143C" },
  { name: "Blue Sharks", hex: "#4682B4" },
  { name: "Silver Storm", hex: "#C0C0C0" },
  { name: "Wild Stallions", hex: "#8B4513" },
  { name: "Golden Raptors", hex: "#FFD700" },
  { name: "Steel Panthers", hex: "#708090" },
  { name: "Midnight Lions", hex: "#191970" },
  { name: "Frost Giants", hex: "#ADD8E6" },
  { name: "Phoenix Fury", hex: "#FF4500" },
  { name: "Red Vipers", hex: "#B22222" },
  { name: "Black Owls", hex: "#000000" },
  { name: "Blazing Bulls", hex: "#FF6347" },
  { name: "Desert Scorpions", hex: "#DEB887" },
  { name: "Avalanche Falcons", hex: "#A9A9A9" },
  { name: "Copper Cobras", hex: "#B87333" },
  { name: "Stormbringers", hex: "#4169E1" },
  { name: "Nightshade Wolves", hex: "#4B0082" },
  { name: "Scarlet Ravens", hex: "#8B0000" },
  { name: "Electric Eels", hex: "#00BFFF" },
  { name: "Glacier Guardians", hex: "#B0E0E6" },
  { name: "Titan Tigers", hex: "#FFA500" },
  { name: "Razorback Rhinos", hex: "#696969" },
  { name: "Emerald Knights", hex: "#50C878" },
  { name: "Fire Ants", hex: "#FF4500" },
  { name: "Tidal Titans", hex: "#1E90FF" },
  { name: "Silverback Gorillas", hex: "#708090" },
  { name: "Blaze Badgers", hex: "#FF7F50" },
  { name: "Frostbite Cougars", hex: "#5F9EA0" },
  { name: "Thunderbolts", hex: "#4169E1" },
  { name: "Crimson Coyotes", hex: "#DC143C" },
  { name: "Ironclad Mustangs", hex: "#8B4513" },
  { name: "Steel Sabres", hex: "#708090" },
  { name: "Golden Grizzlies", hex: "#FFD700" },
  { name: "Blue Hornets", hex: "#4682B4" },
  { name: "Wild Boars", hex: "#8B4513" },
  { name: "Stone Dragons", hex: "#696969" },
  { name: "Inferno Hawks", hex: "#FF4500" },
  { name: "Night Raiders", hex: "#000000" },
  { name: "Storm Chasers", hex: "#1E90FF" },
  { name: "Crimson Cobras", hex: "#DC143C" },
  { name: "Bronze Bulls", hex: "#CD7F32" },
  { name: "Ice Eagles", hex: "#B0E0E6" },
  { name: "Diamond Devils", hex: "#8B008B" },
  { name: "Redwood Bears", hex: "#8B4513" },
  { name: "Black Widows", hex: "#000000" },
  { name: "Lightning Lynx", hex: "#FFD700" },
  { name: "Shadow Scorpions", hex: "#4B0082" },
  { name: "Iron Kings", hex: "#708090" },
  { name: "Flame Falcons", hex: "#FF4500" },
  { name: "Emerald Eagles", hex: "#50C878" },
  { name: "Glacier Gators", hex: "#ADD8E6" },
  { name: "Crimson Stags", hex: "#DC143C" },
  { name: "Thunder Rams", hex: "#1E90FF" },
  { name: "Electric Wolves", hex: "#00BFFF" },
  { name: "Arctic Foxes", hex: "#ADD8E6" },
  { name: "Steel Cyclones", hex: "#708090" },
  { name: "Vortex Vipers", hex: "#4B0082" },
  { name: "Blazing Falcons", hex: "#FF6347" },
  { name: "Scarlet Serpents", hex: "#8B0000" },
  { name: "Golden Wildcats", hex: "#FFD700" },
  { name: "Black Raptors", hex: "#000000" },
  { name: "Frostfire Dragons", hex: "#DC143C" },
  { name: "Night Howlers", hex: "#4B0082" },
  { name: "Storm Hawks", hex: "#1E90FF" },
  { name: "Diamond Dolphins", hex: "#4682B4" },
  { name: "Glacier Gryphons", hex: "#B0E0E6" },
  { name: "Blue Barracudas", hex: "#1E90FF" },
  { name: "Iron Bisons", hex: "#696969" },
  { name: "Inferno Raptors", hex: "#FF4500" },
  { name: "Frost Wolves", hex: "#ADD8E6" },
  { name: "Silver Serpents", hex: "#C0C0C0" },
  { name: "Thunder Bears", hex: "#4682B4" },
  { name: "Crimson Titans", hex: "#DC143C" },
  { name: "Tundra Tigers", hex: "#5F9EA0" },
  { name: "Steel Sharks", hex: "#708090" },
  { name: "Blazing Beavers", hex: "#FF7F50" },
  { name: "Black Eagles", hex: "#000000" },
  { name: "Scarlet Falcons", hex: "#8B0000" },
  { name: "Diamond Jackals", hex: "#8B008B" },
  { name: "Redwood Rattlers", hex: "#8B4513" },
  { name: "Night Fury", hex: "#4B0082" },
  { name: "Vortex Hawks", hex: "#4682B4" },
  { name: "Icebreakers", hex: "#ADD8E6" },
  { name: "Arctic Eagles", hex: "#B0E0E6" },
  { name: "Bronze Bears", hex: "#CD7F32" },
  { name: "Iron Panthers", hex: "#696969" },
  { name: "Crimson Lions", hex: "#DC143C" },
  { name: "Frost Sabres", hex: "#5F9EA0" },
  { name: "Thunder Stingers", hex: "#1E90FF" },
  { name: "Wild Whales", hex: "#4682B4" },
  { name: "Golden Bisons", hex: "#FFD700" },
  { name: "Night Crawlers", hex: "#000000" },
  { name: "Electric Panthers", hex: "#00BFFF" },
  { name: "Blaze Wolves", hex: "#FF7F50" },
  { name: "Diamond Drakes", hex: "#8B008B" },
  { name: "Arctic Stallions", hex: "#ADD8E6" },
  { name: "Scarlet Stingrays", hex: "#8B0000" },
  { name: "Glacier Eagles", hex: "#B0E0E6" },
  { name: "Steel Thunder", hex: "#708090" },
  { name: "Phoenix Knights", hex: "#FF4500" },
  { name: "Frost Giants", hex: "#ADD8E6" },
  { name: "Black Jaguars", hex: "#000000" },
  { name: "Tidal Wave", hex: "#1E90FF" },
  { name: "Blazing Rhinos", hex: "#FF6347" },
  { name: "Redwood Wolves", hex: "#8B4513" },
  { name: "Inferno Griffins", hex: "#FF4500" },
  { name: "Diamond Scorpions", hex: "#8B008B" },
  { name: "Arctic Avengers", hex: "#ADD8E6" },
  { name: "Steel Falcons", hex: "#708090" },
  { name: "Blue Marauders", hex: "#4682B4" },
  { name: "Frost Knights", hex: "#5F9EA0" },
  { name: "Scarlet Stallions", hex: "#8B0000" },
  { name: "Wild Boars", hex: "#8B4513" },
  { name: "Night Stalkers", hex: "#4B0082" },
  { name: "Storm Titans", hex: "#1E90FF" },
  { name: "Golden Lions", hex: "#FFD700" },
  { name: "Glacier Knights", hex: "#B0E0E6" },
  { name: "Red Barracudas", hex: "#B22222" },
  { name: "Thunder Wolves", hex: "#1E90FF" },
  { name: "Black Rhinos", hex: "#000000" },
  { name: "Silver Wolves", hex: "#C0C0C0" },
  { name: "Blazing Dragons", hex: "#FF6347" },
  { name: "Ice Panthers", hex: "#5F9EA0" },
  { name: "Crimson Vortex", hex: "#DC143C" },
  { name: "Golden Eagles", hex: "#FFD700" },
  { name: "Night Owls", hex: "#000000" },
  { name: "Arctic Flames", hex: "#ADD8E6" },
  { name: "Vortex Scorpions", hex: "#4B0082" },
  { name: "Emerald Vipers", hex: "#50C878" },
  { name: "Steel Wolves", hex: "#696969" },
  { name: "Black Dragons", hex: "#000000" },
  { name: "Diamond Rams", hex: "#8B008B" },
  { name: "Blazing Knights", hex: "#FF6347" },
  { name: "Frost Guardians", hex: "#5F9EA0" },
  { name: "Storm Wolves", hex: "#1E90FF" },
  { name: "Scarlet Pythons", hex: "#8B0000" },
  { name: "Blue Coyotes", hex: "#4682B4" },
  { name: "Thunderbolts", hex: "#1E90FF" },
  { name: "Iron Griffins", hex: "#708090" },
  { name: "Crimson Blizzards", hex: "#DC143C" },
  { name: "Golden Stingers", hex: "#FFD700" },
  { name: "Night Marauders", hex: "#4B0082" },
  { name: "Blaze Falcons", hex: "#FF6347" },
  { name: "Storm Riders", hex: "#1E90FF" },
  { name: "Arctic Rhinos", hex: "#ADD8E6" },
];

TeamDescription.insertMany(sportNames);
