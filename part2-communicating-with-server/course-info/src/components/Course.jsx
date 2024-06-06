// This is a separate course component

const Header = ({ children }) => <h1>{children}</h1>;

const Total = ({ totalExercises }) => (
  <p style={{ fontWeight: "bold" }}>Total of {totalExercises} exercises</p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part part={part} key={part.id} />);

const Course = ({ course }) => {
  const { name, parts } = course;
  const totalExercises = parts.reduce((accumulator, currentValue) => {
    console.log({ accumulator }, { currentValue });
    return accumulator + currentValue.exercises;
  }, 0);

  return (
    <>
      <Header>{name}</Header>
      <Content parts={parts} />
      <Total totalExercises={totalExercises} />
    </>
  );
};

export default Course;
