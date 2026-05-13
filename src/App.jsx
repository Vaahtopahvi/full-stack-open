// const App = () => {
//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>{course.name}</h1>
//       <p>{course.parts[0].name}</p>
//       <p>{course.parts[0].exercises}</p>
//       <p>{course.parts[1].name}</p>
//       <p>{course.parts[1].exercises}</p>
//       <p>{course.parts[2].name}</p>
//       <p>{course.parts[2].exercises}</p>
//     </div>
//   );
// };

// const arto = {
//   name: 'Arto Hellas',
//   age: 35,
//   education: 'PhD',
//   greet: function() {
//     console.log('hello, my name is ' + this.name)
//   },
//   doAddition: function(a, b) {
//     console.log(a + b)
//   },
// }

// arto.doAddition(1, 4)        // 5 is printed

// const referenceToAddition = arto.doAddition
// referenceToAddition(10, 15)   // 25 is printed

//--------------------------------------------------------------vaihtoehtonen ratkasu
// const course = "Half Stack application development";
// const part1 = "Fundamentals of React";
// const exercises1 = 10;
// const part2 = "Using props to pass data";
// const exercises2 = 7;
// const part3 = "State of a component";
// const exercises3 = 14;

// const array = {
//   id: 1,
//   name: "Half Stack application development",
//   parts: [
//     { id: 1, name: "Fundamentals of React", exercises: 10 },
//     { id: 2, name: "Using props to pass data", exercises: 7 },
//     { id: 3, name: "State of a component", exercises: 14}
//   ],
// };

// const Content = ({ course }) => {
//   return course.map((course) => {
//     return (
//       <div>
//         <Header course={course.name} key={course.id} />
//         {course.parts.map((part) => (
//           <li key={part.id}>
//             {part.name} {part.exercises}
//           </li>
//         ))}
//       </div>
//     );
//   });
// };

//----------------- DESTRUKTUROINTI & USE STATE ------------------------------

// const Hello = ({ mini, age }) => {
//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {mini}, you are {age} years old
//       </p>
//       <p>So you were probably born {bornYear()}</p>
//     </div>
//   );
// };

// const App = () => {
//   const nimi = "Pekka";
//   const ika = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello mini="Maya" age={26 + 10} />
//       <Hello mini={nimi} age={ika} />
//     </div>
//   );
// };

// export default App;

// ------------------ DESTRUKTUROINTI & USE STATE ------------------------------

// import Button from "./components/Button";
// import Display from "./components/Display";
// import { useState } from "react";
// const App = () => {
//   const [counter, setCounter] = useState(0);
//   console.log("rendering with counter value", counter);

//   const increaseByOne = () => {
//     console.log("increasing, value before", counter);
//     setCounter(counter + 1);
//   };
//   const setToZero = () => {
//     console.log("Setting value to zero", counter);
//     setCounter(0);
//   };
//   const decreaseByOne = () => {
//     console.log("decreasing, value before", counter);
//     setCounter(counter - 1);
//   };

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="plus" />
//       <Button onClick={decreaseByOne} text="minus" />
//       <Button onClick={setToZero} text="zero" />
//     </div>
//   );
// };

// export default App;

// -------------- MONIMUTKAISEMPI TILA, REACTING DEBUGGAUS -------------------

// import Button from "./components/Button";
// import History from "./components/History";
// import { useState } from "react";
// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   // const [total, setTotal] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     const updatedLeft = left + 1;
//     setLeft(updatedLeft);
//     // setTotal(updatedLeft + right);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat("R"));
//     const updatedRight = right + 1;
//     setRight(updatedRight);
//     // setTotal(left + updatedRight);
//   };

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   );
// };

// tämä on oikea paikka määritellä komponentti!
// import { useState } from "react";

// const Display = (props) => <div>{props.value}</div>;

// const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

// const App = (props) => {
//   const [value, setValue] = useState(10);

