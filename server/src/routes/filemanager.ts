import express from "express";
import dir from "./filemanager/dir";
import _mkdir from "./filemanager/mkdir";
import _rmdir from "./filemanager/rmdir";
import upload from "./filemanager/upload";
const filemanager = express.Router()

filemanager.use('/dir', dir)
filemanager.use('/mkdir', _mkdir)
filemanager.use('/rmdir', _rmdir)
filemanager.use('/upload', upload)

export {
  filemanager 
}
