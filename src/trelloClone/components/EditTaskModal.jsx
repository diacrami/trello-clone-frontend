/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { X } from "react-feather"
import { TrelloCloneContext } from "../../context"
import { ConfirmDeletion } from "./ConfirmDeletion";
import { Error } from "./Error";

export const EditTaskModal = ({ blockBehind, setBlockBehind, blockBehindBoard, setBlockBehindBoard }) => {

    const { boards, active, editTask, deleteTask, currentPanel, editTaskInfo, setEditTaskInfo, editTaskModal, setEditTaskModal } = useContext(TrelloCloneContext);


    const { id, title, description, dateStart, dateEnd } = editTaskInfo;
    const activeBoard = boards[active];
    const [titleFound, setTitleFound] = useState(true);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    //const actualPanel = activeBoard.panels.filter((panel) => panel.id===ed);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (title) {
            if (title.length < 30) {
                setTitleFound(true)
            } else {
                setTitleFound(false)
                return;
            }
        } else {
            setTitleFound(false)
            return;
        }

        editTask(editTaskInfo, currentPanel);
        setEditTaskModal(!editTaskModal);

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setConfirmDeleteModal(!confirmDeleteModal);
    }

    const deleteElement = () => {
        deleteTask(editTaskInfo, currentPanel);
        setEditTaskModal(!editTaskModal);
    }

    return (
        <>{/* onMouseLeave={() => setShowPanelMenu(!showPanelMenu)} */}
            <div className="z-20 relative h-auto w-full flex flex-col gap-3 flex-shrink-0 rounded-md bg-black p-5 text-slate-200">
                <form
                    action=""
                //onSubmit={handleSubmit}
                >

                    <div className="flex flex-row justify-end">
                        <button className="text-slate-200" onClick={() => setEditTaskModal(false)}>
                            <X size={15}></X>
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <h1 className="text-slate-200">Edit Task</h1>

                    </div>{/* placeholder="Esta es una descripción" */}
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex flex-col gap-1 justify-center items-start">
                            <label className="w-full text-sm" htmlFor="">Title</label>
                            <textarea
                                className="resize-none w-full p-1 rounded-md bg-gray-700 border-2 border-gray-900"
                                name="title"
                                id=""
                                rows={1}
                                value={title}
                                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, title: e.target.value })}
                            >
                            </textarea>
                            <div className={`${titleFound ? "hidden " : "w-full bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative"}`}>
                                {

                                    <Error

                                        message={"Debe ingresar un título que debe contener menos de 30 caracteres"}
                                    />

                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 justify-center items-start">
                            <label className="w-full text-sm" htmlFor="">Description</label>
                            <textarea
                                className="w-full bg-slate-500"
                                name="description"
                                id=""
                                rows={7}
                                value={description}
                                onChange={(e) => setEditTaskInfo({ ...editTaskInfo, description: e.target.value })}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-3">
                            <div className="w-full flex flex-col gap-1 justify-center items-start">
                                <label className="w-full text-sm" htmlFor="">Date Start</label>
                                <input
                                    className="w-full p-1 rounded-md bg-slate-500"
                                    name="dateStart"
                                    type="date"
                                    value={dateStart}
                                    onChange={(e) => setEditTaskInfo({ ...editTaskInfo, dateStart: e.target.value })}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1 justify-center items-start">
                                <label className="w-full text-sm" htmlFor="">Date End</label>
                                <input
                                    className="w-full p-1 rounded-md bg-slate-500"
                                    type="date"
                                    name="dateEnd"
                                    value={dateEnd}
                                    onChange={(e) => setEditTaskInfo({ ...editTaskInfo, dateEnd: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="flex flex-shrink-0 gap-5 justify-evenly pt-4">
                            <button
                                className="w-1/4 border p-1 rounded-md"
                                onClick={handleSubmit}
                            >
                                Done
                            </button>
                            <button
                                className="w-1/4 border p-1 rounded-md overflow-hidden text-nowrap text-ellipsis"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </form>

                {
                    confirmDeleteModal &&
                    <>
                        <div className="z-40 w-96 h-fit top-[20%] absolute left-0 bg-transparent">
                            <ConfirmDeletion
                                deleteElement={deleteElement}
                                confirmDeleteModal={confirmDeleteModal}
                                setConfirmDeleteModal={setConfirmDeleteModal}
                                blockBehindBoard={blockBehindBoard}
                                setBlockBehindBoard={setBlockBehindBoard}
                                blockBehind={blockBehind}
                                setBlockBehind={setBlockBehind}
                            />
                        </div>

                    </>
                }

                <div className={`z-30 h-full w-full absolute top-0 left-0 bg-white ${confirmDeleteModal ? "opacity-10" : "hidden"}`}>

                </div>
            </div>
        </>
    )
}
