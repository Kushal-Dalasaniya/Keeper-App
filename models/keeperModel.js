const mongoose=require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Empty title is not valid"]
    }, 
    content:String,
});
const Notes=mongoose.model('notes',notesSchema);

module.exports={connectDB , Notes ,notesSchema};

