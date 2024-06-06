const Header = ({ children }) => <h1>{children}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part part={part} key={part.id} />);

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header>{name}</Header>
      <Content parts={parts} />
    </>
  );
};

export default Course;
