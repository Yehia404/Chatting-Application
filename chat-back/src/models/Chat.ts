import mongoose, { Document, Schema } from 'mongoose';


interface IMessage {
    sender: mongoose.Schema.Types.ObjectId;
    content: string;
    timestamp: Date;
    seen: boolean;
}

interface IChat extends Document {
    participants: mongoose.Schema.Types.ObjectId[];
    messages: IMessage[];
}

const messageSchema: Schema<IMessage> = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true , trim: true, minlength: 1},
    timestamp: { type: Date, default: Date.now },
    seen: { type: Boolean, default: false }
});

const chatSchema: Schema<IChat> = new Schema({
    participants: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
    }],
    messages: [messageSchema]
});

const Chat = mongoose.model<IChat>('Chat', chatSchema);

export default Chat;
