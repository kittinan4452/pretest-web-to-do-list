import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // เรียกใช้ Bootstrap

const TodoListEditForm = ({ task, updateTodo, cancelEdit }) => {
  const [updatedTask, setUpdatedTask] = useState(task?.text || ""); // ใช้ task?.text เพื่อป้องกัน error

  // อัปเดตค่าเมื่อ task เปลี่ยนแปลง
  useEffect(() => {
    setUpdatedTask(task?.text || "");
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedTask.trim()) {
      updateTodo(task.id, updatedTask); // ส่ง id และข้อความใหม่
      cancelEdit(); // ปิดโหมดแก้ไข
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-3 p-3 border rounded-lg shadow-sm">
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => setUpdatedTask(e.target.value)}
        placeholder="แก้ไขข้อมมูล"
        className="form-control w-100"
      />
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          บันทึก
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="btn btn-secondary"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
};

export default TodoListEditForm;
