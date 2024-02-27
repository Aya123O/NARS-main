import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "@/components/store/userSlice";

const CreateSurvey = ({ cookies }) => {
  const userState = useSelector((s) => s.user);
  const router = useRouter();
  const [surveyData, setSurveyData] = useState([]);
  const [questionData, setQuestionData] = useState({
    number: "",
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch any necessary data or perform any setup here
  }, []);

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addQuestion = () => {
    const newQuestion = { ...questionData };
    setSurveyData((prevData) => [...prevData, newQuestion]);
    setQuestionData({
      number: "",
      title: "",
      description: "",
    });
  };

  const saveSurvey = async () => {
    try {
      // Code to save the survey
    } catch (error) {
      console.error("Error saving survey: ", error);
    }
  };

  const sendEmail = async () => {
    try {
      // Code to send email
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ background: "linear-gradient(135deg, #023e8a, #8ecae6)" }}>
      <div className=" ml-[20%] bg-blue-100 p-12 max-w-3xl w-full shadow-2xl rounded-3xl mt-10">
        <h2 className="font-bold text-blue-900 mb-6 text-3xl">Create a Survey</h2>
        <form>
          <div className="flex flex-col gap-4">
            <label htmlFor="number" className="text-blue-900 font-bold">
              Question Number:
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={questionData.number}
              onChange={handleQuestionChange}
              className="input-field"
              required
            />

            <label htmlFor="title" className="text-blue-900 font-bold">
              Question Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={questionData.title}
              onChange={handleQuestionChange}
              className="input-field"
              required
            />

            <label htmlFor="description" className="text-blue-900 font-bold">
              Question Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={questionData.description}
              onChange={handleQuestionChange}
              className="input-field"
              rows="4"
              required
            ></textarea>
             <div className="mt-4">
          <label htmlFor="surveyQuestions" className="text-blue-900 font-bold">
            Survey Questions:
          </label>
          <input
            type="text"
            id="surveyQuestions"
            value={surveyData.map((question) => question.title).join(", ")}
            readOnly
            className="input-field mt-2"
          />
        </div>

            <button
              type="button"
              className="px-6 mt-12 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              onClick={addQuestion}
            >
              Add Question
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 w-60"
              onClick={saveSurvey}
            >
              Save Survey
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 w-60"
              onClick={sendEmail}
            >
              Send Email
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default CreateSurvey;
