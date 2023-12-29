'use client'
import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './container'

/**
 * Your Component
 */

interface FilledNoteProps {
  text: string,
  fillCurrentNote: any,
  eraseCurrentNote: any,

  note: any,
  setCurrentNote: any
}

export default function FilledNote({ text, fillCurrentNote, eraseCurrentNote, note, setCurrentNote}: FilledNoteProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => {
        setCurrentNote({
          id: note.id,
          text: note.text,
          position: note.position
        })
        return { note } 
      },
      //end: () => eraseCurrentNote(),
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      })
  }))

  return (
    <div className={`
        flex min-w-48 h-48 p-4 justify-center items-center
        border rounded-lg
        transition
        hover:shadow-lg cursor-pointer
        ${opacity === 0.5 ? "opacity-50" : "opacity-100"}
    `}
      ref={dragRef}
    >
      {text}
    </div>
  )
}