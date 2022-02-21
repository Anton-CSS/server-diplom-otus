const { Schema, model } = require("mongoose");

const Event = new Schema({
  author: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  guest: { type: String, required: true },
});

module.exports = model("Event", Event);
