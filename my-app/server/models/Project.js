const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    wing: { type: String, required: true },
    link: { type: String },
    image: { type: String },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
