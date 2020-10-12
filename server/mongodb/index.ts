import mongoose from 'mongoose';

export const db = async () => {
  try {
    const connect = await mongoose
    .connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log('DB connected')
 return connect
  } catch (error) {
    console.log(error)
  }

}