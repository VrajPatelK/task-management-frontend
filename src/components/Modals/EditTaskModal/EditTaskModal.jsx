import React, { useRef } from "react";
import "./EditTaskModal.css";
import ModalLayouts from "../../../layouts/ModalLayouts/ModalLayouts";
import Edit from "../../icons/Edit";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../utils/vars";
import { getTasks, updateTask } from "../../../apis/tasks";
import moment from "moment";
import { getUsers } from "../../../apis/users";

const EditTaskModal = ({ isOpen, onClose, taskId }) => {
  const formRef = useRef(null);

  const {
    data: taskData,
    isPending: isTaskPending,
    isError: isTaskError,
    error: taskError,
  } = useQuery({
    queryFn: () => getTasks(`/${taskId}`),
    queryKey: ["task", { taskId }],
  });

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
    mutationFn: updateTask,
  });

  if (usersLoader) {
    return <div>Loading user data...</div>;
  }
  if (!usersLoader && isUsersError) {
    return <div>{usersError}</div>;
  }
  if (!usersLoader && !isUsersError && usersData.length === 0) {
    return <div>user does not found</div>;
  }

  if (isTaskPending) {
    return <div>Loading tasks data...</div>;
  }
  if (!isTaskPending && isTaskError) {
    return <div>{taskError.message}</div>;
  }
  if (!isTaskPending && !isTaskError && taskData?.length === 0) {
    return <div></div>;
  }

  var task = taskData?.at(0);

  // handlers
  async function changeTaskHandler() {
    //
    const formData = new FormData(formRef.current);
    var body = {
      title: formData.get("title"),
      description: formData.get("description"),
      assigned_to: parseInt(formData.get("assigned_to")),
      status: formData.get("status"),
      deadline: formData.get("deadline"),
    };

    mutate(
      { apiEndPoint: `/${taskId}`, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          toast.success("task updated!");
          onClose();
        },
      }
    );
  }
  var formatedDeadline = `${moment(task?.deadline).format(
    "YYYY-MM-DD"
  )}T${moment(task?.deadline).format("hh:mm")}`;
  var formatedMinDeadline = `${moment(new Date()).format(
    "YYYY-MM-DD"
  )}T${moment(new Date()).format("hh:mm")}`;

  return (
    <ModalLayouts isOpen={isOpen} onClose={onClose}>
      <div className="edit-task-modal">
        <div className="modal-header">
          Edit Task <Edit />
        </div>
        <div className="modal-body">
          <form ref={formRef}>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={task?.title}
              />
            </div>
            <div className="deadline-div">
              <p>Deadline : </p>
              <input
                type="datetime-local"
                name="deadline"
                defaultValue={formatedDeadline}
                min={formatedMinDeadline}
              />
            </div>
            <div>
              <textarea
                name="description"
                rows="4"
                placeholder="Description"
                defaultValue={task?.description}
              ></textarea>
            </div>
            <div>
              {usersData?.length > 0 ? (
                <select
                  name="assigned_to"
                  defaultValue={task?.assigned_to ? task?.assigned_to : "null"}
                >
                  <option defaultValue={"null"}>Assigned To</option>
                  {usersData?.map((user) => {
                    return (
                      <option value={user.id} key={user.id}>
                        {user.id}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <>user data doesn't available</>
              )}
            </div>
            <div>
              <select
                name="status"
                defaultValue={task?.status ? task?.status : "null"}
              >
                <option defaultValue={"null"}>Status</option>
                <option value={"pending"}>pending</option>
                <option value={"in-progress"}>In Progress</option>
                <option value={"completed"}>Completed</option>
              </select>
            </div>
            <div>
              <div className="not-editable-div">
                {task?.created_by}
                <span className="not-editable">not editable</span>
              </div>
            </div>
            <div>
              <div className="not-editable-div">
                {moment(task?.created_at).format("MMMM D, YYYY") +
                  ` (${moment(task?.created_at).fromNow()})`}
                <span className="not-editable">not editable</span>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="edit-btn"
            onClick={changeTaskHandler}
          >
            Edit <Edit />
          </button>
        </div>
      </div>
    </ModalLayouts>
  );
};

export default EditTaskModal;
