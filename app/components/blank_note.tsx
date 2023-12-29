'use client'
import { useDrop } from "react-dnd"
import { ItemTypes } from "./container"

interface BlankNoteProps {
    setNewNote: any
}

export default function BlankNote({
  setNewNote
}: BlankNoteProps) {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => setNewNote(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div className="
        flex min-w-48 h-48
        border rounded-lg
        transition
        hover:shadow-lg cursor-pointer
    "
      ref={drop}
    >
      {
        isOver ?
        <div className="w-full h-full bg-blue-200 opacity-50"></div>
        :
        null
      }
    </div>
  )
}