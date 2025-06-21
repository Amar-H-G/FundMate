require("colors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const routes = require("./routers/mainRoutes.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/", routes);

app.use(errorHandler);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`.yellow);
    });
  })
  .catch((err) => {
    console.error(`❌ Database connection failed: ${err.message}`.red);
    process.exit(1);
  });
