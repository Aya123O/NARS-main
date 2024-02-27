import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleFile } from "../../../common/uploadFile";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AddStudent = () => {
  const userState = useSelector((state) => state.user);
  const [departments, setDepartments] = useState([]);
  const [facultyArr, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [importData, setImportData] = useState([]);
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false);

  useEffect(() => {
    // Fetch faculties and setFaculty state
    const fetchFaculties = async () => {
      try {
        const response = await fetch("http://localhost:8083/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userState.token}`,
          },
        });
        const data = await response.json();
        if (data && data.data) {
          setFaculty(data.data.map((faculty) => ({ id: faculty._id, name: faculty.name })));
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, [userState.token]);

  const handleFacultyChange = async (e) => {
    const selectedFacultyId = e.target.value;
    setSelectedFaculty(selectedFacultyId);

    try {
      const response = await fetch(`http://localhost:8083/${selectedFacultyId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState.token}`,
        },
      });
      const data = await response.json();
      if (data && data.data && data.data.departments) {
        const tempDepartments = data.data.departments.map((department) => ({
          id: department._id,
          name: department.name,
        }));
        setDepartments(tempDepartments);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleImport = (e) => {
    handleFile(e, (data) => {
      setImportData(data);
      setExportModalIsOpen(true);
      document.body.classList.toggle("overflow-hidden");
    });
  };

  const downloadTemplateHandler = () => {
    const header = ["name", "code", "email", "faculty", "academicYear", "department"];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([header]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "studentsTemplate.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your submission logic here
  };

  return (
    <div className="ml-[20%] flex justify-center items-center h-screen w-75 " style={{ background: "linear-gradient(135deg, #023e8a, #8ecae6)" }}>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Department</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="name">Department Code</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          {/* <div>
            <label htmlFor="code">D Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field"
            />
          </div> */}
          <div>
            <label htmlFor="email">Head of department (Email)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
          <label htmlFor="desciption">Description</label>
          <textarea class="w-full input-form bg-white"
          id="desciption"
           rows="4" placeholder="Type here  about the faculty"></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <div>{msg}</div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={downloadTemplateHandler}
              className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Download Template
            </button>
            <input type="file" id="selectFile" className="hidden" onChange={handleImport} />
            <label
              htmlFor="selectFile"
              className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Import
            </label>
            <button
              type="submit"
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
