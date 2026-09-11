import userModel from "../models/user.model.js";

export let createuser = async ({name, email, password, role}) => {
    let user = await userModel.create({
        name,
        email,
        password,
        role,
    });
    return user;
}


export let findUserByEmail = async (email) =>{
      return await userModel.findOne({email});
}

export let findUserById = async (userId) =>{
    return await userModel.findById(userId);
}

export let updateUserById = async (userId, updateData) =>{
    return await userModel.findByIdAndUpdate(userId, updateData, {new:true});
}
