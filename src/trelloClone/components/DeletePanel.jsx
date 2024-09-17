/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ConfirmDeletion } from "./ConfirmDeletion";
import { TrelloCloneContext } from "../../context";

export const DeletePanel = ({ panel, confirmDeleteModal, setConfirmDeleteModal, blockBehind, setBlockBehind, blockBehindBoard, setBlockBehindBoard }) => {

  const { deletePanel } = useContext(TrelloCloneContext);

  const deleteElement = () => {
    deletePanel(panel);
  }
  return (
    <>
      {
        confirmDeleteModal &&
        <>
          <div className="z-50 w-96 h-fit top-[30%] fixed left-[45%] bg-transparent">
            <ConfirmDeletion
              deleteElement={deleteElement}
              confirmDeleteModal={confirmDeleteModal}
              setConfirmDeleteModal={setConfirmDeleteModal}
              blockBehind={blockBehind}
              setBlockBehind={setBlockBehind}
              blockBehindBoard={setBlockBehindBoard}
              setBlockBehindBoard={setBlockBehindBoard}
            />
          </div>

        </>
      }
    </>
  )
}
