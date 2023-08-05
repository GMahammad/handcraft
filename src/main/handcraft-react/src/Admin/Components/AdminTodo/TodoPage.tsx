import React from "react";
import AddTodoModal from "../../../Utils/AddTodoModal";
import { Label } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { clearList, removeFromList } from "../../../Redux/todoSlice";

const TodoPage = () => {
  const { todoItems, countTodo } = useSelector((store: any) => store.todo);
  const dispatch = useDispatch();
  return (
    <>
      <div className="content-page">
        <div className="container">
          <header>
            <h2 className="todo-header">Admin Todo List</h2>
          </header>
          <div className="todo-list">
            <div className="todo-head mt-3">
              <div className="row justify-content-between">
                <div className="col-3">
                  <AddTodoModal />
                </div>
                <div className="col-3">
                  <h3 className="mt-4 text-center" style={{color:"gray"}}>
                    Total incompleted tasks: <br />
                    <Label style={{marginTop:"15px"}} size="big" color="green">
                      {countTodo > 0 ? countTodo : "You do not have any tasks. Enjoy!"}
                    </Label>
                  </h3>
                </div>
                <div className="col-3">
                  <div className="clear-todo">
                    <h3 onClick={() => dispatch(clearList())}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-trash mx-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                      Clear All Tasks
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="todos mt-4">
              <div className="row">
                <hr />
                {todoItems.map((todo: any, index: number) => (
                  <div key={index} className="col-4">
                    <div className="todo-item my-1">
                      <h3 className="text-center">
                        {todo.todoTitle}
                        <button
                          style={{ background: "transparent", border: "none" }}
                          onClick={() =>
                            dispatch(removeFromList(todo.todoTitle))
                          }
                          className="float-end"
                        >
                          &#10060;
                        </button>
                      </h3>

                      <p className="my-2">{todo.todoDesc}</p>
                      <div className="todo-info">
                        Created At : {todo.todoCreatedAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
