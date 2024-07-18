import Contect from "../Models/ContectSchema.js";

export const CreateContect = async(req,res) =>{

    try { 
        const userId = req.user.id;
        const newContect = new Contect({...req.body,userId});
        newContect.save();
        res.status(200).json({success: true,message:"save successfully",data:newContect})
    } catch (error) {
        res.status(400).json({success:false,message: error.message});
    }

}