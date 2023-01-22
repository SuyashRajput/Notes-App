import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import noteContext from "../Context/noteContext";

const Popbox = (props) => {
  const a = useContext(noteContext);

  const addingTitle = (event) => {
    a.setTitle(event.target.value);
  };

  const addingDescription = (event) => {
    a.setDescription(event.target.value);
  };

  return (
    <>
      <div className="popup-box show">
        <div className="popup">
          <div className="content">
            <header>
              <p></p>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  a.setIsOpen(false);
                  a.setIsOpen2(false);
                  a.setTitle("");
                  a.setDescription("");
                }}
              />
            </header>
            <form action="#">
              <div className="row title">
                <label>{props.title}</label>
                <input
                  id="t"
                  type="text"
                  spellCheck="false"
                  value={a.title}
                  onChange={addingTitle}
                />
              </div>
              <div className="row description">
                <label>Description</label>
                <textarea
                  id="des"
                  spellCheck="false"
                  value={a.description}
                  onChange={addingDescription}
                ></textarea>
              </div>
              <button
                onClick={() => {
                  a.storeNote(false);
                }}
              >
                {props.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popbox;
