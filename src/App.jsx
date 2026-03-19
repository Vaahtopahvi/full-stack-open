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

import Button from "./components/Button";
import Display from "./components/Display";
import { useState } from "react";
const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };
  const setToZero = () => {
    console.log("Setting value to zero", counter);
    setCounter(0);
  };
  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={decreaseByOne} text="minus" />
      <Button onClick={setToZero} text="zero" />
    </div>
  );
};

export default App;
