'use client'
import { useState } from "react";

import { useDrop } from "react-dnd"
import { ItemTypes } from "./container"
import { GoPlus } from "react-icons/go";
import AddNotes from "./add_notes";

interface BlankNoteProps {
  setNotePlacement: any,
  addNotes: any,
}

export default function BlankNote({
  setNotePlacement,
  addNotes,
}: BlankNoteProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [fade, setFade] = useState(false)
  const [openAddNote, setOpenAddNote] = useState(false)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: any) => {
      setNotePlacement(item.note)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }))

  function openAddNoteHandler() {
    setFade(true)
    setTimeout(() => setOpenAddNote(true), 100)
  }

  return (
    <div>
    <button className={`
        flex min-w-48 h-48
        hover:border rounded-lg
        transition
        hover:shadow-lg cursor-pointer
        ${fade && "animate-wiggle"}
    `}
      ref={drop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => openAddNoteHandler()}
      onAnimationEnd={() => setFade(false)}
    >
      {
        isOver &&
        <div className="w-full h-full rounded-lg bg-gray-200 opacity-50"></div>
      }
      {
        isHovering && !isOver &&
        <div className="w-full h-full flex justify-center items-center bg-gray-200">
          <GoPlus className="w-12 h-12 m-auto text-gray-400"/>
        </div>
      }
    </button>

    {
      openAddNote &&
      <AddNotes
        open={openAddNote}
        setOpen={setOpenAddNote}
        addNotes={addNotes}
      />
    }
    </div>
  )
}