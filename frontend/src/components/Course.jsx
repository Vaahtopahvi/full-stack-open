import React from "react";

function Course({ kurssi }) {
  // console.log("ensin", kurssi);

  //   const total = kurssi.parts.reduce((s, p) => {
  //     console.log("what is happening", s, p);
  //     return someMagicHere;
  //   });
  // const result = kurssi.parts.map((part) => part.name);
  // console.log(result);
  console.log(kurssi[0].name);
  return (
    <div>
      {/* <h1>{kurssi.name}</h1>
      <p>
        {kurssi.parts[0].name} {kurssi.parts[0].exercises}
      </p>
      <p>
        {kurssi.parts[1].name} {kurssi.parts[1].exercises}
      </p>
      <p>
        {kurssi.parts[2].name} {kurssi.parts[2].exercises}
      </p>
      <h3>
        total of exercises:{" "}
        {kurssi.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </h3> */}
      {/* <h1>{kurssi.name}</h1> */}
      {kurssi.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <h3>
            total of exercises:{" "}
            {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
          </h3>
        </div>
      ))}
      {/* <h3>
        total of exercises:{" "}
        {kurssi.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </h3> */}
    </div>
  );
}

export default Course;

// const courseVar = {
// name: "Half Stack application development",
// id: 1,
// parts: [
// {
// name: "Fundamentals of React",
// exercises: 10,
// id: 1,
// },
// {
// name: "Using props to pass data",
// exercises: 7,
// id: 2,
// },
// {
// name: "State of a component",
// exercises: 14,
// id: 3,
// },
// {
// name: "ReduX",
// exercises: 11,
// id: 4,
// },
// ],
// };
