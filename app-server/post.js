const postSchema = mongoose.Schema(
  {
    userID: String,
    content: String
  },
  {timestamps: true});
const Post = mongoose.model('Post', {
    userID: String,
    content: String,
    timestamp: {type: Date, default: Date.now}
  })