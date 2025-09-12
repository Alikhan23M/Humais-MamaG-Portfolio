import mongoose from 'mongoose';
const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    imagePosition: { type: String, enum: ['left', 'right'], default: 'left' },
});

const detailsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    sections: [sectionSchema],
}, { timestamps: true });

export default mongoose.models.Details || mongoose.model('Details', detailsSchema);