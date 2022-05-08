import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        pic: { type: String, required: true },
        breed: { type: String, required: true },
        age: { type: Int32 },
        intro: { type: String }
    },
    {
        timestamps: true,
    }
);

const Dog = mongoose.model('Dogs', dogSchema);
export default Dog;