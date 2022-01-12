// Libraries
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
// Interfaces
import { IMimetypeMap } from "../../models/interfaces";

const MIME_MAP: IMimetypeMap = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (
    req: any,
    file: { mimetype: string | number },
    cb: (arg0: Error, arg1: string) => void
  ) => {
    // @ts-ignore
    const isValid = MIME_MAP[file.mimetype];
    let error: Error | null = new Error("invalid miometype");
    if (isValid) {
      error = null;
    }
    cb(error!, "images");
  },
  filename: (
    req: Request,
    file: { originalname: string; mimetype: string | number },
    cb: (arg0: null, arg1: string) => void
  ) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    // @ts-ignore
    const ext = MIME_MAP[file.mimetype];
    cb(null, name + "-" + uuidv4() + "." + ext);
  },
});

module.exports = multer({ storage }).single("picture");
