import * as authService from '../services/auth.service.js';

export let registerController = async (req, res) =>{
    try{
        const { name, email, password } = req.body;

        let user = await authService.registerService({name, email, password});

        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user
        })

        
    } catch(error) {
        
        res.status(400).json({
            success:false,
            message:error.message
        })
    
    }
}

export let loginController = async (req, res) =>{
    try{

        let {email, password} = req.body;

        let result = await authService.loginService({email, password});

        res.cookie("accessToken", result.accessToken, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:result.user
        })

        
    } catch(error){
            res.status(401).json({
                success:false,
                message:error.message
            })
    }
}

export let refreshTokenController = async(req, res) =>{

    try{
        let refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            throw new Error("Refresh token not found");
        }

        let accessToken = await authService.refreshTokenService(refreshToken);

        res.cookie("accessToken", accessToken, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(200).json({
            success:true,
            message:"Access token refreshed successfully",
            data:null
        })

    } catch(error){
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

export let getCurrentuserController = async (req, res) =>{
    try{
        let user = req.user;

        if(!user) {
            throw new Error("User not found");
        }

        return res.status(200).json({
            success:true,
            message:"Current user fetched successfully",
            data:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
