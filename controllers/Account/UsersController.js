import User from '../../model/Account/UsersModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils.js'

const getAllUsers = async function (ctx) {
    User.find({}, function (error, users) {
        if (error) {
            ctx.body = error;
        }
        ctx.body = users;
    });
};

const register = async function (ctx) {
    const duplicatedUser = await User.findOne({ email: ctx.request.body.email });
    if (duplicatedUser) {
        ctx.status = 401;
        ctx.body = { message: "This email has been used" };
        return;
    }
    var isAdmin = (ctx.request.body.registerCode != null && ctx.request.body.registerCode === "ILOVEDOGS")
    const newUser = new User({
        fname: ctx.request.body.firstName,
        lname: ctx.request.body.lastName,
        email: ctx.request.body.email,
        password: bcrypt.hashSync(ctx.request.body.password),
        isAdmin: isAdmin,
    });

    try {
        const user = await newUser.save();
        if (user) {
            ctx.status = 201;
            // ctx.body = {
            //     fname: user.fname,
            //     lname: user.lname,
            //     email: user.email,
            //     password: user.password,
            //     isAdmin: user.isAdmin,
            //     token: generateToken(user)
            // }
            ctx.body = { ...user._doc, token: generateToken(user) };
            return
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }

};

const login = async function (ctx) {
    const user = await User.findOne({ email: ctx.request.body.email });
    if (user) {
        if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
            ctx.status = 201;
            // ctx.body = {
            //     fname: user.fname,
            //     lname: user.lname,
            //     email: user.email,
            //     password: user.password,
            //     isAdmin: user.isAdmin,
            //     token: generateToken(user)
            // }
            ctx.body = { ...user._doc, token: generateToken(user) };
            return
        }

    } else {
        ctx.status = 401;
        ctx.body = { message: 'Invalid email or password' };
    }

}


const getOneUser = async function (ctx) {
    const user = await User.findById(ctx.request.body._id);
    if (user) {
        ctx.status = 201;
        ctx.body = user;
    } else {
        ctx.status = 404;
        ctx.body = { message: 'User Not Found' }
    }
};


const updateUser = async function (ctx) {
    const user = User.findOneAndUpdate({ _id: ctx.request.body._id }, ctx.request.body, { new: true });
    if (user) {
        ctx.status = 201;
        ctx.body = { ...user, message: "User Profile Updated" }
    } else {
        ctx.status = 404;
        ctx.body = { message: 'User Not Found' }
    }
};


const deleteUser = async function (ctx) {
    await User.remove({
        _id: ctx.request.body._id
    }, function (error, user) {
        if (error) {
            ctx.status = 404;
            ctx.body = error;
        } else {
            ctx.status = 201;
            ctx.body = { message: 'Task successfully deleted' };
        }
    });
};

export { getAllUsers, register, login, getOneUser, updateUser, deleteUser }