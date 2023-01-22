import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import noteContext from "../Context/noteContext";
import NoteSlip from "./noteSlip";

const AddNote = () => {
  const a = useContext(noteContext);
  return (
    <div className="wrapper">
      <li className="add-box" onClick={() => a.setIsOpen(true)}>
        <div className="icon">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <p>Add new note</p>
      </li>
      {a.store.map((val, index) => {
        return (
          <NoteSlip
            id={val._id}
            title={val.t}
            description={val.des}
            date={val.date}
          />
        );
      })}
    </div>
  );
};

export default AddNote;
