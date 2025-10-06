const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`VISE API corriendo en http://localhost:${PORT}`);
});
