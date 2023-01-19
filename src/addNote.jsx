import React, { useEffect } from "react";
import Note from "./note";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

let popup;

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
  popup = true;
};

const AddNote = () => {
  const PopupEvent = useEffect(() => {});
  return (
    <>
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
            />
          );
        })}
      </div>
    </>
  );
};

export default AddNote;
