import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import http from "http";
import morgan from "morgan";
import mongoose from "mongoose";
import Person from "./models/person.js";

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  }),
);

const PORT = process.env.PORT;
const name = process.argv[2];
const number = process.argv[3];

// api/persons -päätepiste, joka palauttaa puhelinluettelon henkilöt JSON-muodossa, kutsumalla json metodia
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    console.log(result);
    response.json(result);
  });
  // mongoose.connection.close();
});

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
  {
    name: "ass",
    number: "555",
    id: "3tZ_1Lgp4Ko",
  },
];

// console.log("mikä on " + Person);

// juurihakemisto
app.get("/", (request, response) => {
  response.send("<h1>Hello</h1> <h2>world</h2> <li>exclamation mark!</li>");
  // console.log(request);
});

// info sivu
app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    const now = new Date();
    const length = result.length;

    response.send(`<p>Phonebook has info for ${length} people.</p>` + now);
  });
});

// // api/persons -päätepiste, joka palauttaa puhelinluettelon henkilöt JSON-muodossa, kutsumalla metodia
// app.get("/api/persons", (request, response) => {
//   response.json(persons);
// });

const generateId = () => {
  const randomId = Math.floor(Math.random() * 100000);
  return String(randomId);
};

// uuden henkilön lisäys
app.post("/api/persons", (request, response) => {
  const person = new Person(request.body);

  console.log("tallennetaan henkilö: " + person);
  // console.log(person.name);

  // uuden henkilön lisäyksen virhekäsittelyt. Jos ei ole jompaa kumpaa kenttää
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  // jos nimi on jo listalla
  Person.find({}).then((persons) => {
    // muuttuja vertailevalle nimi arvolle
    const nameExists = persons.some(
      (savedPerson) =>
        savedPerson.name.toLowerCase() === person.name.toLowerCase(),
    );
    // muuttuja vertailevalle numero arvolle
    const numberExists = persons.some(
      (savedPerson) => savedPerson.number === person.number,
    );

    // jos nimi löytyy jo listalta
    if (nameExists) {
      return response.status(400).json({ error: "name must be unique" });
    }

    // jos numero löytyy jo listalta
    if (numberExists) {
      return response.status(400).json({ error: "number must be unique" });
    }
    person.save().then((result) => {
      response.json(result);
      console.log("person saved!");
      console.log(result);
    });
  });

  console.log(persons);
});

// yksittäisen henkilön tiedot id:n perusteella
app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;

  Person.find({}).then((persons) => {
    // muuttuja vertailevalle id arvolle
    const person = persons.find((savedPerson) => savedPerson.id === personId);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

// yksittäisen henkilön poisto listalta id:n perusteella
app.delete("/api/persons/:id", (request, response) => {
  const personId = request.params.id;
  Person.find({}).then((persons) => {
    //muuttuja vertailevalle id arvolle
    const person = persons.find((savedPerson) => savedPerson.id === personId);

    if (!person) {
      return response.status(404).end();
    }
    person.deleteOne().then(() => {
      response.status(204).end();
    });
  });
});

// const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
