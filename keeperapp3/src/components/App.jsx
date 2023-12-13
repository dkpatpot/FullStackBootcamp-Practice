import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNotes(newNote) {
    setNotes((prevItems) => {
      return [...prevItems, newNote];
    });
  }
  function deleteNotes(id) {
    setNotes((prevItems) => {
      return prevItems.filter((note,index)=>{
        return index !== id;
      })
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNotes} />
      {notes.map((note, index) => {
        return <Note key={index} index={index} title={note.title} content={note.content} onDelete={deleteNotes} />;
      })}
      <Footer />
    </div>
  );
}

export default App;
