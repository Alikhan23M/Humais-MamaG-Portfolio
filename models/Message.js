import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

// Prevent OverwriteModelError in Next.js hot reload
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;