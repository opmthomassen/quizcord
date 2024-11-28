const mongoose = require("mongoose");
const Event = require("./models/event");
const EventGroup = require("./models/eventGroup");

const token = "d58eacefab084f43b2a02a1398c4d594";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hubfast");
  console.log("Mongo connection open");
}

// CLEAR DATABASE
const wipe = async () => {
  await Event.deleteMany({});
};

wipe();
//

let pageSize = 500;
let page = 0;
let url = `https://crmapi.tix.no/v3/events?page=${page}&pageSize=${pageSize}`;
let counter = 0;

const fetchEvents = async () => {
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
    for (let event of data["Data"]) {
      // Formatter datoen til DD.MM.YYYY
      let {
        Id,
        Name,
        SubTitle,
        Venue,
        Hall,
        EventGroupId,
        EventGroup,
        Promoter,
        Sold,
        Capacity,
        Categories,
        StartDate,
        StartDateUTCUnix,
        EndDate,
        EndDateUTCUnix,
      } = event;

      // check if EventGroupId
      // if not, create group and add event.
      // if, push event to objectarray.

      const eventGroupUrl = `https://crmapi.tix.no/v3/eventgroups/${Id}`;

      try {
        const response = await fetch(eventGroupUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eventGroupData = await response.json();
        console.log("Fetched data:", eventGroupData);

        const eventGroup = EventGroup.findOne({ _id: EventGroupId });
        console.log("********");
        console.log("********");
        console.log("********");
        console.log("********");
        console.log("********");
        console.log(eventGroup);
        console.log("********");
        console.log("********");
        console.log("********");
        console.log("********");
        console.log("********");
      } catch (error) {
        console.log(error);
      }

      const categories = [];
      for (category of Categories) {
        categories.push(category["Name"]);
      }
      const newEvent = new Event({
        _id: Id,
        title: Name,
        subtitle: SubTitle,
        venue: Venue,
        hall: Hall,
        eventGroupId: EventGroupId,
        eventGroup: EventGroup,
        promoter: Promoter,
        sold: Sold,
        capacity: Capacity,
        categories: categories,
        startDate: StartDate,
        startDateUTCUnix: StartDateUTCUnix,
        endDate: EndDate,
        endDateUTCUnix: EndDateUTCUnix,
      });
      await newEvent.save();
    }
    counter += 1;
  }
  console.log("Finished fetching events.");
};

run();

// _id: Number,
//   title: String,
//   subtitle: String,
//   venue: String,
//   hall: String,
//   eventGroupId: String,
//   eventGroup: String,
//   promoter: String,
//   sold: Number,
//   capacity: Number,
//   categories: [
//     {
//       type: String,
//     },
//   ],
//   startDate: Date,
//   startDateUTCUnix: Number,
//   endDate: Date,
//   endDateUTCUnix: Number,
