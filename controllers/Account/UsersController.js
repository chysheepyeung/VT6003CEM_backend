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
    var isAdmin = (ctx.request.body.registerCode != null && ctx.request.body.registerCode.toUpperCase() === "ILOVEDOGS")
    console.log(ctx.request.body.registerCode)
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
            ctx.body = { ...user._doc, token: generateToken(user) };
            return
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }

};

const login = async function (ctx) {
    console.log(ctx.request.body)
    const user = await User.findOne({ email: ctx.request.body.email });
    if (user) {
        if (bcrypt.compareSync(ctx.request.body.password, user.password)) {
            ctx.status = 201;
            ctx.body = { ...user._doc, token: generateToken(user) };
            return;
        }

    }

    ctx.status = 401;
    ctx.body = { message: 'Invalid email or password' };
    return;

}


const getOneUser = async function (ctx) {
    const user = await User.findById(ctx.params.id);
    if (user) {
        ctx.status = 201;
        ctx.body = user;
    } else {
        ctx.status = 404;
        ctx.body = { message: 'User Not Found' }
    }
};


const updateUser = async function (ctx) {
    const user = User.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body, { new: true });
    if (user) {
        ctx.status = 201;
        ctx.body = { ...user, message: "User Profile Updated" }
    } else {
        ctx.status = 404;
        ctx.body = { message: 'User Not Found' }
    }
};


const deleteUser = async function (ctx) {
    try {
        const response = await User.deleteOne({ _id: ctx.params.id });
        if (response) {
            ctx.status = 201;
            ctx.body = { message: 'User successfully deleted' };
        }
    } catch (error) {
        ctx.status = 404;
        ctx.body = { ...error, message: 'User deleted failed' };
    }
};

export { getAllUsers, register, login, getOneUser, updateUser, deleteUser }