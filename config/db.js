import mongoose from "mongoose"

//connection to database, which currectly leads to my own database for testing
const DB = async () =>{
try{
    await mongoose.connect("mongodb+srv://akshaynigam405_db_user:filOR5YCgAhMthZz@cluster0.llhntdb.mongodb.net/resume-builder?appName=Cluster0");
    console.log("DB connected succesfully");
    
}
    catch(err){
        console.error("DB connection failed",err.message);
        
        process.exit(1);

    }
}
export default DB;    
