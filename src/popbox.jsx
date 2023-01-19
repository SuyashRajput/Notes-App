import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "./note";
// import { RefreshContext } from "./App";

// import { v4 } from "uuid";

const Close = () => {
  const popupBox = document.querySelector(".popup-box"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea");

  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
};

const addNote = () => {
  const popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    titleTag = popupBox.querySelector("input"),
    addBtn = popupBox.querySelector("button");

  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
};

const Popbox = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [store, setStore] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  // const refresh = useContext(RefreshContext);
  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const deleteNote = (data) => {
    let confirmDel = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDel) return;
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(data, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    setStore(JSON.parse(localStorage.getItem("notes")));
  };

  const addingTitle = (event) => {
    setTitle(event.target.value);
  };

  const addingDescription = (event) => {
    setDescription(event.target.value);
  };

  const storeNote = (e) => {
    e.preventDefault();
    const newStore = {
      // id: v4(),
      t: title,
      des: description,
      date: new Date().toLocaleDateString(),
    };
    setStore((oldStore) => {
      localStorage.setItem("notes", JSON.stringify([...oldStore, newStore]));
      return [...oldStore, newStore];
    });
    setTitle("");
    setDescription("");
    Close();
  };

  const editNote = ({ t, des, id }) => {
    const popupBox = document.querySelector(".popup-box"),
      popupTitle = popupBox.querySelector("header p"),
      titleTag = popupBox.querySelector("input"),
      addBtn = popupBox.querySelector("button"),
      titleInput = document.getElementById("t"),
      descriptionInput = document.getElementById("des");

    titleInput.value = t;
    descriptionInput.value = des;
    setTitle(t);
    setDescription(des);

    popupTitle.innerText = "Edit Note";
    addBtn.innerText = "Save Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
    addBtn.addEventListener("click", () => {
      const notes = JSON.parse(localStorage.getItem("notes"));
      notes.splice(id, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      setStore(JSON.parse(localStorage.getItem("notes")));
    });
  };

  return (
    <>
      <div className="popup-box">
        <div className="popup">
          <div className="content">
            <header>
              <p></p>
              <FontAwesomeIcon icon={faXmark} onClick={Close} />
            </header>
            <form action="#" onSubmit={storeNote}>
              <div className="row title">
                <label>Title</label>
                <input
                  id="t"
                  type="text"
                  spellCheck="false"
                  value={title}
                  onChange={addingTitle}
                />
              </div>
              <div className="row description">
                <label>Description</label>
                <textarea
                  id="des"
                  spellCheck="false"
                  value={description}
                  onChange={addingDescription}
                ></textarea>
              </div>
              <button type="submit"></button>
            </form>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <li className="add-box" onClick={addNote}>
          <div className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <p>Add new note</p>
        </li>
        {store.map((val, index) => {
          return (
            <Note
              title={val.t}
              description={val.des}
              date={val.date}
              id={index}
              key={index}
              delete={deleteNote}
              edit={editNote}
            />
          );
        })}
      </div>
    </>
  );
};

export default Popbox;
