/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { ChevronLeft, ChevronRight, Edit, Plus } from "react-feather"
import { CreateBoardModal } from "../../trelloClone/components/CreateBoardModal";
import { TrelloCloneContext } from "../../context";
import { EditBoardModal } from "../../trelloClone/components/EditBoardModal";

export const Sidebar = ({ blockBehind, setBlockBehind, blockBehindBoard, setBlockBehindBoard }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [addBoardModal, setAddBoardModal] = useState(false);



    const { boards, active, setactiveBoard, editBoardModal, setEditBoardModal, confirmDeleteModalBoard, confirmDeleteModalPanel, setConfirmDeleteModalPanel, setConfirmDeleteModalBoard, editTaskModal, setEditTaskModal } = useContext(TrelloCloneContext);


    const setActiveBoard = (e, index) => {

        setactiveBoard(index);
        setEditBoardModal(false)
        setEditTaskModal(false)
        setConfirmDeleteModalBoard(false)
        setConfirmDeleteModalPanel(false)
        setBlockBehind(false)
        setBlockBehindBoard(false)
    }

    return (
        <>
            <div className={`relative ${collapsed ? "w-20" : "w-56"}  h-[calc(100vh-3rem)] bg-gray-800 text-slate-200 transition-all ease-linear duration-500 flex-shrink-0 `}>
                {
                    collapsed && (
                        <>
                            <div className="h-[3rem] flex flex-row align-center justify-center border-b border-b-gray-600 p-2">
                                <button onClick={() => setCollapsed(!collapsed)} >
                                    <ChevronRight className="self-center" size={20}></ChevronRight>
                                </button>
                            </div>
                            <div className="h-[calc(100vh-6rem)] flex flex-col gap-3 ">
                                <div className="flex justify-center items-center text-base">
                                    <button title="Create Board" onClick={() => setAddBoardModal(!addBoardModal)}>
                                        <Plus size={15}></Plus>
                                    </button>
                                </div>
                                <div className="h-full flex flex-col gap-3 p-2 overflow-y-scroll scrollbar-thin scrollbar-webkit">

                                    {
                                        boards && boards.map((board, index) => {

                                            return (
                                                <div key={board._id} className="flex flex-col justify-center text-sm pl-2"> {/*  pt-5 */}
                                                    <button onClick={(e) => setActiveBoard(e, index)} title={board.name} className="h-full flex flex-row gap-2 justify-center items-center">
                                                        <span className="h-5 w-5 rounded-sm" style={{ backgroundColor: board.bgcolor }}>&nbsp;</span>
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        </>
                    )
                }
                {
                    !collapsed && (
                        <>
                            <div className="h-[3rem] flex flex-row align-center justify-between border-b border-b-gray-600 p-2">
                                <h4 className="self-center">Workspace</h4>
                                <button onClick={() => setCollapsed(!collapsed)} >
                                    <ChevronLeft className="self-center" size={20}></ChevronLeft>
                                </button>
                            </div>
                            <div className="h-[calc(100vh-6rem)] flex flex-col gap-3">
                                <div className="flex justify-between text-base p-2">
                                    <h5>Your Boards</h5>
                                    <button onClick={() => setAddBoardModal(!addBoardModal)}>
                                        <Plus size={15}></Plus>
                                    </button>
                                </div>
                                <div className="h-full flex flex-col gap-3 pl-4 pb-2 overflow-y-scroll scrollbar-thin scrollbar-webkit">

                                    {
                                        boards && boards.map((board, index) => {

                                            return (
                                                <div onClick={(e) => setActiveBoard(e, index)} key={board._id} className="text-sm flex flex-row justify-between items-center hover:cursor-pointer">
                                                    <div className="h-full flex flex-row gap-2 justify-center items-center">
                                                        <span className="h-5 w-5 rounded-sm" style={{ backgroundColor: `${board.bgcolor}` }}>&nbsp;</span>
                                                        <span>{board.name}</span>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )

                }
                {
                    addBoardModal && (
                        <>
                            <CreateBoardModal
                                addBoardModal={addBoardModal}
                                setAddBoardModal={setAddBoardModal}
                            />
                        </>
                    )
                }

            </div>
        </>
    )
}
