import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Modal from "@/components/Modal";

const Profile = ({ cookies }) => {
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const globalState = useSelector((s) => s.user);
    if (globalState.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }

    const passwordHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const r = await fetch(
                `http://localhost:8081/staff/updatePassword/${globalState._id}`,
                {
                    method: "PATCH",

                    body: JSON.stringify({
                        passwordCurrent: oldPassword.current.value,
                        password: newPassword.current.value,
                        passwordConfirm: confirmPassword.current.value,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/form-data",
                        Authorization: "Bearer " + globalState.token,
                    },
                }
            );
            const resp = await r.json();
            console.log(resp);
            setErrorMessage(resp.message);
            console.log(errorMessage);
            if (resp.status == "success") {
                setInvalidData(false);
            } else {
                setInvalidData(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const name = useRef();
    const oldPassword = useRef();
    const newPassword = useRef();
    const confirmPassword = useRef();
    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };

    let fail = (
        <div
            id="alert-border-2"
            className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
        >
            <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
            <div className="ml-3 text-sm font-medium">
                Failed to update your information
                <a href="#" className="font-semibold underline hover:no-underline"></a>.
            </div>
            <button
                type="button"
                onClick={closeMsg}
                className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-border-2"
                aria-label="Close"
            >
                <span className="sr-only">Dismiss</span>
                <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );

    let success = (
        <div
            id="alert-border-3"
            className="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
            role="alert"
        >
            <i className="fa-solid fa-circle-check"></i>
            <div className="ml-3 text-sm font-medium">
                Your information has been updated successfully
                <a href="#" className="font-semibold underline hover:no-underline"></a>
            </div>
            <button
                onClick={closeMsg}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-border-3"
                aria-label="Close"
            >
                <span className="sr-only">Dismiss</span>
                <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );
    const [showModal, setShowModal] = useState(false);
    const [invalidData, setInvalidData] = useState(false);
    const myFileInput = useRef(null)
    const handleFile = () => {
        myFileInput.current.click();
    }
    const [img, setImg] = useState();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8081/staff/getPhoto/${globalState._id}`,
                    {
                        method: "GET",

                        headers: {
                            Accept: "application/form-data",
                            Authorization: "Bearer " + globalState.token,
                        },
                    }
                );

                console.log(res);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                console.log("photoooooooo22222222222", imageObjectURL);
                setImg(imageObjectURL);
            } catch (e) {
                console.log(e);
            }
        };
        fetchImage();
    }, []);
    var photo;
    return (
        <>
            
                {/* Sidebar */}
               
                {/* Main Content */}
               
    {/* Form */}
    <form
                className="bg-sky-50 h-screen w-[100%]    flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
            >
    <div className="p-8 mt-16 ml-10 shadow-2xl rounded-3xl bg-blue-100 w-[50%] hover:bg-blue-300 ">
                    <div className="grid md:grid-cols-3 grid-cols-1">
                        {/* Profile Picture */}
                        <div className="relative col-span-1">
                            <input type="file" className="hidden" id="myFileInput" ref={myFileInput} onChange={async (e) => {
                                setSelectedFile(e.target.files[0])
                                photo = e.target.files[0];
                                const data = new FormData();
                                data.append("photo", photo);
                                try {
                                    const r = await fetch(
                                        `http://localhost:8081/staff/updateMe/${globalState._id}`,
                                        {
                                            method: "PATCH",
                                            body: data,
                                            headers: {
                                                Accept: "application/form-data",
                                                Authorization: "Bearer " + globalState.token,
                                            },
                                        }
                                    );

                                    const resp = await r.json();
                                    console.log(resp);

                                    if (resp.status == "success") {
                                        setMsg(success);
                                        Cookies.set("name", name.current.value);
                                        cookies.set("photo", selectedFile);
                                    } else {
                                        setMsg(fail);
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }} />
                            <label htmlFor="myFileInput">
                                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 cursor-pointer hover:text-indigo-600">
                                    <span className="sr-only">Upload Profile Picture</span>
                                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                   
                                </div>
                            </label>
                        </div>
                        {/* Student Information */}
                        <div className="col-span-2 space-y-4  mt-20">
                            <h1 className="text-4xl font-semibold text-blue-900 capitalize">Name:  {cookies.name}</h1>
                            <h3 className="text-lg text-blue-500 font-semibold">Role:  {cookies.role}</h3>
                            <h3 className="text-lg  text-blue-500 font-semibold">Email:  {cookies.email}</h3>
                        </div>
                    </div>
                    {/* Action Button */}
                    <div className="mt-8 text-center border-b pb-12">
                        <button onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                        }} className="text-white py-2 px-4 uppercase rounded bg-blue-500 hover:bg-blue-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                            Change Password
                        </button>
                    </div>
    </div>
    </form>


           

            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="py-6 px-6 lg:px-8 text-left">
                    <h3 className="mb-4 text-xl font-medium text-gray-900">
                        Change your password
                    </h3>
                    <form className="space-y-6" onSubmit={passwordHandler}>
                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Old password
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                required
                                ref={oldPassword}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                New password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                required
                                ref={newPassword}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Confirm new password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                required
                                ref={confirmPassword}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800
                            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                            rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Update Password
                        </button>
                        {invalidData && (
                            <div className="text-red-500 flex justify-center">{errorMessage}</div>
                        )}
</form>
                </div>
            </Modal>
        </>
    );
};
export default Profile;
