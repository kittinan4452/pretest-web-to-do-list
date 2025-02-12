import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // เรียกใช้ Bootstrap

const TodoListAddForm = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  };

  return (
    <div className='mt-4'>
    <form onSubmit={handleSubmit} className="d-flex gap-3 p-3 border rounded-lg shadow-sm">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="เพิ่มข้อมูล"
        className="form-control w-100"
      />
      <button type="submit" className="btn btn-primary">
        เพิ่ม
      </button>
    </form>
    </div>
  );
};

export default TodoListAddForm;
