import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

// let settings = "settings ";

const Note = (props) => {
  const [settings, setSettings] = useState("settings");

  const showMenu = () => {
    if (settings !== "settings show") setSettings("settings show");
  };

  if (settings === "settings show") {
    document.addEventListener("click", (e) => {
      if (e.path[2].id !== "uff" && e.path[0].id !== "uff") {
        setSettings("settings");
      }
    });
  }

  return (
    <>
      <li className="note">
        <div className="details">
          <p>{props.title}</p>
          <span>{props.description}</span>
        </div>
        <div className="bottom-content">
          <span>{props.date}</span>
          <div className={settings}>
            <button
              className="btn btn-primary btn-sm m-1"
              onClick={showMenu}
              id="uff"
            >
              <FontAwesomeIcon id="uff" icon={faEllipsis} />
            </button>
            <ul className="menu">
              <li
                onClick={() => {
                  props.edit({
                    t: props.title,
                    des: props.description,
                    id: props.id,
                  });
                }}
              >
                <FontAwesomeIcon className="m-2" icon={faPen} />
                Edit
              </li>
              <li
                onClick={() => {
                  props.delete(props.id);
                }}
              >
                <FontAwesomeIcon className="m-2" icon={faTrash} />
                Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
    </>
  );
};

export default Note;
