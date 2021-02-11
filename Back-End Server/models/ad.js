import mongoose, { Schema } from 'mongoose';

// Define ad schema
var adSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  description: String,
  imageUrl: String,
});

// Export Mongoose model
export default mongoose.model('ad', adSchema);
