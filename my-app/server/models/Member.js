const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ['coordinator', 'member'], required: true },
    wing: { type: String, required: true },
    bio: { type: String, default: '' },
    image: { type: String },
    isOverallCoordinator: { type: Boolean, default: false },
    socials: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Member || mongoose.model('Member', MemberSchema);
