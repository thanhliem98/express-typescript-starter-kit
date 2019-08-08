import mongoose from "mongoose";
import { Slug } from '@app/util';

export interface PostDocument extends mongoose.Document {
    title: string
    slug: string
    content: string
    thumb: string
    createdAt: string
    updatedAt: string
}

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    thumb: String,
    slug: {type: String, unique: true},
}, { timestamps: { createdAt: true, updatedAt: true } });

postSchema.pre("save", function (next) {
    let seft: any = this;
    seft.slug = Slug(seft.title) + '-' + new Date().getTime() ;
    next();
}) 

export const Post = mongoose.model<PostDocument>("Post", postSchema);