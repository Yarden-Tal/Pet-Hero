"use strict";
exports.__esModule = true;
// Libraries
var multer = require("multer");
var uuidv4 = require("uuid").v4;
var MIME_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // @ts-ignore
        var isValid = MIME_MAP[file.mimetype];
        var error = new Error("invalid miometype");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: function (req, file, cb) {
        var name = file.originalname.toLowerCase().split(" ").join("-");
        // @ts-ignore
        var ext = MIME_MAP[file.mimetype];
        cb(null, name + "-" + uuidv4() + "." + ext);
    }
});
module.exports = multer({ storage: storage }).single("picture");
