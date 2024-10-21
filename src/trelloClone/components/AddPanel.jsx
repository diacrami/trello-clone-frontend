/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react"
import { Plus, X } from "react-feather";
import { useForm } from "../hooks";
import { TrelloCloneContext } from "../../context";
import { Error } from "./Error";

export const AddPanel = () => {

    const [addPanelModal, setAddPanelModal] = useState(false);

    const { addPanel, boards, active } = useContext(TrelloCloneContext);
    const [titleFound, setTitleFound] = useState(true);

    const { formState, onInputChange, onResetForm, title } = useForm({
        title: '',
    });
    const inputRef = useRef(null);

    const onSubmitTask = (e) => {
        e.preventDefault();

        if (title) {
            if (title.length < 20 && title.trim()!=="") {
                setTitleFound(true)
            } else {
                setTitleFound(false)
                return;
            }
        } else {
            setTitleFound(false)
            return;
        }

        const panel = {
            title,
            bgcolor: "#000000",
            tasks: [],
            order: boards[active].panels.length,
            board: boards[active]._id
        }
        addPanel(panel);
        onResetForm();
        setAddPanelModal(!addPanelModal);
    }

    return (
        <>
            <div className="w-60 h-fit bg-black rounded-md">

                {
                    !addPanelModal && (
                        <>
                            <button
                                className="flex justify-center items-center gap-1 p-3 text-sm"
                                onClick={() => {
                                    setAddPanelModal(!addPanelModal)
                                    setTimeout(() => {
                                        inputRef.current?.focus()
                                    }, 100);
                                }}
                            >
                                <Plus size={15}></Plus>
                                <span> Add a Card</span>
                            </button>
                        </>
                    )
                }
                {
                    addPanelModal && (
                        <>
                            <form
                                onSubmit={onSubmitTask}
                                action=""
                            >

                                <div className="flex flex-col gap-2 p-2">
                                    <input
                                        ref={inputRef}
                                        name="title"
                                        value={title}
                                        onChange={onInputChange}
                                        className="p-1 rounded-md bg-gray-700 border-2 border-gray-900"
                                    />

                                    {/* </input> */}

                                    <div className={`${titleFound ? "hidden " : "bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relativ"}`}>
                                        {

                                            <Error

                                                message={"Debe ingresar un título que debe contener menos de 20 caracteres"}
                                            />

                                        }
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <button
                                            //className={`${title ? "" : "hidden" } w-1/3 border border-cyan-950 rounded-md bg-cyan-700 hover:bg-cyan-500`}
                                            className={` w-1/3 border border-cyan-950 rounded-md bg-cyan-700 hover:bg-cyan-500`}

                                        >
                                            Add Panel
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setAddPanelModal(!addPanelModal) }}
                                        >
                                            <X size={15}></X>
                                        </button>
                                    </div>
                                </div>



                            </form>
                        </>
                    )
                }
            </div>
        </>
    )
}
