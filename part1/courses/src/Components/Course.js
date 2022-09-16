import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content part={course} />
          <Footer part={course} />
        </div>
      ))}
    </div>
  );
};

export default Course;
