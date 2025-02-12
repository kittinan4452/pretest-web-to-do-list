import axios from "axios";

const API_URL = "http://localhost:5000/api/todos"; // เปลี่ยนเป็น URL ของ Backend

class TodoAPI {
  // โหลด Todos จาก API
  static async fetchTodos() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching todos:", error);
      throw error;
    }
  }

  // เพิ่ม Todo ผ่าน API
  static async addTodo(text) {
    try {
      const response = await axios.post(API_URL, { text });
      return response.data;
    } catch (error) {
      console.error("❌ Error adding todo:", error);
      throw error;
    }
  }

//   // เปลี่ยนสถานะ "completed"
//   static async toggleTodo(id, completed) {
//     console.log(id,completed);
    
//     // try {
//     //   const updatedTodo = { completed };
//     //   await axios.put(`${API_URL}/${id}`, updatedTodo);
//     //   return updatedTodo;
//     // } catch (error) {
//     //   console.error("❌ Error updating todo:", error);
//     //   throw error;
//     // }
//   }
// เปลี่ยนสถานะ "completed"
static async toggleTodo(updatedTodo) {
    
  
    try {
      await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
      return updatedTodo;
    } catch (error) {
      console.error("❌ Error updating todo:", error);
      throw error;
    }
  }
  
  // ลบ Todo ผ่าน API
  static async deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
      throw error;
    }
  }

  // แก้ไข Todo
  static async updateTodo(id, text) {
    try {
      const updatedTodo = { id, text, completed: false };
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      return updatedTodo;
    } catch (error) {
      console.error("❌ Error updating todo:", error);
      throw error;
    }
  }
}

export default TodoAPI;
