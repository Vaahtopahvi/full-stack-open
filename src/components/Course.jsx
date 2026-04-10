import React from "react";

function Course({ kurssi }) {
  //   console.log(paska);

  //   const total = paska.parts.reduce((s, p) => {
  //     console.log("what is happening", s, p);
  //     return someMagicHere;
  //   });
  const result = kurssi.parts.map((part) => part.name);
  console.log(result);
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
      <h1>{kurssi.name}</h1>
      {kurssi.parts.map((part) => (
        <div key={part.id}>
          <p>
            {part.name} {part.exercises}
          </p>
        </div>
      ))}
      <h3>
        total of exercises:{" "}
        {kurssi.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </h3>
    </div>
  );
}

export default Course;
