import React, { useRef, useState } from "react";
import "./CreateUserModal.css";
import ModalLayouts from "../../../layouts/ModalLayouts";
import CreateUser from "../../icons/CreateUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../utils/vars";

import Plus from "../../icons/Plus";
import { createUser } from "../../../apis/users";
import ImageUpload from "../../ImageUpload";

const CreateUserModal = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [newimgurl, setNewimgurl] = useState(undefined);

  // use mutation
  const { mutate } = useMutation({
    mutationFn: createUser,
    onError: (error) => toast.error("creation of user is failed!"),
  });

  // handlers
  async function submitHandler(e) {
    e.preventDefault();
    //
    const formData = new FormData(formRef.current);

    if (formData.get("password").trim() !== formData.get("cpassword")?.trim()) {
      toast.error("your password doesn't match!");
      return;
    }
    var body = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      user_type: formData.get("user_type"),
      profile_img: newimgurl,
    };
    mutate(
      { body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success("user created!");
          onClose();
        },
      }
    );
  }

  return (
    <ModalLayouts isOpen={isOpen} onClose={onClose}>
      <div className="create-user-modal">
        <div className="modal-header">
          Create <CreateUser />
        </div>
        <div className="modal-body">
          <form ref={formRef} onSubmit={submitHandler} method="POST">
            <ImageUpload
              onImageUpload={(u) => setNewimgurl(u)}
              onImageRemove={() => setNewimgurl(undefined)}
            />
            <div>
              <input type="text" name="username" placeholder="@ username" />
            </div>
            <div>
              <input type="email" name="email" placeholder="abc@gmail.com" />
            </div>
            <div>
              <input type="password" name="password" placeholder="password" />
            </div>
            <div>
              <input
                type="password"
                name="cpassword"
                placeholder="confirm password"
              />
            </div>

            <div className="dropdown-div">
              <select name="user_type" defaultValue={"null"}>
                <option defaultValue={"null"}>User Type</option>
                <option value={"developer"}>Developer</option>
                <option value={"admin"}>Admin</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="create-btn">
                <Plus /> Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalLayouts>
  );
};

export default CreateUserModal;
