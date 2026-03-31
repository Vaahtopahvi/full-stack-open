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

import Button from "./components/Button";
import { useState } from "react";
import Statistics from "./components/Statistics";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState([]);
  const total = good + neutral + bad;
  const sum = average.reduce((a, b) => a + b, 0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAverage(average.concat(+1));
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAverage(average.concat(0));
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAverage(average.concat(-1));
  };

  // console.log(sum);
  // console.log(average);
  // console.log("good:", good, "total:", total);
  console.log(good);

  //concat ja join todennäköisesti

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>statistics</h2>

      {/* good, neutral, bad, all, average, good% */}
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <Statistics text={"good "} amount={good} />
          <Statistics text={"neutral "} amount={neutral} />
          <Statistics text={"bad "} amount={bad} />
          <Statistics text={"total "} amount={total} />
          <Statistics avg={"average "} sum={sum} total={total} />
          <Statistics good={"good% "} amount={good} total={total} />
        </div>
      )}
    </div>
  );
};

export default App;
