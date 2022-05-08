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

export const isAuth = (ctx, next) => {
    const authorization = ctx.req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                ctx.status = 40;
                ctx.body = { message: 'Invalid Token' };
            } else {
                ctx.body = decode;
                next();
            }
        });
    } else {
        ctx.status = 401;
        ctx.user = { message: 'No Token' };
    }
};

export const isAdmin = (ctx, next) => {
    if (ctx.user && ctx.user.isAdmin) {
        next();
    } else {
        ctx.status = 401;
        ctx.user = { message: 'Invalid Admin Token' };
    }
};
