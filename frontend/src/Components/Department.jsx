import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Context/Authentication.context";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token1 = useContext(AuthContext);
  const token = token1.token;
  const navigate = useNavigate();

  const handleCardClick = (departmentId, departmentName,departmenthead) => {
    console.log(departmenthead);
    navigate("/DepartmentDisplay", {
      state: { departmentId: departmentId, departmentName: departmentName ,departmenthead:departmenthead },
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/departments")
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (dept) => {
    axios
      .delete(`http://localhost:8080/departments/${dept.DepartmentId}`)
      .then(() => {
        setDepartments(
          departments.filter(
            (department) => department.DepartmentId !== dept.DepartmentId
          )
        );
        alert("Department deleted successfully!");
      })
      .catch((error) => console.error("Error deleting department:", error));
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen w-full">
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-[#F4C63D]">Departments</h2>
            <p className="mt-1 text-sm text-gray-300">
              Manage all departments. You can add, edit, or delete department
              records.
            </p>
          </div>
          <div className="md:w-auto w-full text-right">
            {token ? (
              <Link
                to="/AddDepartment"
                className="rounded-md bg-[#F4C63D] m-52 px-4 py-2 text-sm font-semibold text-black transition transform hover:scale-105 hover:bg-[#FF6F61] hover:shadow-[0_4px_20px_rgba(255,111,97,0.8)] focus:outline-none focus:ring-2 focus:ring-[#F4C63D] focus:ring-offset-2"
              >
                Add New Department
              </Link>
            ) : (
              <p className="text-red-700">Log In For Add Department</p>
            )}
          </div>
        </div>

        {loading ? (
          <p className="mt-6 text-gray-300">Loading departments...</p>
        ) : (
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-700">
                      <tr className="divide-x divide-gray-200">
                        <th className="px-4 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                          Department ID
                        </th>
                        <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                          Department Name
                        </th>
                        {token ? (
                          <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                            Actions
                          </th>
                        ) : (
                          <p></p>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-gray-900">
                      {departments.map((department) => (
                        <tr
                          key={department.DepartmentId}
                          className="transition-colors duration-300 hover:bg-[#3A3A3A] cursor-pointer divide-x divide-gray-200"
                        >
                          <td
                            className="whitespace-nowrap px-4 py-4"
                            onClick={() =>
                              handleCardClick(
                                department.DepartmentId,
                                department.DepartmentName,
                                department.HeadID
                              )
                            }
                          >
                            <div className="text-sm font-medium text-white">
                              {department.DepartmentId}
                            </div>
                          </td>
                          <td
                            className="whitespace-nowrap px-4 py-4 text-sm text-gray-300"
                            onClick={() =>
                              handleCardClick(
                                department.DepartmentId,
                                department.DepartmentName,
                                department.HeadID
                              )
                            }
                          >
                            {department.DepartmentName}
                          </td>
                          {token ? (
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <button
                                onClick={() => handleDelete(department)}
                                className="text-[#FF6F61] m-4 hover:text-[#F4C63D] transition-colors duration-200"
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
        )}
      </section>
    </div>
  );
}

export default Department;
