const mongoose = require('mongoose')

const connectToDB = async () =>{
    try {
        const connectionString = await mongoose.connect('mongodb+srv://admin:ABC123@cluster0.xkvhepr.mongodb.net/paytm');
        console.log("DB connected sucessfully: and DB host: ", connectionString.connection.host);
    } catch (error) {
        console.error("DB Connection Failed !!!", error);
        process.exit(1);
    }
}

module.exports = { connectToDB }