const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true }, // ISO string
    description: { type: String, required: true },
    wing: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
