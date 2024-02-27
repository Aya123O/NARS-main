import { useEffect, useState } from "react";

const Creategrade = ({ cookies }) => {
  const [numCourses, setNumCourses] = useState(1);
  const [numQuizzes, setNumQuizzes] = useState(1);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);

  const handleNumCoursesChange = (e) => {
    setNumCourses(parseInt(e.target.value));
  };

  const handleNumQuizzesChange = (e) => {
    setNumQuizzes(parseInt(e.target.value));
  };

  const handleStudentChange = (e, index) => {
    const { value } = e.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], name: value };
    setStudents(updatedStudents);
  };

  const handleGradeChange = (e, studentIndex, gradeIndex) => {
    const { value } = e.target;
    const updatedGrades = [...grades];
    updatedGrades[studentIndex][gradeIndex] = value;
    setGrades(updatedGrades);
  };

  const renderCourseTable = () => {
    return (
      <table className="w-full border-collapse border border-blue-800">
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-blue-800 py-2">Student</th>
            <th className="border border-blue-800 py-2">Final Exam</th>
            <th className="border border-blue-800 py-2">Midterm Exam</th>
            <th className="border border-blue-800 py-2">Final Project</th>
            {[...Array(numQuizzes)].map((_, index) => (
              <th key={index} className="border border-blue-800 py-2">Quiz {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, studentIndex) => (
            <tr key={studentIndex} className={studentIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-50"}>
              <td className="border border-blue-800 px-4 py-2">
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => handleStudentChange(e, studentIndex)}
                  className="w-full outline-none"
                />
              </td>
              <td className="border border-blue-800 px-4 py-2">
                <input
                  type="text"
                  value={grades[studentIndex][0] || ""}
                  onChange={(e) => handleGradeChange(e, studentIndex, 0)}
                  className="w-full outline-none"
                />
              </td>
              <td className="border border-blue-800 px-4 py-2">
                <input
                  type="text"
                  value={grades[studentIndex][1] || ""}
                  onChange={(e) => handleGradeChange(e, studentIndex, 1)}
                  className="w-full outline-none"
                />
              </td>
              <td className="border border-blue-800 px-4 py-2">
                <input
                  type="text"
                  value={grades[studentIndex][2] || ""}
                  onChange={(e) => handleGradeChange(e, studentIndex, 2)}
                  className="w-full outline-none"
                />
              </td>
              {[...Array(numQuizzes)].map((_, quizIndex) => (
                <td key={quizIndex} className="border border-blue-800 px-4 py-2">
                  <input
                    type="text"
                    value={grades[studentIndex][quizIndex + 3] || ""}
                    onChange={(e) => handleGradeChange(e, studentIndex, quizIndex + 3)}
                    className="w-full outline-none mb-4"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const addStudent = () => {
    setStudents((prevStudents) => [...prevStudents, { name: "" }]);
    setGrades((prevGrades) => [...prevGrades, Array.from({ length: numCourses + numQuizzes + 3 }, () => "")]);
  };

  const submitGrades = () => {
    // Logic to submit grades to backend
  };

  return (
    <div className="flex justify-center min-h-screen"
    style={{ background: "linear-gradient(135deg, #023e8a, #8ecae6)" }}
>
      <div className="ml-[20%] bg-blue-100 p-12 max-w-3xl w-full shadow-2xl rounded-3xl mt-10">
        <h2 className="font-bold text-blue-900 mb-4 text-3xl">Enter Student Grades</h2>
        <div className="flex flex-col gap-4">
          
           

          <label htmlFor="numQuizzes" className="text-blue-700 font-bold mb-3">
            Number of Quizzes:
          </label>
          <select
            id="numQuizzes"
            value={numQuizzes}
            onChange={handleNumQuizzesChange}
            className="input-field mb-4"
            required
          >
            {[...Array(6)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        {renderCourseTable()}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={addStudent}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Student
          </button>
          <button
            type="button"
            onClick={submitGrades}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ml-4"
          >
            Submit Grades
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creategrade;
