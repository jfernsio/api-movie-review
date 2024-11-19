import mongoose,{Schema} from 'mongoose'


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {type:String, required : true, default : 'user'},
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movies' }]
});

const Users =  mongoose.model('Users', userSchema);
export default Users  