import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../../services/operations/Department";
import {
  assignDepartmentToEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeesByDepartment,
  removeDepartmentFromEmployee,
} from "../../../services/operations/Employee";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/common/Modal";
import AssignmentButton from "../../../components/common/buttons/AssignmentButton";
import Headings from "../../../components/common/Headings";
import NavigateToForm from "../../../components/common/buttons/NavigateToForm";
import ActionHandler from "../../../components/common/ActionHandler";
const EmployeeList = () => {
  const refreshState = useSelector((state) => state.Refresh.count);
  const Theme = useSelector((state) => state.Theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.Aside.filteredEmployees);
  const departmentData = useSelector((state) => state.Aside.departments);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");

  const isLastPage = useSelector((state) => state.Aside.isLastEmp);
  const [page, setPage] = useState(1);

  const [departmentId, setDepartmentId] = useState("All");

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    departmentId !== "All"
      ? dispatch(getEmployeesByDepartment(departmentId))
      : dispatch(getAllEmployees());
  }, [refreshState]);

  function deleteHandler(userId) {
    // console.log(userId)
    dispatch(deleteEmployee(userId));
  }

  function editHandler(data) {
    // console.log(data)
    navigate("/home/Create-Employee", { state: { preFilled: data } });
  }

  function assignDepartment(userId, departmentId) {
    dispatch(assignDepartmentToEmployee(userId, departmentId));
  }

  function handleUnAssign(item) {
    dispatch(
      removeDepartmentFromEmployee(item?._id, item?.personalDetails?.department)
    );
  }

  function handleAssign(e, item) {
    e.preventDefault();
    setModal(true);
    setUserId(item?._id);
  }

  return (
    <div
      className={`p-5 bg-slate-100 rounded ${
        Theme == "Dark" ? "bg-slate-800 text-white" : "bg-slate-100"
      }`}
    >
      <Headings
        title={location.pathname.split("/").at(-1).replaceAll("-", " ")}
      />

      <NavigateToForm
        onClick={() => navigate("/home/Create-Employee")}
        buttonText={"Add Employee"}
      />
      <div>
        <select
          className={`appearance-none w-full min-w-72 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto mt-9 ${
            Theme == "Dark" ? "bg-slate-700 border-slate-500" : "bg-slate-100"
          } `}
          onChange={(e) => {
            e.preventDefault();
            setDepartmentId(e.target.value);

            if (e.target.value == "All") {
              dispatch(getAllEmployees());
            } else {
              dispatch(getEmployeesByDepartment(e.target.value));
            }
          }}
        >
          <option value={"All"}>All Employees</option>
          {departmentData &&
            departmentData.map((item) => (
              <option value={item?._id}>{item.name}</option>
            ))}
        </select>
      </div>

      <div className="border rounded-lg overflow-hidden mt-9 mb-7">
        <table className="w-full">
          <thead className="w-full text-left ">
            <tr
              className={`${
                Theme == "Dark" ? "bg-slate-600 text-white" : "bg-slate-400"
              }`}
            >
              <th className="p-3">Avatar</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Code</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <tr
                  className={`h-full ${
                    index % 2 == 0
                      ? Theme == "Dark"
                        ? "bg-zinc-500"
                        : "bg-zinc-200"
                      : ""
                  }`}
                >
                  {/* <td className='p-5'></td> */}
                  <td>
                    {" "}
                    <img
                      className="w-14 h-14 object-cover rounded-full m-1 border border-black"
                      src={item.personalDetails?.profilePicture}
                    ></img>
                  </td>

                  <td>
                    {item?.personalDetails?.firstName +
                      " " +
                      item?.personalDetails?.lastName}{" "}
                  </td>
                  <td>{item?.email}</td>
                  <td>{item?.personalDetails?.employeeCode}</td>
                  <td>
                    {item?.personalDetails?.department ? (
                      <AssignmentButton
                        onClick={() => handleUnAssign(item)}
                        buttonText={"UnAssign"}
                      />
                    ) : (
                      // <button onClick={()=>dispatch(removeDepartmentFromEmployee(item?._id,item?.personalDetails?.department))} className='bg-yellow-300 p-2'>UnAssign</button>
                      <AssignmentButton
                        onClick={(e) => handleAssign(e, item)}
                        buttonText={"Assign"}
                      />
                    )}
                  </td>
                  <td>
                    <ActionHandler
                      editHandler={() => editHandler(item)}
                      deleteHandler={() => deleteHandler(item._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          parent={"Employee"}
          setModal={setModal}
          userId={userId}
          departmentId={departmentId}
          // unAssignOrganization={unAssignOrganization}

          assignDepartment={assignDepartment}
        />
      )}

      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();

            page > 0 && departmentId !== "All"
              ? dispatch(getEmployeesByDepartment(departmentId, page - 1))
              : dispatch(getAllEmployees(page - 1));
            setPage(page - 1);
          }}
          disabled={page == 1}
          className={`bg-red-400 p-3 rounded-md ${
            page == 1 ? "opacity-60" : ""
          }`}
        >
          Previous
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();

            page > 0 && !isLastPage && departmentId !== "All"
              ? dispatch(getEmployeesByDepartment(departmentId, page + 1))
              : dispatch(getAllEmployees(page + 1));
            setPage(page + 1);
          }}
          disabled={isLastPage}
          //  Complete This logic if on last page data.length=limit
          className={`bg-red-400 p-3 rounded-md ${
            isLastPage ? "opacity-60" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
