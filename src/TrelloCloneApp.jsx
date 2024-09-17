import { useState } from "react";
import { TrelloCloneProvider } from "./context"
import { BoardPage } from "./trelloClone/pages/BoardPage"
import { Headerbar, Sidebar } from "./ui/components"

export const TrelloCloneApp = () => {

  const [blockBehind, setBlockBehind] = useState(false);
  const [blockBehindBoard, setBlockBehindBoard] = useState(false);


  return (

    <>
    <div className="h-screen overflow-hidden">
    <Headerbar/>
    <TrelloCloneProvider>
        <div className="h-[calc(100vh-3rem)] flex bg-slate-600">
            <Sidebar
              blockBehind={blockBehind}
              setBlockBehind={setBlockBehind}
              blockBehindBoard={blockBehindBoard}
              setBlockBehindBoard={setBlockBehindBoard}
            />
            <BoardPage
              blockBehind={blockBehind}
              setBlockBehind={setBlockBehind}
              blockBehindBoard={blockBehindBoard}
              setBlockBehindBoard={setBlockBehindBoard}
            />
        </div>
    </TrelloCloneProvider>
    </div>
    </>
  )
}
