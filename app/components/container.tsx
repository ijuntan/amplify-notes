'use client'
import { useEffect, useState } from "react";
import FilledNote from "./filled_note";
import BlankNote from "./blank_note";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AddNotes from "./add_notes";

export const ItemTypes = {
    CARD: 'card'
}

export default function Container() {
  const [notes, setNotes] = useState([
    { id:1, text: "Hello", position: 2 },
    { id:2, text: "World", position: 3 },
    { id:3, text: "!",  position: 5 },
  ])

  function addNotes(text: string, index: number) {
    const newNote = {
      id: notes.length + 1,
      text: text,
      position: index,
    }
    setNotes(prev => [...prev, newNote])
  }

  function deleteNotes(id: number) {
    setNotes(prev => prev.filter((note) => note.id !== id))
  }

  function changePlacement(draggedNote: any, newPlacement: number) {
    setNotes(prev => {
        const newNotes = [...prev]
        const index = newNotes.findIndex((note) => note.id === draggedNote.id)
        newNotes[index].position = newPlacement
        return newNotes
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="
            flex flex-wrap 
            w-screen border min-h-screen 
            p-4 gap-2
            justify-around
        ">
            {
              Array.from({length: 36}).map((_, i) => {
                if(notes.some((note) => note.position === i)) {
                  const note = notes.find((note) => note.position === i)
                  return (
                    <FilledNote
                        key={i}
                        note={note}
                        deleteNotes={(id: number) => deleteNotes(id)}
                    />
                  )
              }
              else {
                return (
                  <BlankNote
                      key={i}
                      setNotePlacement={(draggedNote: any) => changePlacement(draggedNote, i)}
                      addNotes={(text: string) => addNotes(text, i)}
                  />
                )
              }})
            }
        </div>
    </DndProvider>
  )
}