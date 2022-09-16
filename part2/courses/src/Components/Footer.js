const Footer = (props) => {
  return (
    <p>
      Number of exercises:{" "}
      {props.part.parts.reduce((a, course) => a + course.exercises, 0)}
    </p>
  );
};

export default Footer;
