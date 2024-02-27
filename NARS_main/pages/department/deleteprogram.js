import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const DeleteProgram = ({ cookies }) => {
    const userState = useSelector((s) => s.user);
    const router = useRouter();
    const [departments, setDepartments] = useState([]);
    const departmentRef = useRef();

    // Redirect if user is not a department admin or not logged in
    if (userState.role !== "department admin" || userState.loggedInStatus !== "true") {
        router.push('/404'); // Redirect to a 404 page
        return null; // Return null to avoid rendering anything else
    }

    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
        fetchDepartments(); // Fetch departments when component mounts
    }, []);

    const fetchDepartments = async () => {
        try {
            const resp = await fetch(`http://localhost:8086/departments`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userState.token,
                },
            });
            const data = await resp.json();
            setDepartments(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };

    const programRef = useRef();
    const [programArr, setPrograms] = useState([]);

    const handleDepartmentChange = async (e) => {
        const departmentId = e.target.value;
        try {
            const resp = await fetch(`http://localhost:8086/programs?department=${departmentId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userState.token,
                },
            });
            const data = await resp.json();
            setPrograms(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const r = await fetch(`http://localhost:8086/${programRef.current.value}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + userState.token,
                },
            });
            const resp = await r.json();
            if (resp.status === "fail") {
                setMsg(failMsg);
            } else {
                setMsg(successMsg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const failMsg = (
        <div className="error-msg">
            <p>Something went wrong. Please try again.</p>
            <button onClick={closeMsg}>Close</button>
        </div>
    );

    const successMsg = (
        <div className="success-msg">
            <p>Faculty has been removed successfully.</p>
            <button onClick={closeMsg}>Close</button>
        </div>
    );

    return (
        <div className="container">
            
            <form onSubmit={submitHandler} className="form-container">
                <div className="form-content">
                    <div className="form-field">
                        <label htmlFor="department" className="text-blue-900 font-bold d-block text-2xl">Department:</label>
                        <select
                            ref={departmentRef}
                            id="department"
                            className="select-department mt-4 text-gray-400"
                            onChange={handleDepartmentChange}
                        >
                            <option value="" disabled selected>Select a Department</option>
                            {departments && departments.map((department) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="program" className="text-blue-900 font-bold d-block text-2xl">Program:</label>
                        <select
                            ref={programRef}
                            id="program"
                            className="select-program mt-4 text-gray-400"
                        >
                            <option value="" disabled selected>Select a Program</option>
                            {programArr.map((program) => (
                                <option key={program.id} value={program.id}>{program.name}</option>
                            ))}
                        </select>
                    </div>
                    {msg && <div className="message">{msg}</div>}
                    <div className="button-container">
                        <button type="submit" className="delete-button mt-3 w-50">Delete</button>
                    </div>
                </div>
            </form>
            <style jsx>{`
                .container {
                   
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin:auto;
                }
                .form-container {
                    width: 100%;
                    max-width: 800px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header p {
                    font-size: 20px;
                    color: #333;
                }
                .form-content {
                    display: flex;
                    flex-direction: column;
                }
                .form-field {
                    margin-bottom: 15px;
                }
                label {
                    font-weight: bold;
                }
                .select-department,
                .select-program {
                    width: 100%;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                .message {
                    margin-bottom: 15px;
                    padding: 10px;
                    background-color: #ffcccc;
                    border-radius: 5px;
                    color: #ff0000;
                }
                .button-container {
                    text-align: center;
                }
                .delete-button {
                    padding: 10px 20px;
                    background-color: #ff3333;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .delete-button:hover {
                    background-color: #ff6666;
                }
            `}</style>
        </div>
    );
};

export default DeleteProgram;
