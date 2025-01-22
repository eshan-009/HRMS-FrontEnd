import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../../../services/operations/AsideBar";
import {
  assignBranchToDepartment,
  assignOrganizationToDepartment,
  deleteDepartment,
  getDepartmentsByOrganization,
  getUnassignedDepartments,
  removeBranchFromDepartment,
  removeOrganizationFromDepartment,
} from "../../../services/operations/Department";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getEmployeeById } from "../../../services/operations/Employee";
import Modal from "../../../components/common/Modal";
import { IoAddCircleOutline } from "react-icons/io5";
import AssignmentButton from "../../../components/common/buttons/AssignmentButton";
import Headings from "../../../components/common/Headings";
import NavigateToForm from "../../../components/common/buttons/NavigateToForm";
import ActionHandler from "../../../components/common/ActionHandler";
const DepartmentList = () => {
  const refreshState = useSelector((state) => state.Refresh.count);
  const Theme = useSelector((state) => state.Theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.Aside.filteredDepartments);
  const organizationData = useSelector((state) => state.Aside.organizations);
  const manager = useSelector((state) => state.Aside.employees);
  const [organizationId, setOrganizationId] = useState("unAssigned");
  const [modal, setModal] = useState(false);
  const [departmentId, setDepartmentId] = useState("undefined");
  const [isSuborg, setIsSuborg] = useState(false);
  const isLastPage = useSelector((state) => state.Aside.isLastDep);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrganizations("All"));

    dispatch(getUnassignedDepartments());
  }, []);

  useEffect(() => {
    organizationId !== "unAssigned"
      ? dispatch(getDepartmentsByOrganization(organizationId))
      : dispatch(getUnassignedDepartments());
  }, [refreshState]);

  function deleteHandler(id) {
    dispatch(deleteDepartment(id, navigate));
  }
  async function editHandler(data) {
    const newData = { ...data };

    newData.manager =
      manager?.personalDetails?.firstName +
      " " +
      manager?.personalDetails?.lastName;

    navigate("/home/Create-Department", { state: { preFilled: newData } });
  }

  function assignOrganization(departmentId, organizationId) {
    dispatch(assignOrganizationToDepartment(departmentId, organizationId));
  }
  function assignSubOrganization(departmentId, branchId) {
    dispatch(assignBranchToDepartment(departmentId, branchId));
  }
  function removeOrganization(departmentId, organizationId) {
    dispatch(removeOrganizationFromDepartment(departmentId, organizationId));
  }
  function removeBranch(departmentId, branchId) {
    dispatch(removeBranchFromDepartment(departmentId, branchId));
  }

  function organizationAssignHandler(item) {
    setIsSuborg(false);
    setDepartmentId(item._id);
    setModal(true);
  }

  function subOrganizationAssignHandler(item) {
    setIsSuborg(true);
    setDepartmentId(item._id);

    setModal(true);
  }

  return (
    <div
      className={`p-5 rounded mt-10 ${
        Theme == "Dark" ? "bg-slate-800 text-white" : "bg-slate-100"
      }`}
    >
      <Headings
        title={location.pathname.split("/").at(-1).replaceAll("-", " ")}
      />
      <NavigateToForm
        onClick={() => navigate("/home/Create-Department")}
        buttonText={"Add Department"}
      />

      <div>
        <select
          className={`appearance-none  min-w-72 max-w-72 w-72 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto mt-9 ${
            Theme == "Dark" ? "bg-slate-800 border-slate-500" : "bg-slate-100"
          }`}
          onChange={(e) => {
            e.preventDefault();
            setOrganizationId(e.target.value);
            if (e.target.value == "unAssigned") {
              dispatch(getUnassignedDepartments());
            } else {
              dispatch(getDepartmentsByOrganization(e.target.value));
            }
          }}
        >
          <option value={"unAssigned"}>Unassigned Departments</option>
          {organizationData &&
            organizationData.map((item) => (
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
              <th className="p-3">Department Name</th>
              <th>Department Manager</th>
              <th>Department Description</th>
              <th>Organization</th>
              <th>Sub Organization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr
                  className={`h-full ${
                    index % 2 == 0
                      ? Theme == "Dark"
                        ? "bg-zinc-500 text-white"
                        : "bg-zinc-200"
                      : ""
                  }`}
                >
                  <td className="p-5">{item.name}</td>

                  <td>
                    {item?.manager?.personalDetails?.firstName +
                      " " +
                      item?.manager?.personalDetails?.lastName}
                  </td>
                  <td>{item.description}</td>
                  <td>
                    {item.Organization ? (
                      <AssignmentButton
                        onClick={() =>
                          removeOrganization(item._id, item.Organization)
                        }
                        buttonText={"UnAssign"}
                      />
                    ) : (
                      <AssignmentButton
                        onClick={() => organizationAssignHandler(item)}
                        buttonText={"Assign"}
                      />
                    )}
                  </td>

                  <td>
                    {item.branch ? (
                      <AssignmentButton
                        onClick={() => removeBranch(item._id, item.branch)}
                        buttonText={"UnAssign"}
                      />
                    ) : (
                      <AssignmentButton
                        onClick={() => subOrganizationAssignHandler(item)}
                        buttonText={"Assign"}
                      />
                    )}
                  </td>

                  <td>
                    {/* <ActionHandler
          editHandler={()=>editHandler(item,navigate)}
          deleteHandler={()=>deleteHandler(item._id,navigate)}
          /> */}

                    <div className="flex items-center gap-3">
                      <FiEdit
                        className="text-blue-500 "
                        onClick={() => editHandler(item)}
                      />
                      <MdDelete
                        className=" text-red-500"
                        onClick={() => deleteHandler(item._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal
          parent={"Department"}
          setModal={setModal}
          organizationId={organizationId}
          departmentId={departmentId}
          assignOrganization={assignOrganization}
          assignSubOrganization={assignSubOrganization}
          isSuborg={isSuborg}
          // unAssignOrganization={unAssignOrganization}
          setOrganizationId={setOrganizationId}
        />
      )}

      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();

            page > 0 && organizationId !== "unAssigned"
              ? dispatch(getDepartmentsByOrganization(organizationId, page - 1))
              : dispatch(getUnassignedDepartments(page - 1));
            setPage(page - 1);

            console.log("HHHH");
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

            page > 0 && !isLastPage && organizationId !== "unAssigned"
              ? dispatch(getDepartmentsByOrganization(organizationId, page + 1))
              : dispatch(getUnassignedDepartments(page + 1));
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

export default DepartmentList;
