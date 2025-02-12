import { useState, useEffect } from "react";
import TodoListAddForm from "./components/TodoListAddForm";
import TodoListItems from "./components/TodoListItems";
import TodoAPI from "./Api/api"; // ✅ Import API Class

function App() {
  const [todos, setTodos] = useState([]);

  // ✅ โหลด Todos จาก API
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await TodoAPI.fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTodos();
  }, []);

  // ✅ เพิ่ม Todo
  const addTodo = async (text) => {
    try {
      const newTodo = await TodoAPI.addTodo(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ เปลี่ยนสถานะ "completed"
  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
  
      const updatedTodo = { ...todo, completed: !todo.completed };
  
      await TodoAPI.toggleTodo(updatedTodo); // ส่ง updatedTodo แทนค่าตรง ๆ
  
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t))); // อัปเดต state
    } catch (error) {
      console.error("❌ Error updating todo:", error);
    }
  };
  

  // ✅ ลบ Todo
  const handleDelete = async (id) => {
    try {
      await TodoAPI.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ แก้ไข Todo
  const handleUpdate = async (id, text) => {
    try {
      const updatedTodo = await TodoAPI.updateTodo(id, text);
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error(error);
    }
  };

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
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
