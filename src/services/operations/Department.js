import toast from "react-hot-toast";
import {
  setDepartments,
  setFilteredDepartments,
  setIsLastDep,
} from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { DepartmentEndPoints } from "../apis";
import { refreshState } from "../../redux/slices/refreshSlice";

const {
  ALLDEPARTMENTS,
  UNASSIGNED_DEPARTMENTS,
  DEPARTMENTBYORGANIZATION,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
  ASSIGN_BRANCH_TO_DEPARTMENT,
  REMOVE_BRANCH_FROM_DEPARTMENT,
  ASSIGN_ORGANIZATION_TO_DEPARTMENT,
  REMOVE_ORGANIZATION_FROM_DEPARTMENT,
} = DepartmentEndPoints;

export const getAllDepartments = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const newUrl = `${ALLDEPARTMENTS}/?page=${page}&limit=${limit}`;
      const response = await apiConnector(
        "GET",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        dispatch(setDepartments(response.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUnassignedDepartments = (page) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const newUrl = `${UNASSIGNED_DEPARTMENTS}/?page=${page ?? 1}&limit=${10}`;
      const response = await apiConnector(
        "GET",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        response?.data?.isLast
          ? dispatch(setIsLastDep(true))
          : dispatch(setIsLastDep(false));
        dispatch(setFilteredDepartments(response.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDepartmentsByOrganization = (organizationId, page) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const newUrl = `${DEPARTMENTBYORGANIZATION}/${organizationId}/?page=${
        page ?? 1
      }&limit=${10}`;
      const response = await apiConnector(
        "GET",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        response?.data?.isLast
          ? dispatch(setIsLastDep(true))
          : dispatch(setIsLastDep(false));
        dispatch(setFilteredDepartments(response.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addDepartment = (
  name,
  description,
  customAttributes,
  organizationId,
  managerId
) => {
  return async (dispatch) => {
    try {
      const toastId = toast.loading("Creating new  Department");

      const newUrl = `${ADD_DEPARTMENT}/${organizationId}/${managerId}`;
      const token = localStorage.getItem("token");
      const body = {
        name: name,
        description: description,
        customAttributes: customAttributes,
      };
      const response = await apiConnector("POST", newUrl, body, {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      });

      toast.dismiss(toastId);
      if (response.data.success) {
        toast.success("Department Added Successfully");
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};

export const editDepartment = (
  name,
  description,
  customAttributes,
  organizationId,
  managerId,
  departmentId
) => {
  return async (dispatch) => {
    try {
      const toastId = toast.loading("Editing Department");
      // console.log(name,description,customAttributes,managerId,departmentId)
      const newUrl = `${EDIT_DEPARTMENT}/${managerId}/${departmentId}`;
      const token = localStorage.getItem("token");
      const body = {
        name: name,
        description: description,
        customAttributes: customAttributes,
      };

      const response = await apiConnector("PUT", newUrl, body, {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      });

      toast.dismiss(toastId);
      if (response.data.success) {
        toast.success("Department updated succesfully");
        dispatch(refreshState());
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};

export const deleteDepartment = (departmentId) => {
  return async (dispatch) => {
    try {
      const toastId = toast.loading("Deleting Department");

      const newUrl = `${DELETE_DEPARTMENT}/${departmentId}`;
      const token = localStorage.getItem("token");

      const response = await apiConnector(
        "DELETE",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log(response)
      toast.dismiss(toastId);

      if (response.data.success) {
        dispatch(refreshState());
        toast.success("Department Deleted Successfully");
      } else {
        toast.error("Error Deleting Department");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};

export const assignBranchToDepartment = (departmentId, branchId) => {
  return async (dispatch) => {
    try {
      const toastId = toast.loading("Assigning Sub Organization");

      const newUrl = `${ASSIGN_BRANCH_TO_DEPARTMENT}/${departmentId}/${branchId}`;
      const token = localStorage.getItem("token");

      const response = await apiConnector(
        "PATCH",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      toast.dismiss(toastId);

      if (response.data.success) {
        dispatch(refreshState());
        toast.success(`${response.data.message}`);
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};

export const assignOrganizationToDepartment = (
  departmentId,
  organizationId
) => {
  return async (dispatch) => {
    try {
      // console.log(departmentId)
      const toastId = toast.loading("Assigning Organization");
      const newUrl = `${ASSIGN_ORGANIZATION_TO_DEPARTMENT}/${departmentId}/${organizationId}`;
      const token = localStorage.getItem("token");

      const response = await apiConnector(
        "PATCH",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      toast.dismiss(toastId);

      if (response.data.success) {
        dispatch(refreshState());
        toast.success(`${response.data.message}`);
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};

export const removeBranchFromDepartment = (departmentId, branchId) => {
  return async (dispatch) => {
    try {
      // console.log(departmentId)
      const toastId = toast.loading("UnAssigning Sub Organization");
      const newUrl = `${REMOVE_BRANCH_FROM_DEPARTMENT}/${departmentId}/${branchId}`;
      const token = localStorage.getItem("token");

      const response = await apiConnector(
        "PATCH",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      toast.dismiss(toastId);

      if (response.data.success) {
        dispatch(refreshState());
        toast.success(`${response.data.message}`);
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};

export const removeOrganizationFromDepartment = (
  departmentId,
  organizationId
) => {
  return async (dispatch) => {
    try {
      // console.log(departmentId)
      const toastId = toast.loading("UnAssigning Organization");
      const newUrl = `${REMOVE_ORGANIZATION_FROM_DEPARTMENT}/${departmentId}/${organizationId}`;
      const token = localStorage.getItem("token");

      const response = await apiConnector(
        "PATCH",
        newUrl,
        {},
        {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      );

      toast.dismiss(toastId);

      if (response.data.success) {
        dispatch(refreshState());
        toast.success(`${response.data.message}`);
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
};
