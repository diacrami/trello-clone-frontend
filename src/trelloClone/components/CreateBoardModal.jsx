/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { X } from "react-feather"
import { TrelloCloneContext } from "../../context";
import { useForm } from "../hooks";
import { Error } from "./Error";

export const CreateBoardModal = ({ addBoardModal, setAddBoardModal }) => {

  const { createBoard, trello_id, setactiveBoard, boards } = useContext(TrelloCloneContext);
  const [titleFound, setTitleFound] = useState(true);


  const { formState, title, bgcolor, onInputChange, onResetForm } = useForm({
    title: '',
    bgcolor: '#475569',
  });

  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (title) {
      setTitleFound(true)
    } else {
      setTitleFound(false)
      return;
    }

    let color = `${(bgcolor === '#000000' || bgcolor === '') ? "#475569" : bgcolor}`
    const board = {
      name: title,
      bgcolor: color,
      panels: [],
      trello: trello_id
    }
    createBoard(board);
    setAddBoardModal(!addBoardModal);
  }
  return (
    <>
      <div className="z-30 absolute left-full top-12 w-60 rounded-md bg-gray-700 p-2">
        <button
          className="absolute right-0 p-2"
          onClick={() => setAddBoardModal(!addBoardModal)}
        >
          <X size={15}></X>
        </button>
        <form
          action=""
          onSubmit={handleCreateBoard}
        >
          <div className="flex flex-col gap-2 justify-center items-center p-5">
            <h6>Create Board</h6>
            <img src="https://placehold.co/200x120/png" alt="" />
          </div>
          <div className="w-full flex flex-col gap-2 justify-center items-center pr-5 pl-5">
            <div className="flex flex-col gap-1 justify-center items-start text-slate-900">
              <label className="text-sm text-slate-200" htmlFor="">Title</label>
              <input
                className="p-1"
                type="text"
                name="title"
                value={title}
                onChange={onInputChange}
              />
            </div>
            <div className={`${titleFound ? "hidden " : "w-full bg-red-100 text-sm border border-red-400 text-red-700 px-4 py-1 rounded relative"}`}>
              {

                <Error

                  message={"Debe ingresar un título"}
                />

              }
            </div>
            <div className="w-full flex flex-col gap-1 justify-center items-start">
              <label className="text-sm text-slate-200" htmlFor="">Color</label>
              <input
                className="w-full p-1"
                type="color"
                name="bgcolor"
                value={bgcolor}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center p-2">
              <button
                className="w-1/2 border border-gray-400 rounded-md hover:bg-gray-600"
              >
                Create
              </button>
            </div>
          </div>


        </form>
      </div>
    </>
  )
}
