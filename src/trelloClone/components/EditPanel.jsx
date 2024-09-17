/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Check, MoreHorizontal, X } from "react-feather"
import { useForm } from "../hooks"
import { useContext, useState } from "react"
import { TrelloCloneContext } from "../../context"
import { Error } from "./Error"

export const EditPanel = ({ panelMenu, setPanelMenu, showEditPanel, setShowEditPanel, panel }) => {

    const { editPanel } = useContext(TrelloCloneContext);


    const [editPanelInfo, setEditPanelInfo] = useState(panel);
    const { id, title, bgcolor, tasks } = editPanelInfo;
    const [titleFound, setTitleFound] = useState(true);
    let mensaje="Debe ingresar un título que debe contener menos de 20 caracteres";
    const onHandleEdit = () => {
        if (title) {
            if (title.length < 20) {
                setTitleFound(true)
            } else {
                setTitleFound(false)
                return;
            }
        } else {
            setTitleFound(false)
            return;
        }
        editPanel(editPanelInfo);
        setShowEditPanel(!showEditPanel)
    }

    return (
        <>
            {
                showEditPanel && (
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 justify-between p-3">
                            <textarea
                                className="p-1 rounded-md text-gray-900 resize-none"
                                name="title"
                                value={title}
                                onChange={(e) => setEditPanelInfo({ ...editPanelInfo, title: e.target.value })}
                                id=""
                                rows={1}
                            >

                            </textarea>

                            <div className="flex flex-row gap-0.5 text-slate-200">
                                <button
                                    className="hover:bg-slate-800 rounded-md p-1"
                                    onClick={onHandleEdit}
                                >
                                    <Check size={16}></Check>
                                </button>
                                <button
                                    className="hover:bg-slate-800 rounded-md p-1"
                                    onClick={() => { setEditPanelInfo(panel); setShowEditPanel(!showEditPanel) }}
                                >
                                    <X size={16}></X>
                                </button>
                            </div>

                        </div>
                        <div className={`${titleFound ? "hidden " : "bg-red-100 border border-red-400 text-red-700 mx-3 px-4 py-1 rounded relativ"}`}>
                            {

                                <Error

                                    message={mensaje}
                                />

                            }
                        </div>
                    </div>

                )
            }
        </>
    )
}
