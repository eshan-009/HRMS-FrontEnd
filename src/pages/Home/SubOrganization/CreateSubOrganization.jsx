import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttributes } from "../../../services/operations/Attribute";

import CreateForm from "../../../components/Forms/CreateForm";
import { getOrganizations } from "../../../services/operations/AsideBar";

const CreateSubOrganization = () => {
  const dispatch = useDispatch();

  const parent = location.pathname
    .split("/")
    .at(-1)
    .replace("-", " ")
    .split(" ")[1]
    .replace("-", "");
  console.log("Parent-=-=-=-=-=--=-=>>>>>>", parent);
  useEffect(() => {
    dispatch(getAttributes(parent));
    dispatch(getOrganizations());
  }, []);

  const customAttributes = useSelector(
    (state) => state.Attribute.subOrganization
  );
  const OrganizationData = useSelector((state) => state.Aside.organizations);
  return (
    <>
      <CreateForm customAttributes={customAttributes} parent={parent} />
    </>
  );
};

export default CreateSubOrganization;
