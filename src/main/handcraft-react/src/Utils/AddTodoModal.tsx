import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToList } from "../Redux/todoSlice";
import {
  Button,
  Icon,
  Input,
  Label,
  Modal,
  TextArea,
} from "semantic-ui-react";

const AddTodoModal = () => {
  const [open, setOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const dispatch = useDispatch();

  const handleAddToList = () => {
      dispatch(addToList({ todoTitle, todoDesc }));
      setOpen(false)
      setTodoTitle(""); // Clear the input after adding
      setTodoDesc("");
    };
  return (

    <Modal
      style={{ height: "410px", top: "20%" }}
      size="tiny"
      closeIcon
      open={open}
      trigger={
        <div className="add-new-todo">
          <h3 className="add-new-task">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="white"
                className="bi bi-plus-circle mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </span>
            Add New Task
          </h3>
        </div>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content style={{ textAlign: "center", fontSize: "18px" }}>
        <p>Please fill all fieds in order to create a new To do.</p>
      </Modal.Content>
      <Modal.Content>
        <Label content="Add Todo Title" />
        <br />
        <Input onChange={(e) => setTodoTitle(e.target.value)} fluid />
      </Modal.Content>
      <Modal.Content>
        <Label content="Add Todo Description" />
        <br />
        <TextArea
          placeholder="Please add todo description. What will you do?"
          onChange={(e) => setTodoDesc(e.target.value)}
          style={{ minHeight: 100, width: "100%" }}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={handleAddToList}>
          <Icon name="checkmark"  /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddTodoModal;
