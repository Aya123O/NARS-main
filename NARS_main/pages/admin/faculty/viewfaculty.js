import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import FacultyList from "@/components/user/FacultyList";
import { useSelector } from "react-redux";

const viewfaculty = ({ cookies }) => {
  const userState = useSelector((s) => s.user);
  if (userState.role != "system admin" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  console.log(cookies.token);
  const router = useRouter();
  const [faculty, setFaculty] = useState([]);
  useEffect(() => {
    submitHandler();
  }, []);
  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resp = await fetch(`http://localhost:8083/`, {
        headers: {
          Authorization: "Bearer " + userState.token,
        },
      });
      const data = await resp.json();
      console.log(data.data);
      let arr = data.data;

      arr = arr.map((e) => {
        return {
          name: e.name,
          id: e._id,
          academicYears: e.academicYears,
          dean: e.dean,
          about: e.about,
          competences: e.competences,
        };
      });
      setFaculty(arr);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <form
        style={{ background: "linear-gradient(135deg, #023e8a, #8ecae6)" }}
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 overflow-auto flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <p className="font-normal">Faculty {">"} View Faculties</p>
            </div>

            <FacultyList faculties={faculty} />
          </div>
        </form>
      </div>
    </>
  );
};

export default viewfaculty;
