/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { X } from "react-feather"
import { TrelloCloneContext } from "../../context";
import { useForm } from "../hooks";
import { Error } from "./Error";

export const EditBoardModal = ({editBoardModal, setEditBoardModal}) => {
    const { editBoard, trello_id, boards, active } = useContext(TrelloCloneContext);
    const [titleFound, setTitleFound] = useState(true);
  
    const [editBoardInfo, setEditBoardInfo] = useState(boards[active]);
    const { name, bgcolor } = editBoardInfo;
  
    const handleEditBoard = (e) => {
      e.preventDefault();
      if (name) {
        setTitleFound(true)
      } else {
        setTitleFound(false)
        return;
      }
  
      let color = `${(bgcolor === '#000000' || bgcolor === '') ? "#475569" : bgcolor}`
      editBoard(editBoardInfo);
      setEditBoardModal(!editBoardModal);
    }
    return (
      <>
        <div className="z-50 absolute right-5 w-60 rounded-md bg-gray-700 p-2">
          <button
            className="absolute right-0 p-2"
            onClick={() => setEditBoardModal(!editBoardModal)}
          >
            <X size={15}></X>
          </button>
          <form
            action=""
            onSubmit={handleEditBoard}
          >
            <div className="flex flex-col gap-2 justify-center items-center p-5">
              <h6 className="text-slate-200">Edit Board</h6>
              {/* <img src="https://placehold.co/200x120/png" alt="" /> */}
            </div>
            <div className="w-full flex flex-col gap-2 justify-center items-center pr-5 pl-5">
              <div className="flex flex-col gap-1 justify-center items-start text-slate-900">
                <label className="text-sm text-slate-200" htmlFor="">Title</label>
                <input
                  className="p-1"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setEditBoardInfo({ ...editBoardInfo, name: e.target.value })}
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
                  onChange={(e) => setEditBoardInfo({ ...editBoardInfo, bgcolor: e.target.value })}
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center p-2">
                <button
                  className="w-1/2 text-slate-200 border border-gray-400 bg-gray-900 rounded-md hover:bg-gray-600"
                >
                  Edit
                </button>
              </div>
            </div>
  
  
          </form>
        </div>
      </>
    )
}
