import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
    setTodo("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  };

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  return (
    <div className="mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-3xl">
        iTask - Manage your todos
      </h1>
      {/* Add Todo */}
      <div className="my-5">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-full border-2 p-2 rounded-md"
        />
        <button
          onClick={handleAdd}
          disabled={todo.length <= 3}
          className="bg-green-500 text-white p-2 mt-2 rounded-md"
        >
          Save
        </button>
      </div>
      {/* Toggle */}
      <input
        type="checkbox"
        checked={showFinished}
        onChange={() => setShowFinished(!showFinished)}
      />{" "}
      <span className="font-bold">Show Finished</span>
      {/* Todos */}
      {todos.map(
        (item) =>
          (showFinished || !item.isCompleted) && (
            <div key={item.id} className="flex justify-between my-3">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckbox(item.id)}
                />
                <span className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-violet-700 text-white p-1 rounded"
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default Home;
