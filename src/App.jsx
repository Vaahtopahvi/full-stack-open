const Header = () => {
  return <h1>Half Stack application development</h1>;
};

const Content = (part) => {
  console.log(part);
  return `Hello the part ${part.part} has ${part.exercise} exercises`;
};

const Total = () => {
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <p>Nombre of total exercises {exercises1 + exercises2 + exercises3}</p>
  );
};

const App = () => {
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  return (
    <div>
      <Header />
      <Content part={part1} exercise={exercises1} />
      <br />
      <Content part={part2} exercise={exercises2} />
      <br />
      <Content part={part3} exercise={exercises3} />
      <Total />
    </div>
  );
};

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

export default App;
