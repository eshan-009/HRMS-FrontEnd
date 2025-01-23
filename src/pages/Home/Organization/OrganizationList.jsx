import React, { useEffect, useState } from "react";
import { getOrganizations } from "../../../services/operations/AsideBar";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganization } from "../../../services/operations/Organization";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import Headings from "../../../components/common/Headings";
import NavigateToForm from "../../../components/common/buttons/NavigateToForm";
const OrganizationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Theme = useSelector((state) => state.Theme.theme);
  const data = useSelector((state) => state.Aside.organizations);
  const isLastPage = useSelector((state) => state.Aside.isLastOrg);
  const [page, setPage] = useState(1);
  // const [limit,setLimit] = useState(2)
  useEffect(() => {
    dispatch(getOrganizations());
  }, []);

  function deleteHandler(id) {
    dispatch(deleteOrganization(id));
  }
  function editHandler(data) {
    navigate("/home/Create-Organization", { state: { preFilled: data } });
  }
  return (
    <div
      className={`w-full p-5 border rounded-lg mt-10 ${
        Theme == "Dark" ? "bg-slate-800 text-white" : "bg-slate-100"
      }`}
    >
      <Headings
        title={location.pathname.split("/").at(-1).replaceAll("-", " ")}
      />

      <NavigateToForm
        onClick={() => navigate("/home/Create-Organization")}
        buttonText={"Add Sub Organization"}
      />

      <div className="border rounded-lg overflow-x-auto mt-10 mb-7">
        <table className="w-full">
          <thead className="w-full text-left ">
            <tr
              className={`w-full p-5 border rounded-lg ${
                Theme == "Dark" ? "bg-slate-600 text-white" : "bg-slate-400"
              }`}
            >
              <th className="p-3 min-w-[80px] text-center">S No.</th>
              <th className="min-w-[120px] text-center">Organization Logo</th>
              <th className="min-w-[150px] text-center">Organization Name</th>
              <th className="min-w-[150px] text-center">Organization Description</th>
              <th className="min-w-[60px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr
                  className={`h-full text-center ${
                    index % 2 == 0
                      ? Theme == "Dark"
                        ? "bg-zinc-500 text-white"
                        : "bg-zinc-200"
                      : ""
                  }`}
                >
                  <td className="p-5">{index + 1}</td>
                  <td >
                    <img
                      className="w-[40px] h-[40px] mx-auto object-cover border border-black rounded-full"
                      src={item.logo}
                    ></img>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description.substring(0, 20)}...</td>
                  <td>
                    <div className="flex items-center justify-center gap-3">
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
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();

            page > 0 && dispatch(getOrganizations(page - 1));
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

            page > 0 && !isLastPage && dispatch(getOrganizations(page + 1));
            setPage(page + 1);

            console.log("HHHH", isLastPage);
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

export default OrganizationList;
