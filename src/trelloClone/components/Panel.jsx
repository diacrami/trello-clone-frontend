/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Check, ChevronDown, Edit, MoreHorizontal, MoreVertical, Plus, X } from "react-feather"
import { Task } from "./Task";
import { AddTask } from "./AddTask";
import { PanelMenu } from "./PanelMenu";
import { TrelloCloneContext } from "../../context";
import { useForm } from "../hooks";
import { EditPanel } from "./EditPanel";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { DeletePanel } from "./DeletePanel";

export const Panel = ({ panel, blockBehind, setBlockBehind, actualPanel, setActualPanel, confirmDeleteModal, setConfirmDeleteModal }) => {


    const { id, title, bgcolor, tasks, _id } = panel;

    const [collapsePanel, setCollapsePanel] = useState(false);
    const [showPanelMenu, setShowPanelMenu] = useState(false);

    const [showEditPanel, setShowEditPanel] = useState(false);

    const { boards, active, editTask } = useContext(TrelloCloneContext);

    const activeBoard = boards[active];

    const orderTasks = (tasks) => {
        if (tasks.length >= 2) {
            tasks.sort((a, b) => a.order - b.order);
        }
        return tasks
    }

    
    return (
        <>
            <div className="relative">

                <div key={_id} className="relative w-60 h-fit bg-black rounded-md">

                    <EditPanel
                        panel={panel}
                        showEditPanel={showEditPanel}
                        setShowEditPanel={setShowEditPanel}
                        showPanelMenu={showPanelMenu}
                        setShowPanelMenu={setShowPanelMenu}
                    />

                    {
                        !showEditPanel && (
                            <div className="flex flex-row justify-between pt-2 pl-3 pr-3">
                                <h5 className="text-slate-200">{title}</h5>
                                <div className="text-slate-200">
                                    <button
                                        className="hover:bg-slate-800 rounded-md p-1"
                                        onClick={() => setShowPanelMenu(!showPanelMenu)}
                                    //onMouseEnter={() => setShowPanelMenu(!showPanelMenu)}
                                    //onMouseLeave={() => setShowPanelMenu(!showPanelMenu)}
                                    >
                                        <MoreHorizontal size={16}></MoreHorizontal>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {/* max-h-[calc(100vh-17rem)] */}
                    <div className="h-full flex flex-col outline-none resize-none scrollbar-thin scrollbar-webkit gap-0 p-2"> {/*  overflow-x-hidden overflow-y-scroll */}

                        <Droppable droppableId={(panel._id)?.toString()} type="TASK">
                            {(provided, snapshot) => (
                                <div
                                    className="rounded-md py-1"
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                    {...provided.droppableProps}
                                >
                                    {
                                        tasks && orderTasks(tasks).map((task, index) => {

                                            return (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={(task._id)?.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task
                                                                task={task}
                                                                panel={panel}
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

                    </div>
                    <div>
                        <AddTask
                            panel={panel}
                        />
                    </div>
                    {
                        showPanelMenu && (
                            <>
                                <PanelMenu
                                    panel={panel}
                                    showEditPanel={showEditPanel}
                                    setShowEditPanel={setShowEditPanel}
                                    showPanelMenu={showPanelMenu}
                                    setShowPanelMenu={setShowPanelMenu}
                                    confirmDeleteModal={confirmDeleteModal}
                                    setConfirmDeleteModal={setConfirmDeleteModal}
                                    blockBehind={blockBehind}
                                    setBlockBehind={setBlockBehind}
                                />
                            </>
                        )
                    }

                </div>
                {/* <div className="z-40 absolute">
                    <DeletePanel
                        panel={panel}
                        confirmDeleteModal={confirmDeleteModal}
                        setConfirmDeleteModal={setConfirmDeleteModal}
                        showPanelMenu={showPanelMenu}
                        setShowPanelMenu={setShowPanelMenu}

                    />
                </div> */}
                


            </div>
            

        </>
    )
}
