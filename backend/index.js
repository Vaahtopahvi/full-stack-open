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
app.post("/api/persons", (request, response, next) => {
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
  Person.find({})
    .then((persons) => {
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
      return person.save();
    })
    .then((savedPerson) => {
      if (savedPerson) {
        response.json(savedPerson);
      }
    })
    .catch((error) => next(error));

  // console.log(persons);
});

// yksittäisen henkilön tiedot id:n perusteella
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// yksittäisen henkilön poisto listalta id:n perusteella
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      // console.log("tässä näkyy result" + result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// numeron päivitys yhteystiedolle
app.put("/api/persons/:id", (request, response, next) => {
  const updatedPerson = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = updatedPerson.name;
      person.number = updatedPerson.number;

      return person.save().then((updatedPerson) => {
        console.log("Person updated:", updatedPerson);
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler);

// const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
