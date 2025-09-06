import mongoose from 'mongoose';
const { Schema } = mongoose;

const statsSchema = new Schema({
    icon: {
        type: String,
        default: "No icon",
        required: true,
    },
    value: {
        type: String,
        default: "0",
        required: true,
    },
    text: {
        type: String,
        default: "No description",
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Stats || mongoose.model('Stats', statsSchema);