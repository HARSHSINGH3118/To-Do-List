import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Footer from "./components/Footer";

function App() {
  const [todo, setTodo] = useState(" ");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container  mx-3 md:mx-auto px-4  my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] bg-[url('../todo-bg.jpg')] bg-no-repeat bg-cover md:w-[60%]  ">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your To-Dos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold my-5">Add a To-do</h2>
          <div className="flex">
            <input
              name={todo.id}
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-2/3 rounded-full px-5 py-1 "
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 2}
              className="bg-black hover:bg-yellow-700 hover:text-black text-white    p-4 py-2 rounded-full font-bold transition ease-in-out delay-50 text-sm mx-2  "
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        Show Finished
        <div className="h-[1px] bg-black opacity-50 w-[90%]mx-auto my-2"></div>
        <h2 className="text-2xl font-bold py-5">Your To-dos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex md:w-1/2 justify-between my-3 "
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-black hover:bg-yellow-700 hover:text-black text-white  mx-1 p-2 py-1 rounded-md font-bold transition ease-in-out delay-50 text-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-black hover:bg-yellow-700 hover:text-black text-white  mx-1 p-2 py-1 rounded-md font-bold transition ease-in-out delay-50 text-sm"
                    >
                      <RiDeleteBinFill />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
