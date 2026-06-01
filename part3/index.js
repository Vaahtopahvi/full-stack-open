import express from "express";
// import http from "http";
// import { createLogger } from "vite";

const app = express();

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

// console.log(appi);

// juurihakemisto
app.get("/", (request, response) => {
  response.send("<h1>Hello</h1> <h2>world</h2> <li>exclamation mark!</li>");
  // console.log(request);
});

// api/persons -päätepiste, joka palauttaa puhelinluettelon henkilöt JSON-muodossa
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// yksittäisen henkilön tiedot id:n perusteella
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// yksittäisen henkilön poisto

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(persons));
// });

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
