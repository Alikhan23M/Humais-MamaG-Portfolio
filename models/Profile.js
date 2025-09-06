import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Your Name'
  },
  title: {
    type: String,
    required: true,
    default: 'Content Writer & Digital Strategist'
  },
  bio: {
    type: String,
    required: true,
    default: 'Passionate content writer with 5+ years of experience creating engaging content that drives results.'
  },
  email: {
    type: String,
    required: true,
    default: 'hello@yourname.com'
  },
  phone: {
    type: String,
    default: '+1 (555) 123-4567'
  },
  location: {
    type: String,
    default: 'New York, USA'
  },
  profileImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=face'
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  social: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    website: { type: String, default: '' }
  }
}, {
  timestamps: true
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);