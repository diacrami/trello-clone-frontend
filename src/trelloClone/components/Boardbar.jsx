/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { TrelloCloneContext } from "../../context";
import { Edit, Trash2 } from "react-feather";
import { EditBoardModal } from "./EditBoardModal";
import { ConfirmDeletion } from "./ConfirmDeletion";

export const Boardbar = ({ blockBehind, setBlockBehind,blockBehindBoard, setBlockBehindBoard }) => {

    const { boards, active,confirmDeleteModalBoard, setConfirmDeleteModalBoard, editBoardModal, setEditBoardModal, deleteBoard } = useContext(TrelloCloneContext);

    const activeBoard = boards ? boards[active] : "";

    const handleDelete = () => {
        setBlockBehindBoard(true);
        setConfirmDeleteModalBoard(!confirmDeleteModalBoard);
    }

    const deleteElement = () => {
        setConfirmDeleteModalBoard(!confirmDeleteModalBoard);
        deleteBoard(activeBoard);

    }

    return (
        <>
            <div>
                <div className="h-[3rem] flex items-center p-2 bg-slate-800 opacity-70 justify-between">
                    <h2 className="text-slate-100">{activeBoard?.name}</h2>
                    <div className="flex flex-row">
                        <button onClick={() => setEditBoardModal(!editBoardModal)} className="text-slate-100 h-full flex flex-row gap-2 justify-center items-center mr-5">
                            <Edit style={{ fontWeight: "bold" }} size={20}></Edit>
                        </button>
                        <button onClick={handleDelete} className="text-slate-100 h-full flex flex-row gap-2 justify-center items-center mr-5">
                            <Trash2 style={{ fontWeight: "bold" }} size={20}></Trash2>
                        </button>
                    </div>

                </div>
                <div className="relative z-50 ">
                    {
                        editBoardModal && (
                            <>
                                <EditBoardModal
                                    editBoardModal={editBoardModal}
                                    setEditBoardModal={setEditBoardModal}
                                />
                            </>
                        )
                    }
                </div>
                <div className="relative z-50">
                    {
                        confirmDeleteModalBoard &&
                        <>
                            <div className="z-40 w-96 h-fit top-[30%] fixed left-[45%] bg-transparent">
                                <ConfirmDeletion
                                    deleteElement={deleteElement}
                                    confirmDeleteModal={confirmDeleteModalBoard}
                                    setConfirmDeleteModal={setConfirmDeleteModalBoard}
                                    blockBehindBoard={setBlockBehindBoard}
                                    setBlockBehindBoard={setBlockBehindBoard}
                                    blockBehind={blockBehind}
                                    setBlockBehind={setBlockBehind}
                                />
                            </div>

                        </>
                    }

                </div>

            </div>
        </>
    )
}
