import * as userDao from '../dao/user.Dao.js';
import * as authUtils from '../utils/auth.utils.js';


export let registerService = async ({name, email, password}) => {
    if(!name || !email || !password) {
        throw new Error("All fields are required");
    }

    let isUserExist = await userDao.findUserByEmail(email);
    if(isUserExist) {
        throw new Error("User already exists");
    }

    let user = await userDao.createuser({
        name,
        email,
        password,
        role: "instructor"
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
}


export let loginService = async ({email, password}) =>{
    
    if(!email || !password) {
        throw new Error("All fields are required");
    }

    let user = await userDao.findUserByEmail(email);
    if(!user) {
        throw new Error("User not found");
    }

    let isPasswordValid = await user.comparepassword(password);
    if(!isPasswordValid) {
        throw new Error("Invalid password");
    }
    let accessToken = authUtils.generateAccessToken(user);
    let refreshToken = authUtils.generateRefreshToken(user);

   return {
    user :{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
    accessToken,
    refreshToken
   }
}

export let refreshTokenService = async (refreshToken) => {
    if(!refreshToken) {
        throw new Error("Refresh token is required");
    }
    let decoded = authUtils.verifyRefreshToken(refreshToken);

    let user = await userDao.findUserById(decoded.userId);

    if(!user) {
        throw new Error("User not found");
    }

    if(user.role !== decoded.role) {
        throw new Error("Invalid role");
    }

    return authUtils.generateAccessToken(user);

}

