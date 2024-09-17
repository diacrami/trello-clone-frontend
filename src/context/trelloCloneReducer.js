import { types } from "../types/types";


export const trelloCloneReducer = (state = {}, action) => {
    switch (action.type) {

        case types.chargeData: {
            return {
                ...state,
                boards: action.payload.trello.boards,
                active: action.active,
                trello_id: action.payload.trello._id
            }
        }

        case types.activeBoard: {

            return {
                ...state,
                active: action.payload,
            }
        }
        case types.createBoard: {

            let data = {...state};
            let board = {...action.payload , panels: []}
            data.boards = [...data.boards, board];
            return {
                ...state,
                boards: data.boards,
            }
        }   
        case types.editBoard: {
            let data = {...state}
            data.boards[data.active]=action.payload
            return {
                ...state,
                boards:data.boards

            }
        }

        case types.deleteBoard: {

            let data = {...state}
            let boards = data.boards.filter((board) => board._id!==action.payload._id);
            return {
                ...state,
                boards: boards,
            }
        }
        case types.addTask: {

            let data = { ...state };
            data.boards[data.active].panels.filter((panel) => panel._id === action.panel._id)[0].tasks[action.index] = action.payload;

            return {
                ...state,
                boards: data.boards,
            }
        }
        case types.editTask: {
            let data = { ...state };
            let index = data.boards[data.active].panels.filter((panel) => panel._id === action.panel._id)[0].tasks.indexOf(data.boards[data.active].panels.filter((panel) => panel._id === action.panel._id)[0].tasks.filter((task) => task._id === action.payload._id)[0]);
            data.boards[data.active].panels[data.boards[data.active].panels.indexOf(action.panel)].tasks[index]=action.payload;

            return {
                ...state,
                boards: data.boards,

            }
        }

        case types.deleteTask: {
            let data = { ...state };
            let indexPanel = data.boards[data.active].panels.indexOf(action.panel);
            let tasks = data.boards[data.active].panels[indexPanel].tasks.filter((task) => task._id !== action.payload._id);

            data.boards[data.active].panels[indexPanel].tasks = tasks;

            return {
                ...state,
                boards: data.boards,
            }
        }

        case types.addPanel: {

            let data = {...state};
            data.boards[data.active].panels[action.index]={...action.payload, tasks:[]};

            return {
                ...data,
            }
        }

        case types.editPanel: {
            let data = {...state}
            let panelTemp = data.boards[data.active].panels.filter((panel) => panel._id === action.payload._id)[0];
            let index = data.boards[data.active].panels.indexOf(panelTemp);
            data.boards[data.active].panels[index] = action.payload;

            return {
                ...state,
                boards: data.boards,
            }
        }

        case types.deletePanel: {

            let data = {...state};

            let panels = data.boards[data.active].panels.filter((panel) => panel._id !== action.payload._id);
            data.boards[data.active].panels=panels;
            return {
                ...state,
                boards: data.boards,
                
            }
        }




        default:
            break;
    }
}
