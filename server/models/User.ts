import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', UserSchema);
