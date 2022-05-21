import Msg from '../../model/Message/MessageModel.js'

const getAllMsg = async function (ctx) {
    try {
        let msg = null;
        if (ctx.body.user.isAdmin) {
            msg = await Msg.find({ type: "send" }).populate('user').sort([["createdAt", -1]]);
        } else {
            msg = await Msg.find({ user: ctx.body.user._id, type: "reply" }).sort([["createdAt", -1]]);
        }
        if (msg) {
            ctx.status = 201;
            ctx.body = msg;
            return;
        } else {
            ctx.status = 403;
            ctx.body = { message: "No Message Yet" };
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error };
    }

}

const createMsg = async function (ctx) {
    try {
        const newMsg = new Msg({
            msg: ctx.request.body.message,
            user: ctx.request.body.user ? ctx.request.body.user : ctx.body.user._id,
            type: ctx.params.type
        });
        const msg = await newMsg.save();
        if (msg) {
            ctx.status = 201;
            ctx.body = { result: true };
            return
        }
    } catch (error) {
        ctx.status = 401;
        ctx.body = { ...error, message: 'Message send failed' };
    }
}


const deleteMsg = async function (ctx) {
    try {
        const response = await Msg.deleteOne({ _id: ctx.params.id });
        if (response) {
            ctx.status = 200;
            ctx.body = { result: false };
            return;
        }
    } catch (error) {
        ctx.status = 404;
        ctx.body = { ...error, message: 'Message deleted failed' };
    }
};

export { getAllMsg, createMsg, deleteMsg }