//   const setToValue = (newValue) => {
//     console.log("value now", newValue);
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <Display value={value} />
//       <Button onClick={() => setToValue(1000)} text="thousand" />
//       <Button onClick={() => setToValue(0)} text="reset" />
//       <Button onClick={() => setToValue(value + 1)} text="increment" />
//     </div>
//   );
// };

// export default App;

// -------------- Tehtävä 1.6 -------------------

// tehtävät 1.6 - 1.10 sekamelska.
/* <button
        onClick={() => {
          setGood(good + 1);
          setAverage(average.concat(+1));
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
          setAverage(average.concat(0));
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          setBad(bad + 1);
          setAverage(average.concat(-1));
        }}
      >
        bad
      </button> */

/* <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {sum / total}</p>
      <p>good% {((good / total) * 100).toFixed(2)}</p>
      <hr /> */

/* <hr></hr>
      <Statistics text={"good "} amount={good} />
      <Statistics text={"neutral "} amount={neutral} />
      <Statistics text={"bad "} amount={bad} />
      <Statistics text={"total "} amount={total} />
      <Statistics avg={"average "} sum={sum} total={total} />
      <Statistics good={"good% "} amount={good} total={total} /> */

// import Button from "./components/Button";
// import { useState } from "react";
// import Statistics from "./components/Statistics";

// const App = () => {
//   // tallenna napit omaan tilaansa
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [average, setAverage] = useState([]);
//   const total = good + neutral + bad;
//   const sum = average.reduce((a, b) => a + b, 0);

//   const handleGoodClick = () => {
//     setGood(good + 1);
//     setAverage(average.concat(+1));
//   };

//   const handleNeutralClick = () => {
//     setNeutral(neutral + 1);
//     setAverage(average.concat(0));
//   };

//   const handleBadClick = () => {
//     setBad(bad + 1);
//     setAverage(average.concat(-1));
//   };

//   // console.log(sum);
//   // console.log(average);
//   // console.log("good:", good, "total:", total);
//   console.log(good);

//   //concat ja join todennäköisesti

//   return (
//     <div>
//       <h1>give feedback</h1>

//       <Button onClick={handleGoodClick} text="good" />
//       <Button onClick={handleNeutralClick} text="neutral" />
//       <Button onClick={handleBadClick} text="bad" />
//       <h2>statistics</h2>

//       {/* good, neutral, bad, all, average, good% */}
//       {total === 0 ? (
//         <p>No feedback given</p>
//       ) : (
//         <div>
//           <Statistics text={"good "} amount={good} />
//           <Statistics text={"neutral "} amount={neutral} />
//           <Statistics text={"bad "} amount={bad} />
//           <Statistics text={"total "} amount={total} />
//           <Statistics avg={"average "} sum={sum} total={total} />
//           <Statistics good={"good% "} amount={good} total={total} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// ----------------------------- Tehtävä 2 ---------------------------

// import Note from "./components/Note";
// import Course from "./components/Course";

// const App = () => {
//   const courses = [
//     {
//       name: "Half Stack application development",
//       id: 1,
//       parts: [
//         {
//           name: "Fundamentals of React",
//           exercises: 10,
//           id: 1,
//         },
//         {
//           name: "Using props to pass data",
//           exercises: 7,
//           id: 2,
//         },
//         {
//           name: "State of a component",
//           exercises: 14,
//           id: 3,
//         },
//         {
//           name: "Redux",
//           exercises: 11,
//           id: 4,
//         },
//       ],
//     },
//     {
//       name: "Node.js",
//       id: 2,
//       parts: [
//         {
//           name: "Routing",
//           exercises: 3,
//           id: 1,
//         },
//         {
//           name: "Middlewares",
//           exercises: 7,
//           id: 2,
//         },
//       ],
//     },
//   ];

//   return (
//     <div>
//       <Course kurssi={courses} />
//     </div>
//   );
// };

// const showAll = () => {
//   return result.map((person) => (
//     <p key={person.name}>
//       {person.name} {person.number}
//     </p>
//   ));
// };

