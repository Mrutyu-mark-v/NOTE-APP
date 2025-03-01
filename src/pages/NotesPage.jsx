import React from "react";
import { fakeData as note } from "../assets/fakeData.js";
import NoteCard from "../component/NoteCard";

const NotesPage = () => {
  return (
    <div>
      {note.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};

export default NotesPage;
