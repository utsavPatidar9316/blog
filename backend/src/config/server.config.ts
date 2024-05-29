import express from "express";
import cors, { CorsOptions } from "cors";
import { COMMON_ROUTE } from "../utils/route.enums";
import appRoute from "../route";

const app = express();

const corsOpts: CorsOptions = {
  origin: "*",
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(COMMON_ROUTE.api, appRoute);

export default app;
