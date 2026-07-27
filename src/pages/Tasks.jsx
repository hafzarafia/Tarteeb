import { useState } from "react";


function Tasks() {


  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tarteebTasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];

  });


  const [taskInput, setTaskInput] = useState("");



  const saveTasks = (updatedTasks) => {

    setTasks(updatedTasks);

    localStorage.setItem(
      "tarteebTasks",
      JSON.stringify(updatedTasks)
    );

  };




  const addTask = () => {

    if (taskInput.trim() === "") return;


    const newTask = {

      id: Date.now(),

      text: taskInput,

      completed: false

    };


    saveTasks([
      ...tasks,
      newTask
    ]);


    setTaskInput("");

  };




  const toggleTask = (id) => {


    const updatedTasks = tasks.map((task) =>

      task.id === id

        ? {
            ...task,
            completed: !task.completed
          }

        : task

    );


    saveTasks(updatedTasks);

  };





  const deleteTask = (id) => {


    const updatedTasks = tasks.filter(

      (task) => task.id !== id

    );


    saveTasks(updatedTasks);


  };





  return (

    <main className="flex-1 bg-[#faf7f0] p-8">



      <h1 className="
        text-4xl
        font-bold
        text-emerald-700
      ">
        ✅ My Tasks
      </h1>



      <p className="
        text-gray-600
        mt-2
      ">
        Organize your daily responsibilities with Tarteeb.
      </p>





      {/* Add Task Box */}

      <div className="
        bg-white
        rounded-2xl
        shadow
        p-6
        mt-8
      ">


        <div className="
          flex
          gap-4
        ">


          <input

            type="text"

            value={taskInput}

            onChange={(e)=>
              setTaskInput(e.target.value)
            }

            placeholder="Write a new task..."

            className="
              flex-1
              border
              rounded-xl
              px-4
              py-3
              outline-none
            "

          />



          <button

            onClick={addTask}

            className="
              bg-emerald-700
              text-white
              px-6
              rounded-xl
              hover:bg-emerald-600
            "

          >

            Add

          </button>


        </div>


      </div>






      {/* Task List */}


      <div className="mt-8 space-y-4">


        {

        tasks.length === 0 ? (


          <div className="
            bg-white
            rounded-2xl
            shadow
            p-8
            text-center
          ">


            <h2 className="
              text-xl
              font-bold
              text-emerald-700
            ">
              🌱 No tasks yet
            </h2>


            <p className="
              text-gray-500
              mt-2
            ">
              Start organizing your day by adding your first task.
            </p>


          </div>


        ) : (


          tasks.map((task) => (


            <div

              key={task.id}

              className="
                bg-white
                rounded-xl
                shadow
                p-5
                flex
                justify-between
                items-center
              "

            >



              <div className="
                flex
                items-center
                gap-3
              ">



                <input

                  type="checkbox"

                  checked={task.completed}

                  onChange={() =>
                    toggleTask(task.id)
                  }

                />



                <span

                  className={
                    task.completed
                    ?
                    "line-through text-gray-400"
                    :
                    "text-gray-700"
                  }

                >

                  {task.text}

                </span>



              </div>





              <button

                onClick={() =>
                  deleteTask(task.id)
                }

                className="
                  text-red-500
                  hover:text-red-700
                "

              >

                Delete

              </button>



            </div>


          ))

        )

        }


      </div>



    </main>

  );

}


export default Tasks;