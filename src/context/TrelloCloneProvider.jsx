/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react";
import { TrelloCloneContext } from "./TrelloCloneContext"
import { types } from "../types/types";
import { trelloCloneReducer } from "./trelloCloneReducer";
import Swal from 'sweetalert2';



export const TrelloCloneProvider = ({ children }) => {

  const [editTaskModal, setEditTaskModal] = useState(false);
  const [editTaskInfo, setEditTaskInfo] = useState({});
  const [editBoardModal, setEditBoardModal] = useState(false);
  const [confirmDeleteModalBoard, setConfirmDeleteModalBoard] = useState(false);
  const [confirmDeleteModalPanel, setConfirmDeleteModalPanel] = useState(false);
  const [actualPanel, setActualPanel] = useState({});
  const [currentPanel, setCurrentPanel] = useState({});
  const [loading, setLoading] = useState(true);

  const [trelloState, dispatch] = useReducer(trelloCloneReducer, {});

  const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;



  useEffect(() => {

    fetch(`${url}trello/`).then((res) =>
      res.json()
    ).then((boardData) => {

      initState(boardData);

    }).catch(error => {
      Swal.fire({
        title: "Lo siento, ha ocurrido un error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    })

  }, [])

  const initState = (boardData) => {
    const activeBoard = localStorage.getItem("activeBoard") || 0
    if (!activeBoard) {
      localStorage.setItem("activeBoard", 0)
    }

    const action = {
      type: types.chargeData,
      payload: boardData,
      active: activeBoard
    }
    dispatch(action)
    setLoading(false);
  }

  const addTask = (task = {}, panel) => {
    fetch(`${url}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(taskData => {
        const action = {
          type: types.addTask,
          payload: taskData,
          panel,
          index: panel.tasks.length ? panel.tasks.length : 0,
        }
        dispatch(action);
      });




  }

  const setactiveBoard = (activeBoard) => {
    localStorage.setItem("activeBoard", activeBoard);
    const action = {
      type: types.activeBoard,
      payload: activeBoard,
    }

    dispatch(action);
  }

  const editTask = (task = {}, panel) => {
    fetch(`${url}task/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(taskData => {
        const action = {
          type: types.editTask,
          payload: task,
          panel,
        }

        dispatch(action);
      });
  }

  const deleteTask = (task = {}, panel) => {
    fetch(`${url}task/${task._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deleteData) => {
        const action = {
          type: types.deleteTask,
          payload: task,
          panel,
        }
        dispatch(action);
      })


  }

  const addPanel = (panel = {}) => {


    fetch(`${url}/panel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(panel),
    })
      .then(response => response.json())
      .then((panelData) => {
        const action = {
          type: types.addPanel,
          payload: panelData,
          index: trelloState.boards[trelloState.active].panels.length,
        }

        dispatch(action);
      })
  }

  const editPanel = (panel = {}) => {

    fetch(`${url}panel/${panel._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(panel),
    })
      .then(response => response.json())
      .then((panelData) => {
        const action = {
          type: types.editPanel,
          payload: panel,

        }
        dispatch(action);
      })

  }

  const deletePanel = (panel = {}) => {

    fetch(`${url}panel/${panel._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deletedPanel) => {
        const action = {
          type: types.deletePanel,
          payload: panel,
        }
        dispatch(action);
      })

  }

  const createBoard = (board = {}) => {

    fetch(`${url}board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    })
      .then(response => response.json())
      .then((boardData) => {
        const action = {
          type: types.createBoard,
          payload: boardData,
        }
        setactiveBoard(trelloState.boards.length);
        dispatch(action);
      })


  }

  const editBoard = (board = {}) => {

    fetch(`${url}board/${board._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    })
      .then(response => response.json())
      .then((boardData) => {
        const action = {
          type: types.editBoard,
          payload: board,
        }

        dispatch(action);
      })


  }

  const deleteBoard = (board = {}) => {
    fetch(`${url}board/${board._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deletedBoard) => {
        const action = {
          type: types.deleteBoard,
          payload: board
        }

        dispatch(action)
        setactiveBoard(localStorage.getItem("activeBoard") - 1);
      })
  }


  return (
    <TrelloCloneContext.Provider value={{
      ...trelloState,
      loading,

      setactiveBoard: setactiveBoard,
      currentPanel, setCurrentPanel,

      createBoard: createBoard,
      editBoard: editBoard,
      deleteBoard: deleteBoard,

      addPanel: addPanel,
      editPanel: editPanel,
      deletePanel: deletePanel,

      addTask: addTask,
      editTask: editTask,
      deleteTask: deleteTask,

      editTaskInfo,
      setEditTaskInfo,


      editTaskModal,
      setEditTaskModal,

      editBoardModal, setEditBoardModal,
      confirmDeleteModalBoard, setConfirmDeleteModalBoard,
      confirmDeleteModalPanel, setConfirmDeleteModalPanel,

      actualPanel,
      setActualPanel,

    }}
    >
      {children}
    </TrelloCloneContext.Provider>
  )
}