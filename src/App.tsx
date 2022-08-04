import React, { FC, useState } from "react";
import "./App.css";

interface Tasks {
  task: string;
  deadline: number;
}

const App: FC = () => {
  const [tasks, setTasks] = useState({
    task: "",
    deadline: 0,
  });
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTasks({
        ...tasks,
        task: event.target.value,
      });
    } else {
      setTasks({
        ...tasks,
        deadline: Number(event.target.value),
      });
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasksList([...tasksList, tasks]);
    setTasks({
      task: "",
      deadline: 0,
    });
  };

  const handleDelete = (index: number) => {
    const newTasksList = [...tasksList];
    newTasksList.splice(index, 1);
    setTasksList(newTasksList);
  };
  return (
    <div className="App">
      <div>
        <h1 className="text-2xl my-4">Deadlines Tracker</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto w-1/6"
        >
          <label htmlFor="" className="text-left">
            Task name
          </label>
          <input
            className="border border-1 border-black rounded py-2 px-1"
            type="text"
            name="task"
            onChange={handleChange}
            value={tasks.task}
          />
          <label htmlFor="" className="text-left">
            Deadline in days
          </label>
          <input
            className="border border-1 border-black rounded py-2 px-1"
            type="number"
            name="deadline"
            onChange={handleChange}
            value={tasks.deadline}
          />
          <button
            className="bg-red-400 text-black py-2 px-1 my-4 rounded hover:bg-red-500"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <hr className="my-4" />
      <div>
        {tasksList.length > 0 ? (
          tasksList.map((task, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center w-1/6 mx-auto my-4  border border-2 border-black rounded py-2 px-1"
              >
                <div className="flex justify-between items-center w-full ">
                  <p>{task.task}</p>
                  <p>{task.deadline} days</p>
                </div>
                <p
                  className="hover:bg-red-500 rounded-full mx-1"
                  onClick={() => handleDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 p-1 cursor-pointer "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </p>
              </div>
            );
          })
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  );
};

export default App;
