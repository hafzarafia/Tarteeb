import Events from "./pages/Events";
import HisaabKitaab from "./pages/HisaabKitaab";
import Reminders from "./pages/Reminders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Habits from "./pages/Habits";
import Sidebar from "./Components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import StudyPlanner from "./pages/StudyPlanner";
import Saathi from "./pages/Saathi";


function App() {

  return (

    <BrowserRouter>

      <div className="flex min-h-screen">

        <Sidebar />

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/study" element={<StudyPlanner />} />

          <Route path="/saathi" element={<Saathi />} />
         
          <Route
  path="/habits"
  element={<Habits />}
/>
          <Route
 path="/events"
 element={<Events />}
/>
          <Route 
 path="/hisaab" 
 element={<HisaabKitaab />} 
/>
          
          <Route 
 path="/reminders" 
 element={<Reminders />} 
/>

        </Routes>

      </div>

    </BrowserRouter>

  );

}


export default App;