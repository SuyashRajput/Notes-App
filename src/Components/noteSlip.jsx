import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import noteContext from "../Context/noteContext";

const NoteSlip = (props) => {
  const a = useContext(noteContext);

  const deleteNote = (id) => {
    let confirmDel = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDel) return;
    const newNotes = a.store.filter((note) => {
      return note._id !== id;
    });
    a.setStore(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const editNote = (t, des, id) => {
    a.setIsOpen2(true);
    a.setTitle(t);
    a.setDescription(des);
    a.setId(id);
  };

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    function handleClick(event) {
      if (!event.target.closest(".menu_toggler") && toggle) {
        setToggle(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [toggle]);

  return (
    <>
      <li className="note">
        <div className="details">
          <p>{props.title}</p>
          <span>{props.description}</span>
        </div>
        <div className="bottom-content">
          <span>{props.date}</span>
          <div className={toggle ? "settings show" : "settings"}>
            <div className="menu_toggler">
              <button
                className="btn btn-primary btn-sm m-1"
                onClick={() => setToggle(!toggle)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
              <ul className="menu">
                <li
                  onClick={() => {
                    editNote(props.title, props.description, props.id);
                  }}
                >
                  <FontAwesomeIcon className="m-2" icon={faPen} />
                  Edit
                </li>
                <li
                  onClick={() => {
                    deleteNote(props.id);
                  }}
                >
                  <FontAwesomeIcon className="m-2" icon={faTrash} />
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default NoteSlip;
