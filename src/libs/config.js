import * as dotenv from "dotenv";
dotenv.config();

const Config = {
  mongodb: {
    url: process.env.MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 10000,
    },
  },
};

export default Config;
