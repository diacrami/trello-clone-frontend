/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* import { useContext } from "react";
import { TrelloCloneContext } from "../../context"; */

export const ConfirmDeletion = ({ confirmDeleteModal, setConfirmDeleteModal, deleteElement, blockBehind, setBlockBehind, blockBehindBoard, setBlockBehindBoard  }) => {



    const handleDeletion = (deleteEl) => {

        if(deleteEl){
            deleteElement();
            setBlockBehind(false);
            setBlockBehindBoard(false);
            setConfirmDeleteModal(!confirmDeleteModal);
            
        }else{
            setConfirmDeleteModal(!confirmDeleteModal);
            setBlockBehind(false);
            setBlockBehindBoard(false);

        }


    }


    return (
        <>
            <div className="w-96 h-60 flex flex-col justify-center gap-5 items-center bg-black text-slate-200 rounded-md">
                <span>Are you sure you want to delete this?</span>
                <div className="w-full h-fit flex flex-row gap-5 justify-center items-center">
                    <button
                        onClick={() => handleDeletion(true)}
                        className="w-1/3 border border-cyan-950 rounded-md bg-cyan-700 hover:bg-cyan-500">
                        Yes
                    </button>
                    <button
                        onClick={() => handleDeletion(false)}
                        className="w-1/3 border border-cyan-950 rounded-md bg-cyan-700 hover:bg-cyan-500">
                        No
                    </button>
                </div>
            </div>
        </>
    )
}
