import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import UserServices from "../services/UserServices";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import Cookies from "js-cookie";
import { useLocation } from "react-router";
import * as dayjs from "dayjs";

const useCustomerSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // if (!imageUrl) {
    //   notifyError('Image is required!');
    //   return;
    // }
    const customerData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: data.image ? data.image : "",
      // role: data.role,
    };

    if (id) {
      UserServices.updateUser(id, customerData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      UserServices.registerUser({ email: adminInfo.email, customerData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("email");
      setValue("phone");
      setValue("joiningDate");
      // setValue("role");
      clearErrors("name");
      clearErrors("email");
      clearErrors("phone");
      clearErrors("joiningDate");
      // clearErrors("role");
      return;
    }
    if (id) {
      UserServices.getUserById(id, { email: adminInfo.email })
        .then((res) => {
          if (res) {
            setValue("name", res.name);
            setValue("email", res.email);
            setValue("phone", res.phone);
            setValue(
              "joiningDate",
              dayjs(res.lastOrderedDate).format("MMM D, YYYY")
            );
            // setValue("role", res.role);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email]);

  useEffect(() => {
    // eslint-disable-next-line no-mixed-operators
    if (
      location.pathname === "/setting" ||
      (location.pathname === "/edit-profile" && Cookies.get("adminInfo"))
    ) {
      const user = JSON.parse(Cookies.get("adminInfo"));
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      // setValue("role", user.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useCustomerSubmit;
