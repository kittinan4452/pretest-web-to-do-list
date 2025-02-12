import React, { useState } from 'react';
import TodoListEditForm from './TodoListEditForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // เรียกใช้ Bootstrap

const TodoListItems = ({ todos = [], onToggle, onDelete, onUpdate }) => {
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleSave = (id, newText) => {
    onUpdate(id, newText);
    setEditingTodo(null);
  };

  return (
    <div className="container mt-5 mb-4">
      <ul className="list-group">
        {todos.length === 0 ? (
          <li className="list-group-item text-center text-muted">
            ไม่มีข้อมมูลใน database
          </li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex align-items-center justify-content-between mb-2"
            >
              <div className="d-flex align-items-center flex-grow-1 gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                  className="form-check-input me-2"
                />
                {editingTodo?.id === todo.id ? (
                  <TodoListEditForm
                    task={editingTodo}
                    updateTodo={handleSave}
                    cancelEdit={() => setEditingTodo(null)}
                  />
                ) : (
                  <span className={`fs-5 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="btn-group">
                {editingTodo?.id !== todo.id && (
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="btn btn-sm btn-primary me-3"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(todo.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoListItems;
