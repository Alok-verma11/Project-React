import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";




function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  const handleEdit = (e, id) => {
    // console.log("Edit button clicked");
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    // console.log(t[0].todo);
    
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    // console.log("Delete button clicked");
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });
    setTodos(newTodos);
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if (isConfirmed) {
      setTodos(newTodos);
    }
    saveToLocalStorage();
  };

  const handleAdd = () => {
    // console.log("Add button clicked");
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    // console.log("Input changed");
    setTodo(e.target.value);
  };


  const handleCheckbox = (e) => {
    // console.log(e, e.target);
    let id = e.target.name;
    // console.log(`the id is ${id}`);
    
    let index = todos.findIndex(item => { return item.id === id});
    // console.log(index);
    
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md: container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              type="text"
              className="w-full border-2 border-gray-300 rounded-md p-2 my-3"
              value={todo}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              value={todo}
              className="bg-green-500 hover:bg-green-700 p-2 justify-center my-3  mx-2 text-sm font-bold text-white rounded-md "
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="m-2 px-2"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          id="inputid"
        />
        <label
          htmlFor="show"
          className="mx-2 items-center font-bold"
          id="inputid"
        >
          SHOW FINISHED
        </label>
        <div className="h-[1px] bg-black opacity-45 w-80% mx-auto my-3"></div>
        <h2 className="text-xl my-2 font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <p className="text-gray-500 m-5">No todos added yet.</p>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between my-3">
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-red-500 hover:bg-red-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
