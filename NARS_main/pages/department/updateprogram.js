import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const UpdateProgram = ({ cookies }) => {
    const userState = useSelector((s) => s.user);
    const [departmentArr, setDepartment] = useState([]); // State to hold department options
    const [programArr, setProgram] = useState([]); // State to hold program options
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [newName, setNewName] = useState("");
    const [msg, setMsg] = useState("");

    if (userState.role !== "department admin" || userState.loggedInStatus !== "true") {
        return <div className="error">404 could not found</div>;
    }

    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    }, []);

    useEffect(() => {
        async function fetchDepartments() {
            // Simulated data fetch for departments
            const departments = [
                { name: "Department 1", id: "department1" },
                { name: "Department 2", id: "department2" },
                { name: "Department 3", id: "department3" },
            ];
            setDepartment(departments);
        }
        fetchDepartments();
    }, []);

    useEffect(() => {
        async function fetchPrograms() {
            if (selectedDepartment) {
                // Fetch programs based on the selected department
                const resp = await fetch(`http://localhost:8086/programs/${selectedDepartment}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userState.token,
                    },
                });
                const data = await resp.json();
                const programs = data.map((program) => ({ name: program.name, id: program.id }));
                setProgram(programs);
            }
        }
        fetchPrograms();
    }, [selectedDepartment]);

    const departmentRef = useRef();
    const programRef = useRef();
    const nameRef = useRef();

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
        setSelectedProgram("");
        setNewName("");
    };

    const handleProgramChange = (e) => {
        setSelectedProgram(e.target.value);
        setNewName("");
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const closeMsg = () => {
        setMsg("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const r = await fetch(`http://localhost:8086/programs/${selectedProgram}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: newName || nameRef.current.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + userState.token,
                },
            });
            const resp = await r.json();
            if (resp.status === "success") {
                setMsg(success);
            } else {
                setMsg(fail);
            }
        } catch (e) {
            console.log(e);
        }
    };

    let fail = (
        <div
            id="alert-border-2"
            className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
        >
            {/* Fail content */}
        </div>
    );

    let success = (
        <div
            id="alert-border-3"
            className="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
            role="alert"
        >
            {/* Success content */}
        </div>
    );

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 rounded-2xl shadow-lg"
                >
                    <div className="contentAddUser2 flex flex-col gap-10">
                        <p className=" font-bold text-3xl text-blue-900 text-center mb-3"> Update Program</p>
                        <div className=" gap-20">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div className=" text-blue-900 text-2xl font-bold mb-2">Select Department:</div>
                                <select
                                    ref={departmentRef}
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChange}
                                    className="block w-full text-xl md:text-lg p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Select Department</option>
                                    {departmentArr.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-5 w-1/3">
                                <div className=" text-blue-900 text-2xl font-bold mb-2 mt-2">Programs:</div>
                                <select
                                    ref={programRef}
                                    id="small"
                                    value={selectedProgram}
                                    onChange={handleProgramChange}
                                    className="block w-full text-xl md:text-lg p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Choose a Program</option>
                                    {programArr.map((program) => (
                                        <option key={program.id} value={program.id}>
                                            {program.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {selectedProgram && (
                            <div className="flex flex-col gap-5 w-2/5">
                                <div>Change Name:</div>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-form w-full"
                                    value={newName}
                                    onChange={handleNameChange}
                                    ref={nameRef}
                                />
                            </div>
                        )}
                        <div className="flex gap-20">{msg && <div className="w-1/2 mt-10">{msg}</div>}</div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-1/3 text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg p-4 px-3 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateProgram;
