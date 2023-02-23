require("dotenv").config();

const express = require("express");
const userRoute = require("./routes/users");
const quizRoute = require("./routes/quiz");
const questionRoute = require("./routes/questions");
const answerRoute = require("./routes/answers");
const quizTakenRoute = require("./routes/quiz_taken");

const app = express();
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/quizTaken", quizTakenRoute);
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);
app.use("/api/quiz", quizRoute);

app.listen(process.env.PORT, () => {
    console.log("server is up");
});
