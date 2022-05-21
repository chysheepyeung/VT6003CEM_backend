import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema(
    {
        msg: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        type: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', msgSchema);
export default Message;