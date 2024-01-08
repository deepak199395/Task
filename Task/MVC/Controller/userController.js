const userModel = require('../Models/userModel')
const userRegister=async(req,res)=>{
try {
    const {name,lastname,email,password,phone}= req.body;
    const user = await userModel.create({
      name,
      lastname,
      email,
      password,
      phone,
    })
    const token =user.createJWT()

    res.status(200).json({
     success:true,
      massage:" user register succssfully",
     user:{
        name:user.name,
        lastname:user.lastname,
        email:user.email,
        phone:user.phone,
     },
     token,
    })
} catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        massage:"user register failed",
    })
}
}
// get user
const getuser= async(req,res)=>{
try {
    const user= await userModel.find({})
    res.status(200).json({
        success:true,
        massage:"get all user seccessfully",
        totalusers:user.length,
        user,
    })
} catch (error) {
    console.log(`error in get user ${error}`)
    res.status(500).send({
        success:false,
        massage:"user not found",
        error
    })
}
}

// login controllers 

const userloginController =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(500).json({
                success:false,
                massage:"all filed are require to fill"
            })
            }
            const user = await userModel.findOne({email})
            if(!user){
                return res.status(400).json({
                    success:false,
                    massage:"login cridential"
                })
            }
            // compare password
            const isMatch = await user.comparePassword(password)
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    massage:"user email and password are inlavid "
                })
            }
            const token = user.createJWT()
            res.status(200).json({
                success:true,
                massage:"user login successfully",
                user:{
                    name:user.name,
                    lastname:user.lastname,
                    email:user.email,
                    phone:user.phone
 
                },
                token,
            })
    } catch (error) {
       console.log(error) 
    }
}
module.exports={userRegister,getuser,userloginController}
