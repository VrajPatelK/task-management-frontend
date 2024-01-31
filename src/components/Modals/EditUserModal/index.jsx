import React, { useRef } from "react";
import "./EditUserModal.css";
import ModalLayouts from "../../../layouts/ModalLayouts";
import EditUser from "../../icons/EditUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../utils/vars";

import { editUser, getUsers } from "../../../apis/users";
import Edit from "../../icons/Edit";
import Loader from "../../Loader";
import Label from "../../Labels";
import ErrorPage from "../../../pages/ErrorPages";

const EditUserModal = ({ isOpen, onClose, userId }) => {
  const formRef = useRef(null);
  const {
    data: userData,
    isLoading: userLoader,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryFn: () => getUsers(`/${userId}`),
    queryKey: ["users", { userId }],
  });

  // use mutation
  const { mutate } = useMutation({
    mutationFn: editUser,
    onError: (error) => toast.error("updatation of user is failed!"),
  });

  var user = undefined;
  var modalContent = <></>;
  if (userLoader) {
    modalContent = <Loader />;
  } else if (!userLoader && isUserError) {
    return <ErrorPage message={userError.message} status={userError.status} />;
  } else if (!userLoader && !isUserError && userData?.length === 0) {
    modalContent = (
      <Label
        message={"not found !"}
        style={{
          background: "#FF9D15",
          border: "2px solid #ff9f1a",

          textTransform: "capitalize",
        }}
      />
    );
  } else {
    user = userData?.at(0);
    modalContent = (
      <form ref={formRef} onSubmit={submitHandler} method="POST">
        <div>
          <input
            type="text"
            name="username"
            placeholder="@ username"
            defaultValue={user?.username}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            defaultValue={user?.email}
          />
        </div>
        <div>
          <input type="password" name="password" placeholder="new password" />
        </div>
        <div>
          <input
            type="password"
            name="cpassword"
            placeholder="confirm new password"
          />
        </div>
        <div className="dropdown-div">
          <select
            name="user_type"
            defaultValue={user?.user_type ? user?.user_type : "null"}
          >
            <option defaultValue={"null"}>User Type</option>
            <option value={"developer"}>Developer</option>
            <option value={"admin"}>Admin</option>
          </select>
        </div>
        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="edit-btn">
            <Edit /> Edit
          </button>
        </div>
      </form>
    );
  }

  // handlers
  async function submitHandler(e) {
    e.preventDefault();
    //
    const formData = new FormData(formRef.current);

    var body = {
      username: formData.get("username"),
      email: formData.get("email"),
      user_type: formData.get("user_type"),
    };

    if (
      formData.get("password").trim().length !== 0 ||
      formData.get("cpassword").trim().length !== 0
    ) {
      if (
        formData.get("password").trim() !== formData.get("cpassword")?.trim()
      ) {
        toast.error("your password doesn't match!");
        return;
      }
      body.password = formData.get("password");
    }

    mutate(
      { apiEndPoint: `/${userId}`, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success("user updated!");
          onClose();
        },
      }
    );
  }

  return (
    <ModalLayouts isOpen={isOpen} onClose={onClose}>
      <div className="edit-user-modal">
        <div className="modal-header">
          Edit <EditUser />
        </div>
        <div className="modal-body">{modalContent}</div>
      </div>
    </ModalLayouts>
  );
};

export default EditUserModal;
