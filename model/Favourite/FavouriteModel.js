import mongoose from 'mongoose';

const favSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dogs', required: true }
    },
    {
        timestamps: true,
    }
);

favSchema.index({ user: 1, dog: 1 }, { unique: true });

const Fav = mongoose.model('Favourites', favSchema);
export default Fav;