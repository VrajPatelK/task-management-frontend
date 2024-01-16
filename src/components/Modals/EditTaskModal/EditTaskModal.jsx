import React from "react";
import "./EditTaskModal.css";
import ModalLayouts from "../../../layouts/ModalLayouts/ModalLayouts";
import Edit from "../../icons/Edit";

const EditTaskModal = ({ isOpen, onClose, children }) => {
  return (
    <ModalLayouts isOpen={isOpen} onClose={onClose}>
      <div className="edit-task-modal">
        <div className="modal-header">
          Edit Task <Edit />
        </div>
        <div className="modal-body">
          <form>
            <div>
              <input type="text" name="title" placeholder="Title" />
            </div>
            <div>
              <textarea
                name="descripiton"
                rows="8"
                placeholder="Description"
              ></textarea>
            </div>
            <div>
              <select name="" value={null}>
                <option value={null}>Assigned To</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div>
              <div className="created_by">
                created_by
                <span className="not-editable">not editable</span>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="edit-btn">
            Edit <Edit />
          </button>
        </div>
      </div>
    </ModalLayouts>
  );
};

export default EditTaskModal;
