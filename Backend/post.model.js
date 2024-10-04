import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    myFile: String
});

export default mongoose.model.post || mongoose.model('post', postSchema);