import Fav from '../../model/Favourite/FavouriteModel.js'

const getAllFav = async function (ctx) {
    try {
        const fav = await Fav.find({ user: ctx.body.user._id }).populate('dog');
        if (fav) {
            ctx.status = 201;
            ctx.body = fav;
            return;
        } else {
            ctx.status = 403;
            ctx.body = { message: "No Favourite Items, Please go add some" };
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }

}

const chkFav = async function (ctx) {
    try {
        const fav = await Fav.find({ user: ctx.body.user._id, dog: ctx.params.id });
        if (fav.length > 0) {
            ctx.status = 201;
            ctx.body = { result: true };
            return;
        } else {
            ctx.status = 403;
            ctx.body = { result: false };
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { result: false };
    }

}

const createFav = async function (ctx) {
    try {

        const newFav = new Fav({
            user: ctx.body.user._id,
            dog: ctx.request.body.dogId
        });
        const fav = await newFav.save();
        if (fav) {
            ctx.status = 201;
            ctx.body = { result: true };
            return
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { ...error, message: 'Favourite added failed' };
    }
}


const deleteFav = async function (ctx) {
    try {
        const response = await Fav.deleteOne({ user: ctx.body.user._id, dog: ctx.params.id });

        if (response) {
            ctx.status = 200;
            ctx.body = { result: false };
            return;
        }


    } catch (error) {
        ctx.status = 404;
        ctx.body = { ...error, message: 'Favourite deleted failed' };
    }
};

export { getAllFav, chkFav, createFav, deleteFav }