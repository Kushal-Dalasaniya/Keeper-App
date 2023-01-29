const {Notes}=require('../models/keeperModel');
const {User}=require('../models/userModel');

const getAllNotes = (req,res) => {
    User.findById(req.query.id,(err,user)=>{
        if(err) 
            res.status(400).json({isAuthenticated:true, message:err});
        else
            res.status(200).json({isAuthenticated:true,data:user.notes})
    })
    
}

const creatNote = (req,res) => {
    User.findById(req.query.id,(err,user)=>{

        if(err) 
            console.log(err);

        else if(user){
            const newNote=new Notes({
                title: req.body.title,
                content: req.body.content
            });
            newNote.save((err)=>{
                if(err){ 
                    console.log(err);
                    res.status(404).json(err);
                }
            });
            user.notes.push(newNote);
            user.save((err)=>{
                if(err)
                    res.status(404).json(err);
                else
                    res.status(201).json("Success")
            });
            res.status(201)
        }
    });
}

const deleteNote = (req,res) => {
    const userId=req.query.userid;
    const postId=req.query.postid;
    
    Notes.findByIdAndDelete(postId,(err)=>{
        if(err) 
            console.log(err);
        
        else{
            User.findById(userId,(err,user)=>{
                if(err)
                    console.log(err);
            
                else if(user){
                    user.notes = user.notes.filter(element => { return element._id != postId });
                    user.save();
                    res.status(200).json("Post success fully deleted");
                }
            })
        }
    })
}

const updateNote = (req,res) => {
    console.log(req.body);
    Notes.findByIdAndUpdate(req.query.id,req.body,(err)=>{
        if(err) console.log(err);
        else res.status(201).json(req.query.id);
    })
}

module.exports={getAllNotes,creatNote,deleteNote,updateNote}