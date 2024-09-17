/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Plus, X } from "react-feather"
import { useForm } from "../hooks";
import { TrelloCloneContext } from "../../context";
import { Error } from "./Error";

export const AddTask = ({ panel }) => {

  const { id } = panel;

  const [addTaskModal, setAddTaskModal] = useState(false);
  const { addTask, trelloState, boards, active } = useContext(TrelloCloneContext);
  const [titleFound, setTitleFound] = useState(true);

  const { formState, onInputChange, onResetForm, title } = useForm({
    title: '',
  })

  const activeBoard = boards[active];



  const onSubmitTask = (e) => {
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

    const task = {
      title,
      description: "",
      dateStart: "",
      dateEnd: "",
      order: panel.tasks.length,
      panel: panel._id
    }

    addTask(task, panel);
    onResetForm();
    setAddTaskModal(!addTaskModal);


  }

  return (
    <>
      {
        !addTaskModal && (
          <>
            <button
              className="flex justify-center items-center gap-1 p-3 text-sm"
              onClick={() => setAddTaskModal(!addTaskModal)}
            >
              <Plus size={15}></Plus>
              <span> Add a Card</span>
            </button>
          </>
        )
      }
      {
        addTaskModal && (
          <>
            <form
              onSubmit={onSubmitTask}
            >

              <div className="flex flex-col gap-2 p-2">
                <textarea
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  className="p-1 rounded-md bg-gray-700 border-2 border-gray-900"
                >

                </textarea>

                <div className={`${titleFound ? "hidden " : "bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative"}`}>
                  {

                    <Error

                      message={"Debe ingresar un título que debe contener menos de 30 caracteres"}
                    />

                  }
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="w-1/3 border border-cyan-950 rounded-md bg-cyan-700 hover:bg-cyan-500"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setAddTaskModal(!addTaskModal) }}
                  >
                    <X size={15}></X>
                  </button>
                </div>
              </div>
            </form>
          </>
        )
      }
    </>
  )
}
