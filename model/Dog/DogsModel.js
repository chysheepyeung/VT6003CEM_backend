import mongoose from 'mongoose';

const dogSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sex: { type: String, required: true },
        pic: { type: String },
        breed: { type: String, required: true },
        age: { type: Number, required: true },
        intro: { type: String }
    },
    {
        timestamps: true,
    }
);

const Dog = mongoose.model('Dogs', dogSchema);
export default Dog;