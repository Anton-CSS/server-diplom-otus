const User = require("../models/User");
const Event = require("../models/Event");

class EventController {
  async receiveGuests(req, res) {
    try {
      const guests = await User.find();
      res.status(200).json(guests);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Server has crashed during gets guests: ${e}` });
    }
  }

  async addEvent(req, res) {
    try {
      const event = req.body;
      const { author, status, date, description, guest } = event;
      if (!event) {
        res.status(400).json({ message: `Event have not found` });
      }
      const newEvent = new Event({ author, status, date, description, guest });
      console.log(newEvent);
      await newEvent.save();
      const events = await Event.find();
      res.status(200).json(events);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({
          message: `Server has crashed during of the adding of the event: ${e}`,
        });
    }
  }

  async getEvents(req, res) {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Server has crashed during gets events: ${e}` });
    }
  }
}

module.exports = new EventController();
