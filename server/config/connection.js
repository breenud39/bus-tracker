mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/bus-tracker',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }
);