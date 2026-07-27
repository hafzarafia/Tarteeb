import { useState } from "react";


function Reminders() {


  const [reminders, setReminders] = useState(() => {

    const saved = localStorage.getItem("tarteebReminders");

    return saved
      ? JSON.parse(saved)
      : [];

  });



  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");




  const saveReminders = (updatedReminders) => {

    setReminders(updatedReminders);

    localStorage.setItem(
      "tarteebReminders",
      JSON.stringify(updatedReminders)
    );

  };





  const addReminder = () => {


    if (!title || !date) return;



    const newReminder = {

      id: Date.now(),

      title,

      date

    };



    saveReminders([

      ...reminders,

      newReminder

    ]);



    setTitle("");

    setDate("");


  };





  const deleteReminder = (id) => {


    const updatedReminders = reminders.filter(

      (reminder) => reminder.id !== id

    );


    saveReminders(updatedReminders);


  };





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
        🔔 Reminders
      </h1>



      <p className="
        text-gray-600
        mt-2
      ">
        Never forget important moments again with Tarteeb.
      </p>





      {/* Add Reminder Box */}


      <div className="
        bg-white
        rounded-2xl
        shadow
        p-6
        mt-8
      ">



        <input


          type="text"

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }


          placeholder="Reminder title..."

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
            outline-none
          "


        />





        <input


          type="datetime-local"


          value={date}


          onChange={(e)=>
            setDate(e.target.value)
          }


          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
            outline-none
          "


        />





        <button


          onClick={addReminder}


          className="
            bg-emerald-700
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-emerald-600
            transition
          "


        >

          Add Reminder

        </button>



      </div>








      {/* Reminder List */}


      <div className="
        mt-8
        space-y-4
      ">



      {


      reminders.length === 0 ? (



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

            🌱 No reminders yet

          </h2>



          <p className="
            text-gray-500
            mt-2
          ">

            Add important dates, deadlines and moments you don't want to forget.

          </p>



        </div>



      ) : (



        reminders.map((reminder)=>(



          <div


            key={reminder.id}


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



            <div>



              <h2 className="
                font-bold
                text-lg
              ">

                🔔 {reminder.title}

              </h2>




              <p className="
                text-gray-500
                mt-1
              ">

                📅 {reminder.date}

              </p>



            </div>






            <button


              onClick={() =>
                deleteReminder(reminder.id)
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


export default Reminders;