import Part from "./Part";

const Content = (props) => {
  return (
    <>
      {props.part.parts.map((course) => (
        <Part key={course.id} part={course} />
      ))}
    </>
  );
};

export default Content;
