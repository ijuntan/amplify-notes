'use client'
import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './container'

/**
 * Your Component
 */

interface FilledNoteProps {
  note: any,
}

export default function FilledNote({ note }: FilledNoteProps) {
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
        flex min-w-48 h-48 p-4 justify-center items-center
        border rounded-lg
        transition
        hover:shadow-lg cursor-pointer
        ${opacity === 0.5 ? "opacity-50" : "opacity-100"}
    `}
      ref={drag}
    >
      {note.text}
    </div>
  )
}