const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbadmin:123@cluster0-jftuw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const WebUserSchema = new Schema({
    email: String,
    detail: {
        name: String
    }
});

const AdminUserSchema = new Schema({
    email:String,
    password:String,
    city:String,
    isdelete:Boolean
});

const CategorySchema = new Schema({
    name:String,
    description:String,
    adddate:{type:Date,default:Date.now},
    updatedate:{type:Date,default:Date.now},
    isdelete:{type:Boolean,default:false}
})

const Webuser = mongoose.model('WebUserModel', WebUserSchema);
const AdminUser = mongoose.model('AdminUserModel', AdminUserSchema);
const Category =mongoose.model('CategoryModel',CategorySchema);

const adminusermanager = {
    Add : (req,res) =>{
        var entity = new AdminUser();
        entity.email = req.body.email;
        entity.password = req.body.password;
        entity.city = req.body.city;
        entity.isdelete = false;

        entity.save(function(){
            res.send("Başarılı!!")
        })
    },
    GetAll : (req,res) => {
        AdminUser.find({isdelete:false},(err,data) => {
            if(!err){
                res.json(data);
            }
        })
    }
}

const categorymanager = {
    Add: (req,res) => {
        var entity = new Category();
        entity.name = req.body.name;
        entity.description = req.body.description;

        entity.save(function(err){
            if(!err){
                res.send('Başarılı!');
            }
            else{
                console.log(err);
            }
        })
    },
    GetAll: (req,res) => {
        Category.find({isdelete:false},(err,data) => {
            res.json(data);
        })
    },
    GetByID:(req,res) => {
        var id = req.params.id;
        Category.findById(id,(err,data) => {
            if(!err){
                res.json(data);
            }
        })
    },
    Update:(req,res) => {
        var id = req.body.id;
        Category.findById(id,(err,data) => {
            if(!err){
                data.name = req.body.name;
                data.description = req.body.description;
                data.save();
                res.json(data);
            }
        })
    }
}

//şehri izmir olan adminlerin birincisi
// AdminUser.find({email:'barbaros@mail.com'},(err,data) => {
//     if(!err && data.length > 0){
       
//         data[0].email = "kadıkoy@mail.com";
//         data[0].save();
     
//     }
//     else{
//         console.log(err);
//     }
// })




module.exports = {
    adminusermanager,
    categorymanager
}
