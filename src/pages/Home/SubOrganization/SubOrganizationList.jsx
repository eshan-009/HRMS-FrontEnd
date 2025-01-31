import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrganizations,
  getSubOrganizations,
  getSubOrganizationsByOrganizations,
  getUnassignedSubOrganizations,
} from "../../../services/operations/AsideBar";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  assignOrganizationToSubOrganization,
  deleteSubOrganization,
  removeOrganizationFromSubOrganization,
} from "../../../services/operations/SubOrganization";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/common/Modal";
import AssignmentButton from "../../../components/common/buttons/AssignmentButton";
import Headings from "../../../components/common/Headings";
import NavigateToForm from "../../../components/common/buttons/NavigateToForm";
const SubOrganizationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Theme = useSelector((state) => state.Theme.theme);
  const data = useSelector((state) => state.Aside.filteredSubOrganizations);
  const organizationData = useSelector((state) => state.Aside.organizations);

  const [organizationId, setOrganizationId] = useState("unAssigned");
  const [branchId, setBranchId] = useState("undefined");
  const [modal, setModal] = useState(false);
  const isLastPage = useSelector((state) => state.Aside.isLastSubOrg);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrganizations("All"));
    dispatch(getUnassignedSubOrganizations());
    // dispatch(getSubOrganizationsByOrganizations(organizationId))
    //    dispatch(getSubOrganizations())
  }, []);
  // useEffect(()=>{
  //     dispatch(getSubOrganizationsByOrganizations(organizationId))
  // },[organizationId])
  console.log("organizationId=====>>>>>.", organizationId);

  function deleteHandler(orgId, id) {
    console.log(id);
    dispatch(deleteSubOrganization(orgId, id));
  }
  function editHandler(data) {
    // console.log("{{{{{{{{{{{{{{{{{",data)
    navigate("/home/Create-Sub-Organization", { state: { preFilled: data } });
  }

  function assignOrganization(branchId, organizationId) {
    dispatch(assignOrganizationToSubOrganization(branchId, organizationId));
  }
  function unAssignOrganization(branchId, organizationId) {
    dispatch(removeOrganizationFromSubOrganization(branchId, organizationId));
  }
  function assignHandler(item) {
    setBranchId(item._id);
    setModal(true);
  }

  return (
    <div
      className={`p-5  rounded mt-10 ${
        Theme == "Dark" ? "bg-slate-800 text-white" : "bg-slate-100"
      }`}
    >
      <Headings
        title={location.pathname.split("/").at(-1).replaceAll("-", " ")}
      />

      <NavigateToForm
        onClick={() => navigate("/home/Create-Sub-Organization")}
        buttonText={"Add Sub Organization"}
      />

      <div>
        <select
          className={`appearance-none w-72 min-w-72 max-w-72 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto mt-9 ${
            Theme == "Dark" ? "bg-slate-700 border-slate-500" : "bg-slate-100"
          } `}
          onChange={(e) => {
            e.preventDefault();
            setOrganizationId(e.target.value);
            if (e.target.value == "unAssigned") {
              dispatch(getUnassignedSubOrganizations());
              console.log("Changed========>", e.target.value);
            } else {
              dispatch(getSubOrganizationsByOrganizations(e.target.value));
            }
          }}
        >
          <option value={"unAssigned"}>Unassigned Sub Organization</option>
          {organizationData &&
            organizationData.map((item) => (
              <option value={item?._id}>{item.name}</option>
            ))}
        </select>
      </div>

      <div className={`border rounded-lg overflow-x-auto mt-9 mb-7 `}>
        <table className="w-full">
          <thead className="w-full text-left ">
            <tr
              className={`${
                Theme == "Dark" ? "bg-slate-700 text-white" : "bg-slate-400"
              }`}
            >
              <th className="p-3 min-w-[150px] text-center">Sub Organization Id</th>
              <th className="min-w-[150px] text-center">Sub Organization Name</th>
              <th className="min-w-[150px] text-center">Assign Organization</th>
              <th className="min-w-[80px] text-center">Action</th>
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
                  <td className="p-5">{item._id}</td>

                  <td>{item.name}</td>
                  <td>
                    {item.Organization ? (
                      <AssignmentButton
                        onClick={() =>
                          unAssignOrganization(item._id, item.Organization)
                        }
                      />
                    ) : (
                      <AssignmentButton
                        onClick={() => assignHandler(item)}
                        buttonText={"Assign"}
                      />
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <FiEdit
                        className="text-blue-500 "
                        onClick={() => editHandler(item)}
                      />
                      <MdDelete
                        className=" text-red-500"
                        onClick={() =>
                          deleteHandler(item.organization, item._id)
                        }
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
          parent={"subOrganization"}
          setModal={setModal}
          organizationId={organizationId}
          branchId={branchId}
          assignOrganization={assignOrganization}
          // unAssignOrganization={unAssignOrganization}
          setOrganizationId={setOrganizationId}
        />
      )}

      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();

            page > 0 &&
              (organizationId !== "unAssigned"
                ? dispatch(
                    getSubOrganizationsByOrganizations(organizationId, page - 1)
                  )
                : dispatch(getUnassignedSubOrganizations(page - 1)));
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

            page > 0 &&
              !isLastPage &&
              (organizationId !== "unAssigned"
                ? dispatch(
                    getSubOrganizationsByOrganizations(organizationId, page + 1)
                  )
                : dispatch(getUnassignedSubOrganizations(page + 1)));
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

export default SubOrganizationList;
