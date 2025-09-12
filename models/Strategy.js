import mongoose from "mongoose";

const StrategySchema = new mongoose.Schema({
    title:String,
    description:String,
    icon:String
})

export default mongoose.models.Strategy || mongoose.model('Strategy',StrategySchema);