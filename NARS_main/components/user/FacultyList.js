import React from "react";

function FacultyList({ faculties }) {
    console.log(faculties);

    return (
        <div className="container mx-auto my-4">
            <table className="w-full text-left border rounded " >
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 font-bold border">Name</th>
                        <th className="px-4 py-2 font-bold border">Dean</th>
                        <th className="px-4 py-2 font-bold border">About</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.map((faculty) => {
                        return (
                            <tr key={faculty.email}>
                                <td className="border px-4 py-2">Shoubra</td>
                                <td className="border px-4 py-2">fatma.youssef@fsed.bu.edu.eg</td>
                                <td className="border px-4 py-2">Shoubra Faculty of Engineering</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default FacultyList;
