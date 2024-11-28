const mongoose = require("mongoose");
const Event = require("./models/event");
const EventGroup = require("./models/eventGroup");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hubfast");
  console.log("Mongo connection open");
}

// CLEAR DATABASE

//

const wipe = async () => {
  await EventGroup.deleteMany({});
};

wipe();

let pageSize = 500;
let page = 0;
let url = `https://crmapi.tix.no/v3/eventgroups?page=${page}&pageSize=${pageSize}`;
let counter = 0;

const fetchEvents = async () => {
  const token = "d58eacefab084f43b2a02a1398c4d594";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    url = data["Next"];
    console.log("Fetched data:", data);

    return data;
  } catch (error) {
    //console.error("Error fetching events:", error);
  }
};

const run = async () => {
  while (url) {
    console.log("running");
    console.log("Counter:", counter);

    const data = await fetchEvents();
    if (!data) {
      break; // Stopper løkka hvis det ikke kommer data
    }
    // Loop og lagre.
    for (let eventGroup of data["Data"]) {
      // Formatter datoen til DD.MM.YYYY
      let { EventGroupId, Name, SubTitle, Description, Edited } = eventGroup;

      const newEventGroup = new EventGroup({
        _id: EventGroupId,
        title: Name,
        subtitle: SubTitle,
        description: Description,
        edited: Edited,
      });
      try {
        await newEventGroup.save();
      } catch (error) {
        console.log(error);
      }
    }
    counter += 1;
  }
  console.log("Finished fetching events.");
  console.log(`Counter : ${counter}`);
};

run();
