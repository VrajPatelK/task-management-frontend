import React, { useRef } from "react";
import "./CreateTaskModal.css";
import ModalLayouts from "../../../layouts/ModalLayouts";
import CreateTask from "../../icons/CreateTask";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../utils/vars";
import { getUsers } from "../../../apis/users";

import moment from "moment";
import Plus from "../../icons/Plus";
import { getLoggedInUser } from "../../../utils/utils";
import { createTask } from "../../../apis/tasks";
import Loader from "../../Loader";
import Label from "../../Labels";
import ErrorPage from "../../../pages/ErrorPages";

const CreateTaskModal = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const loggedInUser = getLoggedInUser();

  const {
    data: usersData,
    isLoading: usersLoader,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryFn: () => getUsers(`/user_type/developer`),
    queryKey: ["users"],
  });

  // use mutation
  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => toast.error("creation of task is failed!"),
  });

  // users content
  var usersContent = <></>;
  if (usersLoader) {
    usersContent = <Loader />;
  } else if (!usersLoader && isUsersError) {
    return (
      <ErrorPage message={usersError.message} status={usersError.status} />
    );
  } else if (!usersLoader && !isUsersError && usersData?.length === 0) {
    usersContent = <Label message={"users do not found !"} />;
  } else {
    usersContent = usersData?.map((user) => {
      return (
        <option value={user.id} key={user.id}>
          {user.id}
        </option>
      );
    });
  }

  // handlers
  async function submitHandler(e) {
    e.preventDefault();
    //
    const formData = new FormData(formRef.current);
    var body = {
      title: formData.get("title"),
      description: formData.get("description"),
      assigned_to: parseInt(formData.get("assigned_to")),
      created_by: loggedInUser?.id,
      status: formData.get("status"),
      deadline: formData.get("deadline"),
    };

    mutate(
      { body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          toast.success("task created!");
          onClose();
        },
      }
    );
  }

  var formatedMinDeadline = `${moment(new Date()).format(
    "YYYY-MM-DD"
  )}T${moment(new Date()).format("hh:mm")}`;

  return (
    <ModalLayouts isOpen={isOpen} onClose={onClose}>
      <div className="create-task-modal">
        <div className="modal-header">
          Create <CreateTask />
        </div>
        <div className="modal-body">
          <form ref={formRef} onSubmit={submitHandler} method="POST">
            <div>
              <input type="text" name="title" placeholder="Title" />
            </div>
            <div className="deadline-div">
              <p>Deadline : </p>
              <input
                type="datetime-local"
                name="deadline"
                min={formatedMinDeadline}
              />
            </div>
            <div>
              <textarea
                name="description"
                rows="4"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="dropdown-div">
              {usersData?.length > 0 ? (
                <select name="assigned_to" defaultValue={"null"}>
                  <option defaultValue={"null"}>Assigned To</option>
                  {usersContent}
                </select>
              ) : (
                <>user data doesn't available</>
              )}
              <select name="status" defaultValue={"null"}>
                <option defaultValue={"null"}>Status</option>
                <option value={"pending"}>pending</option>
                <option value={"in-progress"}>In Progress</option>
                <option value={"completed"}>Completed</option>
              </select>
            </div>
            <div>
              <div className="not-editable-div">
                Created By (Admin ID) : {loggedInUser?.id}
                <span className="not-editable">not editable</span>
              </div>
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

export default CreateTaskModal;
