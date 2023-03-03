import { MONGODB_URI } from "./keys.js";

export default {
  mongodb: {
    url: MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 10000,
    },
  },
};
