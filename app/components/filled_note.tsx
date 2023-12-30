'use client'
import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './container'
import { GoTrash } from 'react-icons/go'

/**
 * Your Component
 */

interface FilledNoteProps {
  note: any,
  deleteNotes: any,
}

export default function FilledNote({ note, deleteNotes }: FilledNoteProps) {
  const [isHovering, setIsHovering] = useState(false)

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => ({ note }),
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      })
  }))

  return (
    <div className={`
        flex relative min-w-48 h-48 p-4 justify-center items-center
        border rounded-lg
        transition
        hover:shadow-lg cursor-pointer
        ${opacity === 0.5 ? "opacity-50" : "opacity-100"}
    `}
      ref={drag}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {
        isHovering &&
        <button
          className="
            absolute top-2 right-2
            text-gray-500 hover:text-red-500
            transition
          "
          onClick={() => deleteNotes(note.id)}
        >
          <GoTrash/>
        </button>
      }
      
      {note.text}
    </div>
  )
}