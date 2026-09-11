import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllInstructors } from "../../state/instructorThunk";


const Instructor = () => {

    const dispatch = useDispatch();

    const {
        instructors,
        isLoading,
        error
    } = useSelector((state) => state.instructor);


    useEffect(() => {

        dispatch(getAllInstructors());

    }, [dispatch]);


    if (isLoading) {
        return (
            <div className="p-6">
                Loading instructors...
            </div>
        );
    }


    if (error) {
        return (
            <div className="p-6 text-red-500">
                {error}
            </div>
        );
    }


    return (
        <div className="p-6">

            <div className="mb-6">

                <h1 className="text-2xl font-semibold text-gray-800">
                    Instructors
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    View all instructors
                </p>

            </div>


            <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                Name
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                Email
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {instructors.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="2"
                                    className="text-center py-8 text-gray-500"
                                >
                                    No instructors found.
                                </td>

                            </tr>

                        ) : (

                            instructors.map((instructor) => (

                                <tr
                                    key={instructor._id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4 text-gray-800">
                                        {instructor.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {instructor.email}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default Instructor;