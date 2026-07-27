import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({

  apiKey: import.meta.env.VITE_GEMINI_API_KEY,

});

console.log(
  "Gemini Key Loaded:",
  import.meta.env.VITE_GEMINI_API_KEY ? "YES" : "NO"
);





// ===============================
// SAATHI AI FUNCTION
// ===============================

export async function askGemini(prompt) {


  try {


    const response = await Promise.race([


      ai.models.generateContent({

        model: "gemini-2.0-flash",

        contents: prompt,

      }),



      new Promise((_, reject) =>

        setTimeout(

          () => reject(
            new Error("Gemini timeout")
          ),

          15000

        )

      )


    ]);



    return response.text;



  } catch(error) {


    console.log(
      "Gemini unavailable. Switching to Tarteeb Smart Mode.",
      error
    );


    return generateOfflineReply(prompt);


  }


}









// ===============================
// OFFLINE TARTEEB SMART ASSISTANT
// ===============================


function generateOfflineReply(prompt) {


  const text =
    prompt.toLowerCase();





  if(text.includes("task")) {


    return `

✅ Tarteeb Task Assistant:

I suggest organizing your tasks like this:

1. Choose your most important task first.
2. Divide large tasks into smaller steps.
3. Complete one task before moving to another.

Remember 🌿:
Progress comes from consistency, not pressure.

`;

  }





  if(
    text.includes("study") ||
    text.includes("learn") ||
    text.includes("exam")
  ) {


    return `

📚 Tarteeb Study Assistant:

Here is a simple study strategy:

⏰ Study:
45 minutes focused learning

☕ Break:
10 minutes rest

📝 Review:
Write important points after studying

🌱 Tip:
Small daily efforts create strong results.

`;

  }







  if(
    text.includes("money") ||
    text.includes("expense") ||
    text.includes("hisaab")
  ) {


    return `

💰 Tarteeb Hisaab Assistant:

Good financial habits:

✅ Record expenses regularly.
✅ Check where your money goes.
✅ Create spending categories.
✅ Plan before buying.

Awareness is the first step toward better money management.

`;

  }








  if(
    text.includes("habit") ||
    text.includes("growth")
  ) {


    return `

🌱 Tarteeb Habit Coach:

Building habits takes patience.

Try this:

✅ Start with one small habit.
✅ Track your progress.
✅ Stay consistent even on difficult days.

Small actions repeated daily create big changes.

`;

  }








  if(
    text.includes("plan") ||
    text.includes("day")
  ) {


    return `

🌞 Your Tarteeb Daily Plan:

Morning ☀️
• Review priorities
• Complete your important task

Afternoon 📚
• Focus on learning/work

Evening 🌙
• Review achievements
• Prepare tomorrow

Stay organized. Keep growing 🌿

`;

  }







  return `

🌿 Assalam-o-Alaikum.

I am Saathi, your Tarteeb Smart Assistant.

I can help you with:

✅ Tasks
📚 Study planning
🌱 Habit building
💰 Hisaab Kitaab
📅 Daily organization

Tell me what you want to improve today.

`;

}











// ===============================
// STUDY PLANNER FUNCTION
// ===============================


export async function generateStudyPlan(prompt) {


  try {


    const response = await Promise.race([


      ai.models.generateContent({


        model: "gemini-2.0-flash",


        contents:

`
You are Saathi AI, a smart study planning assistant inside Tarteeb.

Create a practical personalized study plan.

Include:

📚 Study schedule

⏰ Time management

🌿 Break strategy

📝 Learning techniques

💡 Motivation tips


User request:

${prompt}

`


      }),




      new Promise((_, reject) =>

        setTimeout(

          () => reject(
            new Error("Study planner timeout")
          ),

          15000

        )

      )


    ]);



    return response.text;



  } catch(error) {


    console.log(
      "Study Planner using offline mode:",
      error
    );


    return `

📚 Your Study Plan:

Morning:
• Review difficult topics

Afternoon:
• Practice and revise

Evening:
• Summarize learning

Tips:
✅ Remove distractions
✅ Take short breaks
✅ Stay consistent

You can do this 🌿

`;

  }


}