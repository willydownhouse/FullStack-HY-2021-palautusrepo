import React from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase, CourseWithDescriptionField {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart
  extends CoursePartBase,
    CourseWithDescriptionField {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseWithDescriptionField extends CoursePartBase {
  description: string;
}

interface CourseSpecialPart extends CoursePartBase, CourseWithDescriptionField {
  type: "special";
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

const Header = ({ title }: { title: string }) => {
  return <h1>{title}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const renderCourses = () => {
    return courseParts.map((course, i) => {
      return <Part key={i} course={course} />;
    });
  };

  return <div>{renderCourses()}</div>;
};

const Part = ({ course }: { course: CoursePart }) => {
  const renderNameAndExerciseCount = () => {
    return (
      <p>
        <strong>
          {course.name} {course.exerciseCount}
        </strong>
      </p>
    );
  };

  const displayRequirements = (requirements: string[]) => {
    return requirements.map((el) => {
      return <p key={el}>{el}</p>;
    });
  };

  console.log(course);

  switch (course.type) {
    case "normal":
      return (
        <div>
          {renderNameAndExerciseCount()}
          <p>{course.description}</p>
        </div>
      );

    case "groupProject":
      return (
        <div>
          {renderNameAndExerciseCount()}
          <p>{course.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          {}
          {renderNameAndExerciseCount()}
          <p>{course.description}</p>
          <p>{course.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          {renderNameAndExerciseCount()}
          <p>{course.description}</p>
          <h4>Requirements</h4>
          {displayRequirements(course.requirements)}
        </div>
      );
    default:
      return null;
  }
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default App;
