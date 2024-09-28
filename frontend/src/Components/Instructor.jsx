import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card_Instructor from "./Card_Instructor";
import { AuthContext } from "../Components/Context/Authentication.context.jsx";

function Instructor() {
  const [instructors, setInstructors] = useState([]);
  const [alldepartments, setAlldepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInstructor, setEditingInstructor] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const token1 = useContext(AuthContext);
  const token = token1.token;

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const [instructorsResponse, departmentsResponse] = await Promise.all([
          axios.get("http://localhost:8080/instructors"),
          axios.get("http://localhost:8080/departments"),
        ]);
        setInstructors(instructorsResponse.data);
        setAlldepartments(departmentsResponse.data);
      } catch (err) {
        setError("Error fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);
  console.log(alldepartments);
  console.log(instructors);

  const handleOnDelete = (id) => {
    axios
      .delete(`http://localhost:8080/instructors/${id}`)
      .then(() => {
        setInstructors((prev) =>
          prev.filter((inst) => inst.InstructorID !== id)
        );
        alert("Instructor deleted successfully!");
      })
      .catch((error) => console.error("Error deleting instructor:", error));
  };

  const handleOnEdit = (instructorID) => {
    // Find the instructor by ID
    const instructorToEdit = instructors.find(
      (instructor) => instructor.InstructorID === instructorID
    );

    if (instructorToEdit) {
      // Set the state for the instructor being edited
      setEditingInstructor(instructorToEdit);
      setEditedName(instructorToEdit.InstructorName);
      setEditedEmail(instructorToEdit.email);
      setEditedPhone(instructorToEdit.phone);
    }
  };

  const handleOnSave = (instructorID) => {
    const updatedInstructor = {
      ...editingInstructor, // Keeps other fields unchanged
      InstructorName: editedName, // Save the edited name
      email: editedEmail, // Save the edited email
      phone: editedPhone, // Save the edited phone
    };

    axios
      .put(
        `http://localhost:8080/instructors/${instructorID}`,
        updatedInstructor,)
      .then((response) => {
        // Update instructor in state after saving
        setInstructors((prevInstructors) =>
          prevInstructors.map((inst) =>
            inst.InstructorID === instructorID ? updatedInstructor : inst
          )
        );
        setEditingInstructor(null); // Exit edit mode
        alert("Instructor updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating instructor:", error);
      });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-[#F4C63D]">Instructors</h2>
            <p className="mt-1 text-sm text-gray-300">
              This is a list of all instructors. You can add new instructors,
              edit, or delete existing ones.
            </p>
          </div>
          <div>
            {token ? (
              <Link
                to="/AddInstructor"
                className="rounded-md bg-[#F4C63D] m-5 px-4 py-2 text-sm font-semibold text-black transition transform hover:scale-105 hover:bg-[#FF6F61] hover:shadow-[0_4px_20px_rgba(255,111,97,0.8)] focus:outline-none focus:ring-2 focus:ring-[#F4C63D] focus:ring-offset-2"
              >
                Add New Instructor
              </Link>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-700">
                    <tr className="divide-x divide-gray-200">
                      {[
                        "Instructor",
                        "ID",
                        "Department",
                        "E-mail",
                        "Phone",
                        "Gender",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-900">
                    {instructors.map((instructor) => (
                      <tr
                        key={instructor.InstructorID}
                        className="transition-colors duration-300 hover:bg-[#3A3A3A] cursor-pointer divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-white">
                          {editingInstructor &&
                          editingInstructor.InstructorID ===
                            instructor.InstructorID ? (
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="mt-1 block w-full rounded-md bg-gray-800 text-white"
                            />
                          ) : (
                            instructor.InstructorName
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {instructor.InstructorID}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {alldepartments.find(
                            (dept) =>
                              dept.DepartmentId === instructor.DepartmentID
                          )?.DepartmentName || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {token ? (
                            editingInstructor &&
                            editingInstructor.InstructorID ===
                              instructor.InstructorID ? (
                              <input
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                placeholder={instructor.email || "N/A"} // Set placeholder
                                className="mt-1 block w-full rounded-md bg-gray-800 text-white"
                              />
                            ) : (
                              instructor.email || "N/A"
                            )
                          ) : (
                            <p className="text-red-600">Private</p>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {token ? (
                            editingInstructor &&
                            editingInstructor.InstructorID ===
                              instructor.InstructorID ? (
                              <input
                                type="tel"
                                value={editedPhone}
                                onChange={(e) => setEditedPhone(e.target.value)}
                                placeholder={instructor.phone || "N/A"} // Set placeholder
                                className="mt-1 block w-full rounded-md bg-gray-800 text-white"
                              />
                            ) : (
                              instructor.phone || "N/A"
                            )
                          ) : (
                            <p className="text-red-600">Private</p>
                          )}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {instructor.gender || "N/A"}
                        </td>
                        {token ? (
                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            {!editingInstructor ? (
                              <button
                                onClick={() =>
                                  handleOnEdit(instructor.InstructorID)
                                }
                                className="text-[#4ae92a] hover:text-[#F4C63D] m-4 transition-colors duration-200"
                              >
                                Edit
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleOnSave(instructor.InstructorID)
                                }
                                className="text-[#4ae92a] hover:text-[#F4C63D] m-4 transition-colors duration-200"
                              >
                                Save
                              </button>
                            )}
                            <button
                              onClick={() =>
                                handleOnDelete(instructor.InstructorID)
                              }
                              className="text-[#FF6F61] hover:text-[#F4C63D] m-4 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        ) : (
                          <p></p>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Instructor;
