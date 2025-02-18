import { config } from "dotenv";
import app from "./app";
import path from "path";

config({
  path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

