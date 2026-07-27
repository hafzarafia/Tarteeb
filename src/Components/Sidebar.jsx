import { Link } from "react-router-dom";

import {
  Home,
  CheckSquare,
  Calendar,
  Bell,
  Wallet,
  BookOpen,
  Bot,
  Sprout
} from "lucide-react";


function Sidebar() {


  const menuItems = [

    {
      name: "Dashboard",
      icon: Home,
      path: "/"
    },

    {
      name: "Tasks",
      icon: CheckSquare,
      path: "/tasks"
    },

    {
      name: "Events",
      icon: Calendar,
      path: "/events"
    },

    {
      name: "Reminders",
      icon: Bell,
      path: "/reminders"
    },

    {
      name: "Hisaab Kitaab",
      icon: Wallet,
      path: "/hisaab"
    },

    {
      name: "Growth Garden",
      icon: Sprout,
      path: "/habits"
    },

    {
      name: "Study Planner",
      icon: BookOpen,
      path: "/study"
    },

    {
      name: "Ask Saathi",
      icon: Bot,
      path: "/saathi"
    }

  ];



  return (

    <aside
      className="
        w-72
        min-h-screen
        bg-emerald-700
        text-white
        p-6
      "
    >


      <h1
        className="
          text-3xl
          font-bold
        "
      >
        🌿 Tarteeb AI
      </h1>



      <p
        className="
          text-emerald-100
          mt-2
          text-sm
        "
      >
        Yaad bhi dilaye,
        <br />
        Plan bhi banaye.
      </p>




      <nav
        className="
          mt-10
          space-y-3
        "
      >


        {
          menuItems.map((item)=>{


            const Icon = item.icon;


            return (

              <Link

                key={item.name}

                to={item.path}

                className="
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  cursor-pointer
                  hover:bg-emerald-600
                  transition
                "

              >

                <Icon size={22}/>


                <span>
                  {item.name}
                </span>


              </Link>

            );


          })
        }


      </nav>





      {/* Saathi Feature Card */}

      <Link
        to="/saathi"
        className="
          block
          mt-10
          bg-emerald-600
          rounded-xl
          p-4
          hover:bg-emerald-500
          transition
          cursor-pointer
        "
      >


        <div className="
          flex
          items-center
          gap-3
        ">

          <Bot size={24}/>

          <p className="font-semibold">
            🤖 Saathi
          </p>

        </div>



        <p
          className="
            text-xs
            text-emerald-100
            mt-2
          "
        >
          Your intelligent companion for organizing life.
          <br/>
          Click to chat with Saathi.
        </p>


      </Link>



    </aside>

  );

}


export default Sidebar;