import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';

const AddProgram = ({ cookies }) => {
    const userState = useSelector((s) => s.user);

    if (userState.role !== "department admin" || userState.loggedInStatus !== "true") {
        return <div className="error">404 Page Not Found</div>;
    }

    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };

    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [competences, setCompetences] = useState([{ code: "", description: "" }]);
    const name = useRef();

    useEffect(() => {
        async function fetchDepartments() {
            try {
                const resp = await fetch(`http://localhost:8086/departments`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userState.token,
                    },
                });
                const data = await resp.json();
                setDepartments(data.departments);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDepartments();
    }, [userState.token]);

    const handleAddInput = () => {
        setCompetences([...competences, { code: "", description: "" }]);
    };

    const handleInputChange = (index, event) => {
        const values = [...competences];
        values[index][event.target.name] = event.target.value;
        setCompetences(values);
    };

    const handleRemoveInput = (index) => {
        const values = [...competences];
        values.splice(index, 1);
        setCompetences(values);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Your submit logic here
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
                <form
                    onSubmit={submitHandler}
                    className="bg-blue-100 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 rounded-2xl shadow-lg"
                >
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                        <p className="font-bold text-3xl text-blue-900 ">Add Program : </p>
                        <div className="flex gap-20">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div className=" text-blue-900 text-2xl font-bold mb-2">Department:</div>
                                <select
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="input-form w-full"
                                >
                                    <option value="" disabled className="text-gray-200">Select a Department</option>
                                    {departments && departments.map((department) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-5 w-1/3">
                                <div className=" text-blue-900 text-2xl font-bold mb-2">Program Name:</div>
                                <input type="text" name="name" className="input-form w-full" ref={name} />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-5 mb-3">
                                <p className=" text-blue-900 text-2xl font-bold mb-2">Competences:</p>
                                <button onClick={handleAddInput} className="  mb-2 bg-blue-500 text-white py-2 px-4 rounded-md flex items-center">
                                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                                    Add Competence
                                </button>
                            </div>
                            {competences.map((competence, index) => (
                                <div key={index} className="flex gap-5 items-center">
                                    <input
                                        type="text"
                                        name="code"
                                        value={competence.code}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="Code"
                                        className="input-form w-1/6"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={competence.description}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="Description"
                                        className="input-form w-3/6"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveInput(index)}
                                        className="text-red-600 focus:outline-none"
                                    >
                                        <XCircleIcon className="h-10 w-10" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="w-full mt-10">{msg}</div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="w-[6rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProgram;
