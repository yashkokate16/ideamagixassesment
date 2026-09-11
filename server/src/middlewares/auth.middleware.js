import * as authUtils from "../utils/auth.utils.js";
import * as userDao from "../dao/user.Dao.js";

export let authMiddleware = async (req, res, next) =>{
    
    let accessToken = req.cookies.accessToken;
    console.log("Access Token from cookies:", accessToken);

    if(!accessToken) {
        return res.status(401).json({
            success:false,
            message:"Access token not found"
        })
    }

    try{

        let decode  = authUtils.verifyAccessToken(accessToken);
        // console.log("Decoded Access Token:", decode);
    
        let user = await userDao.findUserById(decode.userId)
        // console.log("User fetched from DB:", user);

        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }

        req.user = user

        next()
    
    
    } catch(error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}