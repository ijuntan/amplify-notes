'use client'
import { useState } from "react";
import FilledNote from "./filled_note";
import BlankNote from "./blank_note";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
    CARD: 'card'
}

export default function Container() {
  const squares = []
  const [currentNote, setCurrentNote] = useState({
    id: 0,
    text: "",
    position: 0
  })
  const [notes, setNotes] = useState([
    { id:1, text: "Hello", position: 2 },
    { id:2, text: "World", position: 3 },
    { id:3, text: "!",  position: 5 },
  ])
  
  const eraseCurrentNote = () => {
    console.log('erasing', currentNote)
    setCurrentNote({
        id: 0,
        text: "",
        position: 0
    })
  }

  const fillCurrentNote = (note:any) => {
    setCurrentNote(note || { id: 0, text: "", position: 0})
  }

  for(let i = 0; i < 36; i++) {
    if(notes.some((note) => note.position === i)) {
        const note = notes.find((note) => note.position === i)
        squares.push(
            <FilledNote
                key={i} 
                text={note?.text || ""}
                fillCurrentNote={() => fillCurrentNote(note)}
                note={note}
                setCurrentNote={setCurrentNote}
                eraseCurrentNote={eraseCurrentNote}
            />
        )
    }
    else {
        squares.push(
            <BlankNote
                key={i}
                setNewNote={() => {
                    if(currentNote.id !== 0) {
                        const index = notes.findIndex((note) => note.id === currentNote.id)
                        
                        setNotes(prev => {
                            const newNotes = [...prev]
                            newNotes[index].position = i
                            return newNotes
                        })

                        eraseCurrentNote()
                    }
                }}
            />
        )
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="
            flex flex-wrap 
            w-screen border min-h-screen 
            p-4 gap-2
            justify-around
        ">
            {squares}
        </div>
    </DndProvider>
  )
}