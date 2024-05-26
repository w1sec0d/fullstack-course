const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.exercises.map((exercise, index) => (
        <Part name={exercise.name} exercises={exercise.exercises} key={index} />
      ))}
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises[0]["exercises"] +
        props.exercises[1]["exercises"] +
        props.exercises[2]["exercises"]}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content exercises={[part1, part2, part3]} />
      <Total exercises={[part1, part2, part3]} />
    </div>
  );
};

export default App;
