import express, { Express } from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import userRouter from "./routes/users";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors 설정
const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    const whiteList = ["http://localhost:3000", "http://localhost:3001"];
    if (origin && whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

//라우터 연결
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at <https://localhost>:${PORT}`);
});
