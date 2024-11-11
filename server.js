const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const loanRoutes = require("./routes/loanRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const cardRoutes = require("./routes/cardRoutes");
const authorizationRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const errorHandler = require("./middlewares/errorHandler");
const sequelize = require("./config/db");
const User = require("./models/User"); // Import User model
const Account = require("./models/Account");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authorizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/credit", cardRoutes);
app.use("/api/accounts", accountRoutes);
app.use(errorHandler);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database tables created or already exist.");
  } catch (error) {
    console.error("Error creating database tables:", error);
  }
};

syncDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
