import React, { useState } from "react";
import Popbox from "./popBox";
import AddNote from "./addNote";
import noteContext from "../Context/noteContext";
import { v4 } from "uuid";

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [store, setStore] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const storeNote = () => {
    if (id !== "") {
      for (let i = 0; i < store.length; i++) {
        const element = store[i];
        if (element._id === id) {
          element.t = title;
          element.des = description;
        }
      }
      localStorage.setItem("notes", JSON.stringify(store));
    } else {
      const newStore = {
        _id: v4(),
        t: title,
        des: description,
        date: new Date().toLocaleDateString(),
      };
      setStore((oldStore) => {
        localStorage.setItem("notes", JSON.stringify([...oldStore, newStore]));
        return [...oldStore, newStore];
      });
    }
    setTitle("");
    setDescription("");
    setIsOpen(false);
    setIsOpen2(false);
    setId("");
  };

  return (
    <noteContext.Provider
      value={{
        isOpen,
        setIsOpen,
        store,
        setStore,
        isOpen2,
        setIsOpen2,
        title,
        setTitle,
        description,
        setDescription,
        storeNote,
        setId,
      }}
    >
      <h1 className="heading">My Notes:</h1>
      <AddNote />
      {isOpen && <Popbox title="Add a new Note" button="Add Note" />}
      {isOpen2 && <Popbox title="Edit your Note" button="Save" />}
    </noteContext.Provider>
  );
};

export default Notes;
