import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/100x100'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);