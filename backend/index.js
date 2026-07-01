import express from "express";
// import http from "http";
import morgan from "morgan";

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

// juurihakemisto
app.get("/", (request, response) => {
  response.send("<h1>Hello</h1> <h2>world</h2> <li>exclamation mark!</li>");
  // console.log(request);
});

// info sivu
app.get("/info", (request, response) => {
  const now = new Date();
  const length = persons.length;
  // console.log(length);

  response.send(`<p>Phonebook has info for ${length} people.</p>` + now);
});

// api/persons -päätepiste, joka palauttaa puhelinluettelon henkilöt JSON-muodossa
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * 100000);
  return String(randomId);
};

// console.log(generateId());
console.log(persons);
// const existingPerson = persons.some((p) => p.name === "arto hellas");
// console.log(existingPerson);
// // console.log(persons);
// // let result = persons.map((per) => per.name.toLowerCase());
// // console.log(result);
// // console.log("arto hellas" === result[0]);
// console.log(existingPerson);

// uuden henkilön lisäys
app.post("/api/persons", (request, response) => {
  const person = request.body;
  console.log(person);
  // console.log(person.name);

  // uuden henkilön lisäyksen virhekäsittelyt. Jos ei ole jompaa kumpaa kenttää
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
    // jos nimi on jo listalla
  } else if (
    persons.some((p) => p.name.toLowerCase() === person.name.toLowerCase())
  ) {
    return response.status(400).json({
      error: "name must be unique",
    }); //jos puhelinnumero on jo listalla
  } else if (persons.some((n) => n.number === person.number)) {
    return response.status(400).json({
      error: "number must be unique",
    });
  }

  // lisää lopulta uusi henkilö listaan
  const addNewPerson = {
    name: person.name,
    number: person.number,
    id: generateId(),
  };

  persons = persons.concat(addNewPerson);

  response.json(person);
  // console.log(person);
  console.log(persons);
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

// yksittäisen henkilön poisto listalta id:n perusteella
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(persons));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
