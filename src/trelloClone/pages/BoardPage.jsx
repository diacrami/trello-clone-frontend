/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Boardbar } from "../components/Boardbar"
import { Panel } from "../components/Panel"
import { EditTaskModal } from "../components/EditTaskModal";
import { TrelloCloneContext } from "../../context";
import { AddPanel } from "../components/AddPanel";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { types } from "../types/types";
import { DeletePanel } from "../components/DeletePanel";
//import { ConfirmDeletion } from "../components/ConfirmDeletion";


export const BoardPage = ({ blockBehind, setBlockBehind, blockBehindBoard, setBlockBehindBoard }) => {


    const { actualPanel, setActualPanel, confirmDeleteModalPanel, setConfirmDeleteModalPanel, loading, editTask, editPanel, editTaskModal, boards, active, trelloState } = useContext(TrelloCloneContext);

    const activeBoard = boards ? boards[active] : "";


    function onDragEnd(res) {
        if (res.type === types.task) {
            if (!res.destination) {
                console.log("No destination");
                return;
            }
            const newPanels = [...activeBoard.panels];
            const s_id = res.source.droppableId;
            const d_id = res.destination.droppableId;
            const panel1 = newPanels.filter((panel) => panel._id === s_id)[0];
            const panel2 = newPanels.filter((panel) => panel._id === d_id)[0];

            const [removed] = [...panel1.tasks.splice(res.source.index, 1)];
            panel2.tasks.splice(res.destination.index, 0, removed);

            panel1.tasks.forEach(task => {
                task.order = panel1.tasks.indexOf(task);
                task.panel = panel1._id;
                editTask(task, panel1);
            });
            panel2.tasks.forEach(task => {
                task.order = panel2.tasks.indexOf(task);
                task.panel = panel2._id;
                editTask(task, panel2);
            });


            activeBoard.panels = newPanels;

            let data = { active: active, boards: boards }

        } else if (res.type === types.panel) {
            if (!res.destination) {
                console.log("No destination");
                return;
            }
            const newPanels = [...activeBoard.panels];

            const [removed] = newPanels.splice(res.source.index, 1);
            newPanels.splice(res.destination.index, 0, removed);


            newPanels.forEach(panel => {
                panel.order = newPanels.indexOf(panel);
                panel.board = newPanels._id;
                editPanel(panel);
            });


            activeBoard.panels = newPanels;
        }

    }

    const orderPanels = (panels) => {
        if (panels.length >= 2) {
            panels.sort((a, b) => a.order - b.order);
        }
        return panels
    }

    return (
        <>
            <div className="w-full h-[calc(100vh-6rem)] relative">
                <Boardbar
                    blockBehindBoard={blockBehindBoard}
                    setBlockBehindBoard={setBlockBehindBoard}
                    blockBehind={blockBehind}
                    setBlockBehind={setBlockBehind}
                />
                {
                    !loading && <>
                        <div className={`${editTaskModal ? "overflow-hidden" : "overflow-scroll scrollbar-thin scrollbar-webkit"} h-full relative`} style={{ backgroundColor: `${activeBoard?.bgcolor}` }}>
                            <DragDropContext onDragEnd={onDragEnd}>

                                <div className={`z-20 ${editTaskModal ? "opacity-50" : "opacity-100"} absolute flex gap-3 flex-shrink-0 text-slate-200 p-2`}>

                                    <Droppable droppableId={activeBoard?._id?.toString()} type="PANEL" direction="horizontal">
                                        {(provided, snapshot) => (
                                            <div
                                                className="flex gap-3 flex-shrink-0"
                                                ref={provided.innerRef}
                                                style={{ backgroundColor: snapshot.isDraggingOver ? 'transparent' : 'transparent' }}
                                                {...provided.droppableProps}
                                            >
                                                {
                                                    activeBoard?.panels && orderPanels(activeBoard?.panels).map((panel, index) => {

                                                        return (

                                                            <Draggable
                                                                // adding a key is important!
                                                                key={panel._id}
                                                                draggableId={(panel._id)?.toString()}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <Panel
                                                                            panel={panel}
                                                                            actualPanel={actualPanel}
                                                                            setActualPanel={setActualPanel}
                                                                            blockBehind={blockBehind}
                                                                            setBlockBehind={setBlockBehind}
                                                                            blockBehindBoard={blockBehindBoard}
                                                                            setBlockBehindBoard={setBlockBehindBoard}
                                                                            //showPanelMenu={showPanelMenu}
                                                                            //setShowPanelMenu={setShowPanelMenu}
                                                                            confirmDeleteModal={confirmDeleteModalPanel}
                                                                            setConfirmDeleteModal={setConfirmDeleteModalPanel}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>

                                                        )
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>



                                    <div>
                                        <AddPanel />
                                    </div>

                                </div>
                            </DragDropContext>
                            {
                                editTaskModal && (
                                    <>
                                        {/* h-full w-full sm:h-1/2 sm:w-[50%] md:w-1/4 */}
                                        <div className={`z-40 w-96 h-full absolute left-[40%] bg-transparent`}>
                                            <EditTaskModal
                                                blockBehindBoard={blockBehindBoard}
                                                setBlockBehindBoard={setBlockBehindBoard}
                                                blockBehind={blockBehind}
                                                setBlockBehind={setBlockBehind}
                                            />
                                            <div className={`w-96 h-auto absolute top-0 bg-slate-600 ${editTaskModal ? "block opacity-50" : "hidden"}`}>

                                            </div>
                                        </div>

                                    </>
                                )
                            }
                            <div className="z-40 absolute">
                                <DeletePanel
                                    panel={actualPanel}
                                    confirmDeleteModal={confirmDeleteModalPanel}
                                    setConfirmDeleteModal={setConfirmDeleteModalPanel}
                                    blockBehind={blockBehind}
                                    setBlockBehind={setBlockBehind}
                                    blockBehindBoard={blockBehindBoard}
                                    setBlockBehindBoard={setBlockBehindBoard}
                                />
                            </div>

                            <div className={`z-30 h-full w-full relative bg-white ${(editTaskModal || blockBehind || blockBehindBoard) ? "opacity-10" : "hidden"}`}>

                            </div>
                        </div>
                    </>
                }
                {
                    loading &&
                    <>

                        <div role="status" className="absolute left-[40%] top-[50%] flex flex-col items-center gap-1">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            {/* <p className="text-center text-slate-200">Loading, please wait...</p> */}
                            <p className="text-center text-slate-200">Server is starting up, please wait...</p>

                            <span className="sr-only">Loading...</span>
                        </div>

                    </>
                }
            </div>


        </>
    )
}
