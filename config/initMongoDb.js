'use strict'
/**
*  Module dependencies
*/
const initMongoDb = (mongoose) =>{
    mongoose.connect(process.env.DATABASE_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err.message))
};

module.exports = initMongoDb; 