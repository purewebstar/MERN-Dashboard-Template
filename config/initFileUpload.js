'use strict'
/**
 *  Module dependencies
 */
const multer = require('multer');

// photo upload path
const profile_path = './public/images/profile';

// configure storage
const storage = multer.diskStorage({
  destination: function (req, file, done){
      done(null, profile_path)
  },
  filename: function (req, file, done){
      done(null, Date.now() + '--' + file.originalname)
  }
})

// storage = photoStorage
const photoUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.size <(5*1024*1024)) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
})

module.exports = {
  photoUpload,
}
