import { useState } from "react";


function Habits() {


  const [habits, setHabits] = useState(() => {

    const saved =
      localStorage.getItem("tarteebHabits");

    return saved
      ? JSON.parse(saved)
      : [];

  });



  const [habitInput, setHabitInput] = useState("");





  const saveHabits = (updatedHabits) => {

    setHabits(updatedHabits);

    localStorage.setItem(
      "tarteebHabits",
      JSON.stringify(updatedHabits)
    );

  };







  const addHabit = () => {


    if(habitInput.trim() === "")
      return;



    const newHabit = {

      id: Date.now(),

      name: habitInput,

      completed: false

    };



    saveHabits([
      ...habits,
      newHabit
    ]);



    setHabitInput("");

  };








  const toggleHabit = (id)=>{


    const updated = habits.map(
      (habit)=>

        habit.id === id

        ? {
            ...habit,
            completed: !habit.completed
          }

        : habit

    );


    saveHabits(updated);


  };







  const deleteHabit = (id)=>{


    const updated =
      habits.filter(
        (habit)=>
          habit.id !== id
      );


    saveHabits(updated);


  };







  const completedCount =
    habits.filter(
      (habit)=>
        habit.completed
    ).length;







  return (

    <main className="
      flex-1
      bg-[#faf7f0]
      p-8
    ">


      <h1 className="
        text-4xl
        font-bold
        text-emerald-700
      ">

        🌱 Growth Garden

      </h1>



      <p className="
        text-gray-600
        mt-2
      ">

        Grow small habits into meaningful achievements.

      </p>







      {/* Progress */}


      <div className="
        mt-8
        bg-emerald-700
        text-white
        rounded-2xl
        p-6
      ">


        <h2 className="
          text-xl
          font-bold
        ">

          Today's Growth

        </h2>



        <p className="
          text-4xl
          mt-3
          font-bold
        ">

          {completedCount}/{habits.length}

        </p>



        <p className="
          text-emerald-100
        ">

          habits completed today

        </p>


      </div>









      {/* Add Habit */}


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

            value={habitInput}

            onChange={(e)=>
              setHabitInput(e.target.value)
            }

            placeholder="Add a new habit..."

            className="
              flex-1
              border
              rounded-xl
              px-4
              py-3
            "

          />




          <button

            onClick={addHabit}

            className="
              bg-emerald-700
              text-white
              px-6
              rounded-xl
            "

          >

            Add

          </button>


        </div>


      </div>









      {/* Habit List */}



      <div className="
        mt-8
        space-y-4
      ">


      {
        habits.map((habit)=>(


          <div

            key={habit.id}

            className="
              bg-white
              rounded-2xl
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
              gap-4
            ">



              <input

                type="checkbox"

                checked={habit.completed}

                onChange={()=>
                  toggleHabit(habit.id)
                }

              />



              <span

                className={
                  habit.completed

                  ? "line-through text-gray-400"

                  : "font-semibold text-gray-700"
                }

              >

                🌿 {habit.name}

              </span>



            </div>





            <button

              onClick={()=>
                deleteHabit(habit.id)
              }

              className="
                text-red-500
              "

            >

              Delete

            </button>



          </div>


        ))
      }


      </div>





    </main>

  );


}


export default Habits;