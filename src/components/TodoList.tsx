"use client";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    const timestamp = localStorage.getItem("timestamp");

    if (saved && timestamp) {
      const now = new Date().getTime();
      const savedTime = parseInt(timestamp);
      if (now - savedTime < 15 * 60 * 1000) {
        setTodos(JSON.parse(saved));
      } else {
        localStorage.removeItem("todos");
        localStorage.removeItem("timestamp");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("timestamp", Date.now().toString());
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const startEdit = (id: number, currentText: string) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📋 Get It Done!
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add thing to do..."
            className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black resize-none h-20"
          />
          <button
            onClick={addTodo}
            className="w-full sm:w-auto bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            ➕ Add
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-md transition hover:shadow-lg flex flex-col justify-between"
            >
              <div
                className="cursor-pointer text-lg font-medium text-gray-800 truncate"
                onClick={() => setSelectedTodo(todo)}
              >
                {todo.text.length > 50
                  ? todo.text.slice(0, 50) + "..."
                  : todo.text}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`px-3 py-1 rounded-md text-white ${
                    todo.completed
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                >
                  ✅ Mark as Done
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setDeleteId(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTodo && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Detail</h2>
            <p className="text-gray-800 whitespace-pre-line break-words">
              {selectedTodo.text}
            </p>
            <button
              onClick={() => setSelectedTodo(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {editId !== null && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Edit</h2>
            <textarea
              className="w-full h-32 border p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={saveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                💾 Save
              </button>
              <button
                onClick={() => setEditId(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Delete Confirmation
            </h2>
            <p className="text-gray-800 mb-4">
              Do you want to delete this list?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setTodos(todos.filter((todo) => todo.id !== deleteId));
                  setDeleteId(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
