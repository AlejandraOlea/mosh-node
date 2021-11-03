const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "cours3" },
  { id: 4, name: "course4" },
];

app.get("/", (req, res) => {
  res.send("hello friend");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  const result = validateCourse(req.body);
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
  }
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening for requests on port ${port}`);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(course);
};
