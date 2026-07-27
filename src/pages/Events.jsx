import { useState } from "react";


function Events() {


  const [events, setEvents] = useState(() => {

    const saved =
      localStorage.getItem("tarteebEvents");

    return saved
      ? JSON.parse(saved)
      : [];

  });



  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");




  const saveEvents = (updatedEvents) => {

    setEvents(updatedEvents);

    localStorage.setItem(
      "tarteebEvents",
      JSON.stringify(updatedEvents)
    );

  };






  const addEvent = () => {


    if(
      !title ||
      !date
    ) return;



    const newEvent = {

      id: Date.now(),

      title,

      date,

      location,

      notes

    };



    saveEvents([
      ...events,
      newEvent
    ]);



    setTitle("");
    setDate("");
    setLocation("");
    setNotes("");

  };







  const deleteEvent = (id)=>{


    const updated =
      events.filter(
        (event)=>
          event.id !== id
      );


    saveEvents(updated);


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

        📅 Events

      </h1>



      <p className="
        text-gray-600
        mt-2
      ">

        Plan important moments and never miss them.

      </p>







      {/* Add Event Form */}


      <div className="
        bg-white
        rounded-2xl
        shadow
        p-6
        mt-8
        space-y-4
      ">



        <input

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }

          placeholder="Event title..."

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
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
          "

        />




        <input

          value={location}

          onChange={(e)=>
            setLocation(e.target.value)
          }

          placeholder="Location..."

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "

        />




        <textarea

          value={notes}

          onChange={(e)=>
            setNotes(e.target.value)
          }

          placeholder="Notes..."

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "

        />





        <button

          onClick={addEvent}

          className="
            bg-emerald-700
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-emerald-600
          "

        >

          Add Event

        </button>



      </div>








      {/* Event List */}



      <div className="
        mt-8
        space-y-4
      ">


      {
        events.map((event)=>(


          <div

            key={event.id}

            className="
              bg-white
              rounded-2xl
              shadow
              p-6
              flex
              justify-between
            "

          >


            <div>


              <h2 className="
                text-xl
                font-bold
              ">

                📌 {event.title}

              </h2>



              <p className="text-gray-600 mt-2">
                🕒 {event.date}
              </p>



              <p className="text-gray-600">
                📍 {event.location}
              </p>



              <p className="text-gray-500 mt-2">
                📝 {event.notes}
              </p>



            </div>




            <button

              onClick={()=>
                deleteEvent(event.id)
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
      }


      </div>





    </main>

  );


}


export default Events;