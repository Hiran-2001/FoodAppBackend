const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        const filename =   `image-${Date.now()}.${file.originalname}`;
        callback(null,filename)
    }
});


const filteredFile = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype==="image/png" || file.mimetype=== "image/jpeg"){
        cb(null, true)
    }else{
        cb(null,false)
        return cb(new Error("Only .jpg, .jpeg and .png are allowed"))
    }
}


const upload = multer({
    storage :storage,
    fileFilter : filteredFile
})

module.exports = upload;