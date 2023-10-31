import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: Date,
  });


export const messagesModel = mongoose.model(messagesCollection, messagesSchema);

