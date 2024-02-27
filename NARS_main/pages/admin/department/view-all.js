import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import UserCard from "@/components/user/UserCard";
import UserList from "@/components/user/UserListStudent";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

const Students = ({ cookies }) => {
  const userState = useSelector((s) => s.user);
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
    submitHandler();
  }, []);

  const submitHandler = async () => {
    try {
      const resp = await fetch('http://localhost:8081/students', {
        headers: {
          Authorization: "Bearer " + userState.token,
        },
      });
      const data = await resp.json();
      setStudents(data.data);
      setFilteredStudents(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    const header = [
      "name",
      "code",
      "Head of department",
    ];

    const rows = students.map((item) => [
      item.name,
      item.code,
      item.email,
      item.faculty,
      item.academicYear.join(","),
      item.department,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([fileBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "students.xlsx");
  };

  const filterStudents = (event) => {
    const filtered = students.filter((e) => e.code.startsWith(event.target.value));
    setFilteredStudents(filtered);
  };

  return (
    <>
      <div className=" min-h-screen flex  justify-center p-5 ml-[20%]" style={{ background: "linear-gradient(135deg, #023e8a, #8ecae6)" }}>
        <div className="w-full max-w-4xl p-8 rounded-lg" >
          <h1 className="text-3xl font-bold text-center text-white mb-6 mt-4">List of all Students</h1>
          <form onSubmit={submitHandler} className="mb-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                placeholder="Search by department Code"
                onChange={filterStudents}
              />
              <button
                type="button"
                onClick={handleClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-200 text-lg float-right"
              >
                Download Excel
              </button>
            </div>
          </form>
          {filteredStudents.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">department List</h2>
              <UserList users={filteredStudents} />
            </>
          ) : (
            <div className="text-center text-lg">No departments found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Students;
