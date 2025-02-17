import app from "./app";
import { connectDB } from "./lib/db";

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});

