import { useState } from "react";
import { generateStudyPlan } from "../utils/gemini";


function StudyPlanner() {

  const [exam, setExam] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [subjects, setSubjects] = useState("");
  const [hardest, setHardest] = useState("");

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);



  const generatePlan = async () => {

    if (
      !exam ||
      !date ||
      !hours ||
      !subjects ||
      !hardest
    ) {

      alert("Please fill all fields.");

      return;

    }


    const prompt = `
You are Saathi, an AI study companion inside Tarteeb AI.

Create a personalized study plan for a student.

Exam Name:
${exam}

Exam Date:
${date}

Available Study Hours Per Day:
${hours}

Subjects:
${subjects}

Hardest Subject:
${hardest}

Create:

1. A daily study schedule
2. Subject priority order
3. Revision strategy
4. Exam preparation tips
5. Motivational advice

Make the plan practical, realistic, and encouraging.
`;



    try {

      setLoading(true);


      const aiPlan = await generateStudyPlan(prompt);


if (aiPlan) {

  setPlan(aiPlan);

} else {

  const fallbackPlan = `
📚 Study Plan for ${exam}

🎯 Daily Study Target:
${hours} hours per day.

📖 Subject Priority:
${subjects}

⭐ Start with:
${hardest}

⏰ Study Method:
Use the 50-10 rule:
50 minutes focused study,
10 minutes break.

📅 Weekly Revision:
Revise important topics every Sunday.

🤖 Saathi's Advice:
Stay consistent. Small daily efforts create big results.
`;

  setPlan(fallbackPlan);

}


    } catch (error) {

      console.error(error);


      setPlan(
        "Sorry, Saathi is unable to connect right now. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <main className="flex-1 bg-[#faf7f0] p-8">


      <h1 className="
        text-4xl
        font-bold
        text-emerald-700
      ">
        📚 AI Study Planner
      </h1>


      <p className="
        text-gray-600
        mt-2
      ">
        Let Saathi create your personalized study routine.
      </p>



      <div className="
        bg-white
        rounded-2xl
        shadow
        p-6
        mt-8
        space-y-4
      ">



        <input

          type="text"

          placeholder="Exam Name"

          value={exam}

          onChange={(e)=>
            setExam(e.target.value)
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

          type="date"

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

          type="number"

          placeholder="Study hours per day"

          value={hours}

          onChange={(e)=>
            setHours(e.target.value)
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "

        />



        <textarea

          placeholder="Subjects (comma separated)"

          value={subjects}

          onChange={(e)=>
            setSubjects(e.target.value)
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "

          rows="3"

        />



        <input

          type="text"

          placeholder="Hardest Subject"

          value={hardest}

          onChange={(e)=>
            setHardest(e.target.value)
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "

        />



        <button

          onClick={generatePlan}

          className="
            bg-emerald-700
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-emerald-600
          "

        >

          {loading
            ? "Saathi is thinking..."
            : "Generate Study Plan"
          }


        </button>


      </div>




      {plan && (

        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
          mt-8
          whitespace-pre-line
        ">


          <h2 className="
            text-2xl
            font-bold
            text-emerald-700
            mb-4
          ">
            🤖 Saathi's Plan
          </h2>



          {plan}


        </div>

      )}



    </main>

  );

}


export default StudyPlanner;