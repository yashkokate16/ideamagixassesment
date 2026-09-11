import mongoose from "mongoose";
import bcrypt from "bcryptjs";


let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:["admin","instructor"],
        default:"instructor",
    },

}, {
    timestamps:true,
})


userSchema.pre("save", async function(){
    if(!this.isModified("password")) {
        return;
    }

    if(!this.password) {
        return;
    }

    let hashpassword = await bcrypt.hash(this.password, 10);
    this.password = hashpassword;

})



userSchema.methods.comparepassword = async function(password) {
    if(!this.password) {
        return;
    }

    return await bcrypt.compare(password, this.password);

}


let userModel = mongoose.model("User", userSchema);

export default userModel;