import TodoListAddForm from "./components/TodoListAddForm";
import TodoListItems from "./components/TodoListItems";
import TodoListEditForm from "./components/TodoListEditForm";
import { useState, useEffect } from "react";
import axios from "axios"; // ติดตั้ง axios: npm install axios

const API_URL = "http://localhost:5000/api/todos"; // เปลี่ยนเป็น URL ของ Backend

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // เพิ่ม state สำหรับจัดการการแก้ไข Todo

  // ✅ โหลด Todos จาก API เมื่อเปิดหน้าเว็บ
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data); // อัปเดต State ด้วยข้อมูลจาก API
    } catch (error) {
      console.error("❌ Error fetching todos:", error);
    }
  };

  // ✅ เพิ่ม Todo ผ่าน API
  const addTodo = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });
      setTodos([...todos, response.data]); // อัปเดต State
    } catch (error) {
      console.error("❌ Error adding todo:", error);
    }
  };

  // ✅ เปลี่ยนสถานะ "completed" ผ่าน API
  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };

      await axios.put(`${API_URL}/${id}`, updatedTodo);

      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t))); // อัปเดต State
    } catch (error) {
      console.error("❌ Error updating todo:", error);
    }
  };
  
  

  // ✅ ลบ Todo ผ่าน API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t.id !== id)); // ลบออกจาก State
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
    }
  };

  // ✅ ฟังก์ชันแก้ไข Todo
  const handleUpdate = async (id, text) => {
    try {
      const updatedTodo = { id, text, completed: false };
      await axios.put(`${API_URL}/${id}`, updatedTodo); // อัปเดตฐานข้อมูล

      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo))); // อัปเดต State
      setEditingTodo(null); // ปิดฟอร์มแก้ไขหลังจากบันทึก
    } catch (error) {
      console.error("❌ Error updating todo:", error);
    }
  };

  console.log(todos);
  console.log(typeof todos);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-primary text-center text-2xl font-bold mb-4">To Do List</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {/* Add Data */}
        <div className="w-full mb-4 d-flex justify-content-center mt-4">
          <TodoListAddForm addTodo={addTodo} />
        </div>

       

        {/* Display Items */}
        <div className="w-full d-flex justify-content-center">
          <TodoListItems
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate} // ส่งให้ TodoListItems เพื่อจัดการฟอร์มแก้ไข
          />
        </div>
      </div>
    </div>
  );
}

export default App;
