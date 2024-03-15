import React, { useState } from "react";
import "./UserCard.css";
import UserCardLayout from "../../layouts/UserCardLayout";
import ProfileImg from "../ProfileImg";
import OptionsLayout from "../../layouts/OptionsLayout";
import OptionBtn from "../Options/OptionBtn";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import Dots3 from "../icons/Dots3";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../utils/vars";
import toast from "react-hot-toast";
import { deleteUser } from "../../apis/users";
import { Link } from "react-router-dom";
import EditUserModal from "../Modals/EditUserModal";
import ThemeBadge from "../Badges/ThemeBadge";

const UserCard = ({
  userId,
  src,
  email,
  username,
  user_type,
  displayEditDelete = true,
}) => {
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onError: (error) => toast.error("deletion of user is failed!"),
  });

  // modal states
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // handlers
  async function userDeleteHandler() {
    mutate(`/${userId}`, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("user deleted!");
      },
    });
  }

  return (
    <>
      <EditUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userId={userId}
      />
      <UserCardLayout>
        <div className="profile-img-div">
          <ProfileImg src={src} alt={username} />
        </div>
        <div className="user-details">
          <Link to={`/users/${userId}`}>
            <div className="username">
              <span>@</span>
              {username}
            </div>
          </Link>
          <div className="email">{email}</div>
          <div className="userTypeDiv">
            <ThemeBadge theme={user_type === "admin" ? "danger" : "primary"}>
              {user_type}
            </ThemeBadge>
          </div>

          {/* edit & delete options */}
          {displayEditDelete && (
            <div className="button-grp">
              <OptionsLayout title={<Dots3></Dots3>}>
                <OptionBtn className="edit-btn" onAction={openModal}>
                  Edit
                  <Edit />
                </OptionBtn>
                <OptionBtn className="delete-btn" onAction={userDeleteHandler}>
                  Delete
                  <Delete />
                </OptionBtn>
              </OptionsLayout>
            </div>
          )}
        </div>
      </UserCardLayout>
    </>
  );
};

export default UserCard;
