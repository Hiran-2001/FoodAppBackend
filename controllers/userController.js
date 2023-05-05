const userModel = require("../model/userSchema");
const bcrypt = require("bcryptjs");

                                                                     // register a user



exports.createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(422).send("plz fill all fields");
    console.log("plzz fill all fileds");
  } else {
    try {
      const anyUser = await userModel.findOne({ email: email });
      // console.log(anyUser);

      if (anyUser) {
        res.status(422).send("email is already taken");
        console.log("email already taken");
      } else if (password !== confirmPassword) {
        res.status(422).send("password doesnt match");
        console.log("password doesnt match");
      } else {
        const addUser = new userModel({
          name,
          email,
          password,
          confirmPassword,
        });

        // here we will hash our password

        await addUser.save();
        res.status(201).send("user created ");
        //   console.log(addUser);
      }
    } catch (err) {
      res.status(422);
    }
  }
};

                                                                       // get all user data


exports.getAllUser = async (req, res) => {
  const user = await userModel.find(req.query);
  res.status(201).json({
    success: true,
    user,
  });
};

// get single user data

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;

  const singleuser = await userModel.findById({ _id: id });

  res.status(201).json({
    success: true,
    singleuser,
  });
};

                                                               // user login api


exports.loginUser = async (req, res) => {
  let token;
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("Please fill all the fields");
  }

  const userLogin = await userModel.findOne({ email: email });

  if (userLogin) {
    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      res.send("Invalid  password");
    } else {
      // res.send("user successfully logged in");

      // token generation
      token = await userLogin.generateAuthToken();
      // console.log(token);

      //  cookie generate

      res.cookie("usercookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });
      const result = { userLogin, token };
      res.status(201).json({status:201,token});
    }
  } else {
    res.send("invalid email");
  }
};

                                                                    //update user

exports.updateUser = async (req, res) => {
  const id = req.params.id;
 
  const user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!user) {
    res.send("no user to update");
  }
  res.status(201).json({status:201,user});
  user.save();
};

                                                                       //delete user

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    res.send("no user to delete");
  }
  res.send(`user deleted successfully  ${user}`);
};


                                                                    //validating user

exports.validateUser = async(req,res)=>{

try {
   const validateUser = await userModel.findOne({_id:req.userId})  
   res.status(201).json({status:201,validateUser})
}  catch (error) {
  res.send("no token provided")
}
}


                                                                         //logout user

exports.logoutUser = async(req,res)=>{
  try {
    req.user.tokens  = req.user.tokens.filter((ctoken)=>{
      console.log(ctoken !== req.userToken); 
    });
  res.clearCookie('usercookie',{ path:"/"});
  res.user.save()
    res.status(201).json({status:201})
  } catch (error) {
    res.status(201).json({status:201,error})
  }
}



                                                                        //image upload


exports.uploadImage = async(req,res)=>{
  const id = req.params.id;

  const name = req.file.path;


  if(!name){
      res.status(401).json({status:401,message:"please select image"})
  }

  try { 
      
        
    const user = await userModel.findByIdAndUpdate(id, {userImage:name}, {
      new: true,
    });
    if (!user) {
      res.send("no user to update");
    }

      const finaldata = await user.save();

      res.status(201).json({status:201,finaldata});

  } catch (error) {
      res.status(401).json({status:401,error})
  }

  console.log(name);

}  
  
  
//   res.status(201).json({status:201,user});
//   user.save();
//   console.log(req.file);
// };

//    const uploadImg = {file:req.body.image}
  
//     if(!uploadImg){
//       res.status(401).json({status:401,message:"fill the field"})
//     }
    
//     try {

//       const {userImage} = req.file
//       const userData = await userModel.findByIdAndUpdate(id, userImage,{
//         new:true,
//       })
//       if (!userData) {
//             res.send("no user to update");
//           }

//       const saveData = await userData.save()

//       res.status(201).json({status:201,saveData})
//     } catch (error) {
//       res.status(401).json({status:401,error})
//     }

// }

