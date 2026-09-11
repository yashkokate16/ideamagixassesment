import jwt from "jsonwebtoken";
import env from "../config/env.js";


export let generateAccessToken = (user) =>{
    let accessToken = jwt.sign({
        userId:user._id,
        role:user.role,
    },
    env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: "1h",
    }
);
    return accessToken;
}

export let generateRefreshToken = (user) =>{
    let refreshToken = jwt.sign({
        userId:user._id,
        role:user.role,
    },
    env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: "7d",
    }
);
    return refreshToken;
}

export let verifyAccessToken = (token) => {
    try{
        return jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new Error("Access token verification failed");
    }
    
}

export let verifyRefreshToken = (token) => {
    try{
        return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new Error("Refresh token verification failed");
        return null;
    }
}