// const addPerson = (event) => {
//   event.preventDefault();
//   if (persons.some((person) => person.name === newName)) {
//     alert(`${newName} is already added to phonebook`);
//   } else {
//     const personObject = { name: newName, number: newNumber };
//     // console.log("button clicked");
//     // console.log(personObject);

//     setPersons(persons.concat(personObject));
//     setNewName("");
//     setNewNumber("");
//   }
// };

// const handleNameChange = (event) => {
//   // console.log(event.target.value);
//   setNewName(event.target.value);
// };

// const handleNumberChange = (event) => {
//   // console.log(event.target.value);
//   setNewNumber(event.target.value);
// };

// const handleFilter = (event) => {
//   // console.log(event.target.value);
//   setShowFiltered(event.target.value);
// };

// console.log(result);
// console.log(showAll());

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Note from "./components/Note";

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("");
//   const [showAll, setShowAll] = useState(true);

//   const Note = ({ note, toggleImportance }) => {
//     const label = note.important ? "make not important" : "make important";

// jokaisen noten vieree button mikä tekee siitä joko tärkeän tai ei tärkeän <--------------------

//     return (
//       <li>
//         {note.content}
//         <button onClick={toggleImportance}>{label}</button>
//       </li>
//     );
//   };

//   useEffect(() => {
//     axios.get("http://localhost:3001/notes").then((response) => {
//       setNotes(response.data);
//     });
//   }, []);

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: Math.random() > 0.5,
//     };

//     axios.post("http://localhost:3001/notes", noteObject).then((response) => {
//       setNotes(notes.concat(response.data));
//       setNewNote("");
//     });
//   };

//   const handleNoteChange = (event) => {
//     setNewNote(event.target.value);
//   };

//   const notesToShow = showAll ? notes : notes.filter((note) => note.important);

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? "important" : "all"}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map((note) => (
//           <Note key={note.id} note={note} />
//         ))}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange} />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default App;

import personService from "./services/persons";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Phonebook from "./components/Phonebook";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showFiltered, setShowFiltered] = useState("");
  const [toast, setToast] = useState(null);

  // tämä on OK jättää. jos on vain kymmeniä tai satoja nimiä, suodatus on salamannopeaa tehdä suoraan tässä
  const result = persons.filter((person) =>
    person.name.toLowerCase().includes(showFiltered.toLowerCase()),
  );

  // tän vois siirtää omaan komponenttiin
  const deletePerson = (id, name) => {
    console.log("nyt aktivoitiin deletePerson");
    console.log(
      "the person whose id is " +
        id +
        " and name is " +
        name +
        " is about to get removed",
    );
    //kysytään käyttäjältä haluuko se poistaa nimen listalta
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      //jos joo, niin lähetä kutsu personServiceen ja kutsu deletePersonia, välitä ID.
      personService.deletePerson(id).then(() => {
        //sitku tulee vastaus (then) niin filteröi ihminen pois listasta sillä id:llä
        setPersons(persons.filter((person) => person.id !== id));
      });
      // onnistumisviesti ja ajastin setToastille
      setToast(`Deleted ${name}`);

      setTimeout(() => {
        setToast(null);
      }, 5000);
      console.log("Removed...");
    } else {
      console.log("nice");
    }
    // const remove = persons.find((n) => n.id === id);
    // console.log(remove);
  };

  // haetaan ihmiset
  useEffect(() => {
    // console.log(personService.getAll());
    personService.getAll().then((response) => {
      setPersons(response.data);
      // console.log(persons);
      // console.log("moi");
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      {/* toastin paikka */}
      <Notification message={toast} />
      <h2>Add new person</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        // täytyy antaa person formin määritellä setToastin tila
        setToast={setToast}
      />
      <h2>Search</h2>
      <Filter showFiltered={showFiltered} setShowFiltered={setShowFiltered} />
      <h2>Numbers</h2>
      <Phonebook
        luettelo={result}
        deletePerson={(id, name) => deletePerson(id, name)}
        //näemmä toimisi ihan vaan deleteperson={deletePerson} myös
      />
    </div>
  );
};

export default App;
