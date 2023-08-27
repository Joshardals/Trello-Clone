"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  // const [board, getBoard] = useBoardStore((state) => [
  //   state.board,
  //   state.getBoard,
  // ]);

  const { board, getBoard } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  console.log(board);

  return (
    <h1>hello</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div></div>}
    //   </Droppable>
    // </DragDropContext>
  );
};

export default Board;
