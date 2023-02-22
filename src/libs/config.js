import * as dotenv from "dotenv";
dotenv.config();

const Config = {
  mongodb: {
    url: `mongodb+srv://${process.env.USER}:${process.env.PASS}@codercluster.exshfro.mongodb.net/ecommerce` || process.env.MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 10000,
    },
  },
};

export default Config;
