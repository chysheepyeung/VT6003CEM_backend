import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
};

export const isAuth = async (ctx, next) => {
    const authorization = ctx.request.header.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if (decode) {
                ctx.body = { ...ctx.body, user: decode };
                await next()
            }
        } catch {
            ctx.status = 401;
            ctx.body = { message: 'Invalid Token' };
            return
        }

    } else {
        ctx.status = 401;
        ctx.body = { message: 'No Token' };
    }
};

export const isAdmin = async (ctx, next) => {
    if (ctx.body.user && ctx.body.user.isAdmin) {
        await next();
    } else {
        ctx.status = 401;
        ctx.body = { message: 'Invalid Admin Token' };
    }
};
