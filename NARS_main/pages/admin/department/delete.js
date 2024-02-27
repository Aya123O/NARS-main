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
    <div className="ml-[10%] flex justify-center items-center h-screen w-screen" style={{ background: "linear-gradient(135deg, #023e8a, #8ecae6)" }}>
      <form onSubmit={handleSubmit} 
      className="bg-gray-100 p-12  rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Delete department</h2>
        <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="faculty">faculty</label>
          <select
          id="faculty"
              className="input-field appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
              onChange={(e) => {
                // Handle selected option logic
              }}
            >
              <option value="" disabled selected>Select Faculty</option>
              <option value="Computer Engineering">Shoubra Faculty of Engineering</option>
          </select>
          </div>
          <div>
          <label htmlFor="department">department</label>
          <select
          id="department"
              className="input-field appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white focus:ring focus:ring-blue-200"
              onChange={(e) => {
                // Handle selected option logic
              }}
            >
              <option value="" disabled selected>Select Department</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
          </select>
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
        </div>
        <div className="flex justify-center mt-6">
          <div>{msg}</div>
          <div className="space-x-4">
            <button
              type="submit"
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
