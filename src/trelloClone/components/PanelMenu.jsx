/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { TrelloCloneContext } from "../../context";

export const PanelMenu = ({ panel, showEditPanel, setShowEditPanel, showPanelMenu, setShowPanelMenu, confirmDeleteModal, setConfirmDeleteModal, blockBehind, setBlockBehind }) => {

  const { setActualPanel } = useContext(TrelloCloneContext);


  const handleDelete = () => {
    setActualPanel(panel);
    setBlockBehind(true);
    setConfirmDeleteModal(!confirmDeleteModal);
    setShowPanelMenu(!showPanelMenu);
  }



  const handleEdit = () => {
    setShowEditPanel(!showEditPanel);
    setShowPanelMenu(!showPanelMenu);

  }

  return (
    <>
      <div className="absolute w-1/2 top-10 right-2 text-sm bg-black border border-gray-700 rounded-md p-2">
        <div className="border-b border-b-gray-600 p-1 hover:cursor-pointer">
          <button onClick={handleEdit}>
            <span>Edit</span>
          </button>
        </div>
        <div className="p-1 hover:cursor-pointer">
          <button onClick={handleDelete}>
            <span>Delete</span>
          </button>
        </div>

      </div>
    </>
  )
}
