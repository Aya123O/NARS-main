import { userActions } from "../components/store/userSlice";
import { updateField } from "../components/store/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import MainHeader from "@/components/shared/MainHeader";
import LoginModal from "@/components/LoginModal";

export default function Login({ cookies }) {
  const s = useSelector((s) => s.user);
  console.log(s);
  const email = useRef();
  const password = useRef();
  const role = useRef();
  const dispatch = useDispatch();
  const [invalidData, setInvalidData] = useState(false);
  const [rolesArr, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const r = await fetch('http://localhost:8081/login', {
      method: "POST",

      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const resp = await r.json();
    console.log(resp);
    if (resp.status == "fail") {
      setInvalidData(true);
    } else {
      const courses = JSON.stringify(resp.data.user.courses);
      dispatch(userActions.toggleLoggedIn(true));
      dispatch(updateField({ field: "courses", value: courses }));
      dispatch(updateField({ field: "loggedInStatus", value: "true" }));
      dispatch(updateField({ field: "_id", value: resp.data.user._id }));
      dispatch(updateField({ field: "email", value: resp.data.user.email }));
      dispatch(updateField({ field: "jwt", value: resp.token }));
      dispatch(updateField({ field: "token", value: resp.token }));
      dispatch(updateField({ field: "name", value: resp.data.user.name }));
      dispatch(updateField({ field: "faculty", value: resp.data.user.faculty }));
      dispatch(updateField({ field: "department", value: resp.data.user.department }));
      dispatch(
        updateField({ field: "program", value: resp.data.user.program })
      );
      if (resp.data.user.role === "student") {
        dispatch(updateField({ field: "role", value: resp.data.user.role }));
        router.push("/studentProfile");
      } else if (resp.data.user.roles.length <= 1) {
        dispatch(
          updateField({ field: "role", value: resp.data.user.roles[0] })
        );
        router.push("/profile");
      } else {
        setRoles(resp.data.user.roles);
        setShowModal(true);
      }
    }
  };
  const submitRole = async (e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(updateField({ field: "role", value: role.current.value }));
    router.push("/profile");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 w-[100%] mt-10 text-blue-900 font-bold">
  <div class="text2 text-2xl font-bold">Login</div>
  <form
    onSubmit={submitHandler}
    className="border-2 border-gray-200 shadow-lg rounded-xl px-10 py-8 w-[600px] max-w-full"
  >
    <label for="email" className="text-lg font-semibold   text-blue-800 ">
     Email
    </label>
    <div class="mt-2">
      <input
        type="email"
        id="email"
        name="email"
        className="input-field"
        placeholder="Enter your email"
        required
        ref={email}
      />
    </div>
    <label for="password" className="text-lg font-semibold mt-4  text-blue-800 ">
      Password
    </label>
    <div class="mt-2">
      <input
        type="password"
        id="password"
        name="password"
        className="input-field"
        placeholder="Enter your password"
        required
        ref={password}
      />
    </div>
   <div className="flex items-center justify-center">
   <button type="submit" class="w-[50%] py-3 mt-6    bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl transition duration-300  font-bold text-blue-900 ">
      Login
    </button>
   </div>
    <div className="mt-4 text-sm text-center">
      <p>
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register now
        </Link>
      </p>
    </div>
    {invalidData && (
      <span className="text-red-500 block mt-4">Wrong email or password</span>
    )}
  </form>
  <p className="text-sm mt-4">
    Forgot your password?{" "}
    <Link href="/forget_password" className="text-blue-500 hover:underline">
      Reset now
    </Link>
  </p>
</div>


      <LoginModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Select your role
          </h3>
          <form className="space-y-6" onSubmit={submitRole}>
            <select
              ref={role}
              id="small"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            >
              <option selected>Choose a role</option>
              {rolesArr.map((e) => {
                return <option value={e}>{e}</option>;
              })}{" "}
            </select>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
            rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirm
            </button>
          </form>
        </div>
      </LoginModal>
    </>
  );
}

Login.getPageLayout = function PageLayout(page) {
  return <div className=" flex flex-col">{page}</div>;
};
