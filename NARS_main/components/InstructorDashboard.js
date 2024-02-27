import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { GrAddCircle, GrOrderedList } from "react-icons/gr";
import { updateField } from "./store/userSlice";
import HeaderElement from "./HeaderElement";
import { header } from "./header";
import Cookies from "js-cookie";

export default function InstructorDashboard({ cookies }) {
  const [courses, setCourses] = useState([]);
  const coursesRef = useRef([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { _id: userId, token } = userState;
  const navStatus = useSelector((state) => state.user.navStatus);

  useEffect(() => {
    getCreatedCoursesForInstructor();
  }, [userId, token]);

  const getCreatedCoursesForInstructor = async () => {
    try {
      const response = await fetch(
        `http://localhost:8087/created-courses?instructor=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      // Handle error - display message to user, retry mechanism, etc.
    }
  };

  const logoutHandler = () => {
    router.push("/logout");
  };

  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${
        navStatus ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <Link className="link2 text-gray-600 hover:text-slate-900 font-semibold" href="/profile">
        <div className="flex items-center">
          <CgProfile style={{ fontSize: 40, marginBottom: 5, color: "#023e8a" }} />
          <span className="ml-2 text-lg">Profile</span>
        </div>
      </Link>

      {/* <div className="mt-4">
        <h2 className="text-lg text-gray-700 mb-2">Courses</h2>
        <ul className="space-y-2">
          {courses.map((courseInstance) => (
            <li key={courseInstance._id}>
              <HeaderElement
                className={``}
                key={courseInstance._id}
                id={courseInstance._id}
                originalId={courseInstance.course._id}
                name={courseInstance.course.name}
                createdAt={courseInstance.createdAt.split("T")[0]}
                cookies={cookies}
              />
            </li>
          ))}
        </ul>
      </div> */}

      <Link className="link2  text-gray-600 hover:text-slate-900 font-semibold" href="/instructor/courses/create">
        <div className="flex items-center mt-4">
          <GrAddCircle style={{ fontSize: 30, marginBottom: 5,color: "#023e8a" }} />
          <span className="ml-2 text-lg">Create Course</span>
        </div>
      </Link>
      <Link
        className="link2 text-gray-600 hover:text-slate-900 font-semibold"
        href={{ pathname: `/indirectAssessment/grade`, query: { role: "isInstructor" } }}
      >
        <div className="flex items-center mt-4">
        <GrAddCircle style={{ fontSize: 30, marginBottom: 5,color: "#023e8a" }} />
          <span className="ml-2 text-lg">Add Student Marks</span>
        </div>
      </Link>

      <Link
        className="link2 text-gray-600 hover:text-slate-900 font-semibold"
        href={{ pathname: `/indirectAssessment/surveys`, query: { role: "isInstructor" } }}
      >
        <div className="flex items-center mt-4">
          <GrAddCircle style={{ fontSize: 30, marginBottom: 5,color: "#023e8a" }} />
          {/* <GrOrderedList style={{ fontSize: 30, marginBottom: 5, color: "#023e8a" x}} /> */}
          <span className="ml-2 text-lg">Create Surveys</span>
        </div>
      </Link>

      <button className="link2 text-gray-600 hover:text-slate-900 text-left mt-4 font-semibold" onClick={logoutHandler}>
        <div className="flex items-center">
          <CgLogOut style={{ fontSize: 30, marginBottom: 0, color: "#023e8a" }} />
          <span className="ml-2 text-lg">Logout</span>
        </div>
      </button>
    </nav>
  );
}
