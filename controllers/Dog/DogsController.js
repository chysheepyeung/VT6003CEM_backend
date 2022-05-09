import Dog from '../../model/Dog/DogsModel.js'

const getAllDog = async function (ctx) {
    try {
        const dogs = await Dog.find();
        if (dogs) {
            ctx.status = 201;
            ctx.body = dogs;
            return;
        } else {
            ctx.status = 403;
            ctx.body = { message: "No Dogs Available Currently" };
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }

}

const getOneDog = async function (ctx) {
    try {
        const dog = await Dog.findById(ctx.request.body._id);
        if (dog) {
            ctx.status = 201;
            ctx.body = dog;
            return;
        } else {
            ctx.status = 403;
            ctx.body = { message: "Dog Not Found" };
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }

}

const createDog = async function (ctx) {
    try {
        const body = ctx.request.body;
        const newDog = new Dog({
            name: body.name,
            sex: body.sex,
            pic: body.pic,
            breed: body.breed,
            age: body.age,
            intro: body.intro
        });

        const dog = await newDog.save();
        if (dog) {
            ctx.status = 201;
            ctx.body = dog;
            return
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }
}


const updateDog = async function (ctx) {
    const dog = Dog.findOneAndUpdate({ _id: ctx.request.body._id }, ctx.request.body, { new: true });
    if (dog) {
        ctx.status = 201;
        ctx.body = { ...dog._doc, message: "Dog Profile Updated" }
    } else {
        ctx.status = 404;
        ctx.body = { message: 'Dog Not Found' }
    }
};


const deleteDog = async function (ctx) {
    await Dog.remove({
        _id: ctx.request.body._id
    }, function (error, dog) {
        if (error) {
            ctx.status = 404;
            ctx.body = { ...error, message: 'Dog deleted failed' };
        } else {
            ctx.status = 201;
            ctx.body = { message: 'Dog successfully deleted' };
        }
    });
};

export { getAllDog, getOneDog, createDog, updateDog, deleteDog }