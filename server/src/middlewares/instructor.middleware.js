
export let instructorMiddleware = (req, res, next) => {
    try{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }

        if(req.user.role !== "instructor"){
            return res.status(403).json({
                success:false,
                message:"Access denied. Instructors only"
            })
        }
        next();
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}