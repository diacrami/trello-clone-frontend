/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { ChevronDown, ChevronUp, Clock, Edit, Trash2 } from "react-feather"
import { TrelloCloneContext } from "../../context";
import { formatDate } from "../helpers";

export const Task = ({ task, panel }) => {

    const { id, _id, title, description, dateStart, dateEnd } = task;

    const [collapseTask, setCollapseTask] = useState(false);
    const { editTaskModal, setEditTaskModal, editTaskInfo, setEditTaskInfo, currentPanel, setCurrentPanel, trelloState, boards, active, setEditPanelInfo } = useContext(TrelloCloneContext);

    const activeBoard = boards[active];


    const handleEditTask = () => {
        setEditTaskModal(!editTaskModal);
        setEditTaskInfo(task);
        setCurrentPanel(panel);
    }

    return (
        <>
            <div className="flex flex-col justify-center p-1 rounded-md bg-gray-700 border-2 border-gray-900">
                <div className="h-full flex flex-row justify-between p-1 rounded-md">

                    <div className="w-4/5 h-full">
                        <p className="w-full h-full text-start break-words text-base p-1">{title}</p>
                    </div>
                    <div className="w-1/5 flex flex-row gap-2">
                        <button onClick={handleEditTask}>
                            <Edit size={16}></Edit>
                        </button>
                        
                        <button
                            className={`${(description || dateStart || dateEnd) ? "text-slate-200" : "text-slate-500"}`}
                            onClick={() => setCollapseTask(!collapseTask)}>
                            <ChevronDown size={16}></ChevronDown>
                        </button>
                    </div>
                </div>
                {
                    collapseTask && (
                        <>
                            <div className="flex flex-col gap-1">
                                {
                                    description &&
                                    <p className="text-start bg-slate-500 rounded-sm p-1 w-full h-full break-words text-base">{description}</p>

                                }
                                <div className="flex flex-row gap-2">
                                    {
                                        dateStart &&
                                        <div className="flex items-center gap-1">
                                            <Clock className="text-green-600" size={15}></Clock>
                                            <span className="text-sm">{formatDate(dateStart)}</span>
                                        </div>
                                    }
                                    {
                                        dateEnd &&
                                        <div className="flex items-center gap-1">
                                            <Clock className="text-red-600" size={15}></Clock>
                                            <span className="text-sm">{formatDate(dateEnd)}</span>
                                        </div>
                                    }
                                </div>

                            </div>
                        </>
                    )
                }
            </div>

        </>
    )
}
