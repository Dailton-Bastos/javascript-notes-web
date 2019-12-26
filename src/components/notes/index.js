import React, { Fragment, useState, useEffect } from "react";
import "../../styles/notes.scss";
import { push as Menu } from "react-burger-menu";
import { Column, Button } from "rbx";
import List from "../notes/list";
import NotesService from "../../services/note";

const Notes = props => {
  const [notes, setNotes] = useState([]);
  const [current_note, setCurrentNote] = useState({
    title: "",
    body: "",
    id: ""
  });

  // const fetchNotes = async () => {
  //   const response = await NotesService.index();
  //   if (response.data.length >= 1) {
  //     setNotes(response.data.reverse());
  //     setCurrentNote(response.data[0]);
  //   }
  // };
  async function fetchNotes() {
    const response = await NotesService.index();
    if (response.data.length >= 1) {
      setNotes(response.data.reverse());
      setCurrentNote(response.data[0]);
    }
  }

  function selectNote(id) {
    const note = notes.find(note => {
      return note._id == id;
    });
    setCurrentNote(note);
  }

  // const selectNote = id => {
  //   const note = notes.find(note => {
  //     return note._id == id;
  //   });
  //   setCurrentNote(note);
  // };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <Column.Group className="notes" id="notes">
        <Menu
          pageWrapId={"notes-editor"}
          isOpen={props.isOpen}
          onStateChange={state => props.setIsOpen(state.isOpen)}
          disableAutoFocus
          outerContainerId={"notes"}
          customBurgerIcon={false}
          customCrossIcon={false}
        >
          <Column.Group>
            <Column size={10} offset={1}>
              Search...
            </Column>
          </Column.Group>
          <List
            notes={notes}
            selectNote={selectNote}
            current_note={current_note}
          />
        </Menu>

        <Column size={12} className="notes-editor" id="notes-editor">
          Editor...
        </Column>
      </Column.Group>
    </Fragment>
  );
};

export default Notes;
