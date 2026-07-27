import { useState } from "react";


function Dashboard() {


  const tasks =
    JSON.parse(
      localStorage.getItem("tarteebTasks")
    ) || [];


  const reminders =
    JSON.parse(
      localStorage.getItem("tarteebReminders")
    ) || [];


  const expenses =
    JSON.parse(
      localStorage.getItem("tarteebExpenses")
    ) || [];


  const events =
    JSON.parse(
      localStorage.getItem("tarteebEvents")
    ) || [];


  const habits =
    JSON.parse(
      localStorage.getItem("tarteebHabits")
    ) || [];





  // Dynamic Greeting

  const hour = new Date().getHours();


  let greeting = "Assalam-o-Alaikum 🌞";


  if(hour < 12){

    greeting = "Good Morning 🌅";

  }
  else if(hour < 17){

    greeting = "Good Afternoon ☀️";

  }
  else if(hour < 21){

    greeting = "Good Evening 🌆";

  }
  else{

    greeting = "Good Night 🌙";

  }







  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
      }
    );








  const pendingTasks =
    tasks.filter(
      (task)=>
        !task.completed
    ).length;





  const totalExpense =
    expenses.reduce(
      (sum, expense)=>
        sum + Number(expense.amount),
      0
    );





  const completedHabits =
    habits.filter(
      (habit)=>
        habit.completed
    ).length;






  const nextReminder =
    reminders.length > 0
    ? reminders[0]
    : null;






  const nextEvent =
    events.length > 0
    ? events[0]
    : null;






  let saathiMessage =
    "Your day is ready to be organized 🌿";


  if(pendingTasks > 0){

    saathiMessage =
      `You have ${pendingTasks} tasks waiting. Let's complete them step by step 🤖`;

  }

  else if(
    habits.length > 0 &&
    completedHabits === habits.length
  ){

    saathiMessage =
      "Amazing! Your habits are completed today. Keep growing 🌱";

  }







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

        {greeting}

      </h1>



      <p className="
        text-gray-600
        mt-2
        text-lg
      ">

        {today}

      </p>



      <p className="
        text-gray-600
        mt-2
      ">

        Welcome back to Tarteeb AI.
        Let's organize your life beautifully.

      </p>









      {/* Summary Cards */}



      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-5
        gap-6
        mt-8
      ">





        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">

          <h2 className="font-bold">
            ✅ Tasks
          </h2>


          <p className="
            text-4xl
            text-emerald-700
            font-bold
            mt-3
          ">

            {pendingTasks}

          </p>


          <p className="text-gray-500">
            Pending
          </p>


        </div>






        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">


          <h2 className="font-bold">
            🔔 Reminders
          </h2>


          <p className="
            text-4xl
            text-emerald-700
            font-bold
            mt-3
          ">

            {reminders.length}

          </p>


          <p className="text-gray-500">
            Saved
          </p>


        </div>






        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">


          <h2 className="font-bold">
            🌱 Growth
          </h2>


          <p className="
            text-4xl
            text-emerald-700
            font-bold
            mt-3
          ">

            {completedHabits}/{habits.length}

          </p>


          <p className="text-gray-500">
            Habits done
          </p>


        </div>






        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">


          <h2 className="font-bold">
            💰 Hisaab Kitaab
          </h2>


          <p className="
            text-3xl
            text-emerald-700
            font-bold
            mt-3
          ">

            Rs. {totalExpense}

          </p>


          <p className="text-gray-500">
            Spending
          </p>


        </div>






        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">


          <h2 className="font-bold">
            📅 Event
          </h2>


          <p className="
            mt-3
            text-emerald-700
            font-semibold
          ">

            {
              nextEvent
              ? nextEvent.title
              : "No event"
            }

          </p>


        </div>




      </div>









      {/* Saathi Card */}



      <div className="
        mt-10
        bg-emerald-700
        text-white
        rounded-3xl
        p-8
      ">


        <h2 className="
          text-2xl
          font-bold
        ">

          🤖 Saathi's Advice

        </h2>



        <p className="
          text-xl
          mt-4
        ">

          "{saathiMessage}"

        </p>



      </div>









      {/* Quick Information */}


      <div className="
        grid
        md:grid-cols-3
        gap-6
        mt-8
      ">




        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">

          <h3 className="font-bold text-lg">
            📚 Study Focus
          </h3>


          <p className="text-gray-600 mt-2">
            Plan your learning journey with Saathi.
          </p>

        </div>





        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">

          <h3 className="font-bold text-lg">
            📝 Next Reminder
          </h3>


          <p className="text-gray-600 mt-2">

            {
              nextReminder
              ? nextReminder.title
              : "No reminders yet"
            }

          </p>

        </div>






        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
        ">

          <h3 className="font-bold text-lg">
            🌿 Life Balance
          </h3>


          <p className="text-gray-600 mt-2">
            Organize tasks, habits, study and finances together.
          </p>

        </div>



      </div>




    </main>


  );


}


export default Dashboard;