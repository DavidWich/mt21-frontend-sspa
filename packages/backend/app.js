import accounts from "./test-data/accounts.js";
import books from "./test-data/books.js";
import courses from "./test-data/courses.js";
import emails from "./test-data/emails.js";
import news from "./test-data/news.js";

import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoUrl = "mongodb://localhost:27017";
const authSerice = "http://localhost:2999";

async function verifyToken(token) {
  return await fetch(`${authSerice}/isAuth`, {
    method: "POST",
    body: JSON.stringify({ token: token }),
    headers: { "CONTENT-TYPE": "application/json" },
  })
    .then((res) => {
      return res.status;
    })
    .catch(() => {
      return 404;
    });
}

app.post("/books", async (req, res) => {
  const { items, token } = req.body;

  const code = await verifyToken(token);

  if (code !== 200) {
    return res.status(code).end();
  }

  const bookIds = items?.map((id) => ObjectId(id));
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("books");
  const books =
    typeof bookIds === "undefined"
      ? await coll.find().toArray()
      : await coll.find({ _id: { $in: bookIds } }).toArray();

  client.close();

  return res.status(200).json({ books });
});

app.post("/course/:abbreviation", async (req, res) => {
  const abbreviation = req.params["abbreviation"];
  const { token } = req.body;

  const code = await verifyToken(token);

  if (code !== 200) {
    return res.status(code).end();
  }

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = client.db().collection("courses");
  const course = await collection.findOne({
    abbreviation: abbreviation,
  });

  client.close();

  if (course) {
    res.status(200).json({
      courseData: {
        id: course._id.toString(),
        course: course.course,
        abbreviation: course.abbreviation,
        professor: course.professor,
        currentPeople: course.currentPeople,
        maxPeople: course.maxPeople,
      },
    });
  } else {
    res.status(200).json({
      message: "Course not found",
      abbreviation: abbreviation,
    });
  }
});

app.post("/courses", async (req, res) => {
  const { email, token } = req.body;

  const code = await verifyToken(token);

  if (code !== 200) {
    return res.status(code).end();
  }

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("accounts");
  const courses = await coll.findOne({ id: email }, { courses: 1 });
  client.close();

  res.status(201).json({ courses: courses.courses });
});

app.post("/coursesByMail", async (req, res) => {
  const { email, token } = req.body;

  const code = await verifyToken(token);

  if (code !== 200) {
    return res.status(code).end();
  }

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  const accountsColl = db.collection("accounts");
  const { courses } = await accountsColl.findOne({ id: email }, { courses: 1 });

  const courseColl = db.collection("courses");
  const courseContents = await courseColl
    .find({ abbreviation: { $in: courses } })
    .toArray();

  client.close();

  res.status(201).json({ courses: courseContents });
});

app.post("/emails", async (req, res) => {
  const { email, token } = req.body;

  const code = await verifyToken(token);

  if (code !== 200) {
    return res.status(code).end();
  }

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("mails");
  const emails = await coll.find({ recipient: email }).toArray();

  client.close();

  res.status(201).json({ emails: emails });
});

app.get("/initialize", async (req, res) => {
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  db.dropDatabase();

  await db.collection("accounts").insertMany(accounts);
  await db.collection("books").insertMany(books);
  await db.collection("courses").insertMany(courses);
  await db.collection("mails").insertMany(emails);
  await db.collection("news").insertMany(news);

  client.close();

  res.status(201).json({ message: "Inserted" });
});

app.post("/news", async (req, res) => {
  const { email, token } = req.body;

  const courseQuery = ["", "ALL"];
  const code = await verifyToken(token);

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const courseColl = db.collection("accounts");
  const courses = await courseColl.findOne({ id: email }, { courses: 1 });
  if (courses && code === 200) {
    courseQuery.push(...courses.courses);
  }

  const newsColl = db.collection("news");
  const news = await newsColl.find({ course: { $in: courseQuery } }).toArray();

  client.close();

  return res.status(200).json({ news });
});

app.post("/new-book", async (req, res) => {
  const { title, author, year, isbn } = req.body;

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("books");

  await coll.insertOne({
    title,
    author,
    year,
    isbn,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
});

app.post("/new-course", async (req, res) => {
  const { course, abbreviation, professor, currentPeople, maxPeople } =
    req.body;

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("courses");

  await coll.insertOne({
    course,
    abbreviation,
    professor,
    currentPeople,
    maxPeople,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
});

app.post("/new-email", async (req, res) => {
  const { sender, recipient, subject, content } = req.body;

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("mails");

  await coll.insertOne({
    sender,
    recipient,
    subject,
    content,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
});

app.post("/new-news", async (req, res) => {
  const { title, description, author, course, content } = req.body;

  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const coll = db.collection("news");

  await coll.insertOne({
    title,
    description,
    author,
    date,
    course: course ? course : "ALL",
    content,
  });

  client.close();

  res.status(201).json({ message: "Inserted" });
});

export default app;
