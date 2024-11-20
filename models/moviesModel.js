import mongoose,{Schema} from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    ratings: { type: Number, required: true, min: 1, max: 5 },
    desc: { type: String, required: true },
    genre: { type: Array },
    createdBy : {type:Schema.Types.ObjectId,ref:'Users'},
    likes : {type:Number,default:0},
  }, { timestamps: true })
  
  const Movies = mongoose.model('Movies', movieSchema)

export default Movies

