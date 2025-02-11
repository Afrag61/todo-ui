import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../store/TodosContext.jsx";
import closeIco from "./../assets/close.svg";
import DeleteModal from "./DeleteModal.jsx";

const TodoDetailsModal = ({ id, onClose }) => {
  const [todoDetails, setTodoDetails] = useState(undefined);
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false);
  const { getTodoById, setAnyModalIsOpen } = useContext(TodoContext);

  useEffect(() => {
    const getTodo = async (id) => {
      const todo = await getTodoById(id);
      setTodoDetails(todo);
    };

    getTodo(id);
  }, [id]);

  const handleDelete = () => {
    setAnyModalIsOpen(true);
    setDeleteModalIsVisible(true);
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-header">
          <h1>{todoDetails?.title}</h1>
          <button className="close" onClick={onClose}>
            <img src={closeIco} alt="Close" />
          </button>
        </div>
        <p>Description: {todoDetails?.description}</p>
        <p>Created On: {todoDetails?.createdOn}</p>
        <p>Due Date: {todoDetails?.dueDateTime}</p>
        {todoDetails?.subTodos?.map((todo, index) => (
          <p key={index}>Tasks: {todo.title}</p>
        ))}{" "}
        {/* map sub todos array with SubTodo component */}
        {todoDetails?.history?.map((item, index) => (
          <p key={index}>History: {item.field}</p>
        ))}{" "}
        {/* map history array with History component */}
        {/*{/* <p>History: {todoDetails?.history[0]}</p> map history array with history component */}
        <div className="modal-buttons">
          <button className="edit" onClick={onClose}>
            Edit
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      {deleteModalIsVisible && (
        <DeleteModal
          id={id}
          closeDetailsModal={onClose}
          closeDeleteModal={setDeleteModalIsVisible}
          title={todoDetails?.title}
        />
      )}
    </div>
  );
};

export default TodoDetailsModal;
