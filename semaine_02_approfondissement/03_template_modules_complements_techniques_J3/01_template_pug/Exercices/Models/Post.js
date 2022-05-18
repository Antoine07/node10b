import mongoose from "mongoose";

const {Schema, model } = mongoose;

export const PostSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    date : {
        type : Date
    },
    priority : {
        type : String,
        enum : ['important', 'normal'],
        default : 'normal'
    }
});

const PostModel = model('posts', PostSchema);

export default PostModel;