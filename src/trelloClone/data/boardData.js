
export const boardData = {
    active: 0,
    boards: [
        {
            id: new Date().getTime()*3,
            name: "My Trello Board",
            bgcolor: "#475569",
            panels: [
                {
                    id: new Date().getTime()*2,
                    title: "To Do",
                    bgcolor: "#000000",
                    tasks: [
                        {
                            id: new Date().getTime()*4,
                            title: "Task 1",
                            description: "This is a new task created to test the app",
                            dateStart: new Date().toLocaleDateString('en-CA'),
                            dateEnd: new Date().toLocaleDateString('en-CA'),                   
                        }
                    ]
                },
                {
                    id: new Date().getTime()*14,
                    title: "Done",
                    bgcolor: "#000000",
                    tasks: [
                        {
                            id: new Date().getTime()*12,
                            title: "Task 2",
                            description: "This is a new task created to test the app",
                            dateStart: new Date().toLocaleDateString('es-CA'),
                            dateEnd: new Date().toLocaleDateString('en-CA'),                   
                        }
                    ]
                },
                {
                    id: new Date().getTime()*8,
                    title: "Done",
                    bgcolor: "#000000",
                    tasks: [
                        {
                            id: new Date().getTime()*11,
                            title: "Task 3",
                            description: "This is a new task created to test the app",
                            dateStart: new Date().toLocaleDateString('es-CA'),
                            dateEnd: new Date().toLocaleDateString('en-CA'),                   
                        }
                    ]
                }
            ]
        },
        {
            id: new Date().getTime()*4,
            name: "My Board",
            bgcolor: "#475569",
            panels: [
                {
                    id: new Date().getTime()*9,
                    title: "Done",
                    bgcolor: "#000000",
                    tasks: [
                        {
                            id: new Date().getTime(),
                            title: "Task 1",
                            description: "This is a new task created to test the app",
                            dateStart: new Date().toLocaleDateString('es-CA'),
                            dateEnd: new Date().toLocaleDateString('en-CA'),                   
                        }
                    ]
                }
            ]
        }
    ]
}