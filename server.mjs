import express from "express";
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let messages = [];

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SETTING VIEW and VIEW Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.post("/new", (req, res) => {
  const { text, user } = req.body;
  if (text && user) {
    const newMessage = {
      text,
      user,
      added: new Date(),
    };
    messages.push(newMessage);
    return res.redirect("/");
  }
  res.status(404).json({ msg: "Please enter valid inputs" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
