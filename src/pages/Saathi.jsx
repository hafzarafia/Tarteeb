import { askGemini } from "../utils/gemini";
import { useState } from "react";


function Saathi() {


const [messages,setMessages] = useState(()=>{

const saved =
localStorage.getItem("tarteebSaathiChat");

return saved
? JSON.parse(saved)
:[
{
sender:"saathi",
text:"Assalam-o-Alaikum 🌿 I am Saathi. I can help you manage tasks, habits, studies, money and daily planning."
}
];

});



const [input,setInput]=useState("");

const [loading,setLoading]=useState(false);





const saveMessages=(updated)=>{

setMessages(updated);

localStorage.setItem(
"tarteebSaathiChat",
JSON.stringify(updated)
);

};







const sendMessage = async()=>{


if(!input.trim()) return;



const userMessage={

sender:"user",

text:input

};




const updatedUserMessages=[

...messages,

userMessage

];



setMessages(updatedUserMessages);


const userInput=input;


setInput("");

setLoading(true);






// Tarteeb Data

const tasks =
JSON.parse(localStorage.getItem("tarteebTasks")) || [];


const reminders =
JSON.parse(localStorage.getItem("tarteebReminders")) || [];


const habits =
JSON.parse(localStorage.getItem("tarteebHabits")) || [];


const expenses =
JSON.parse(localStorage.getItem("tarteebExpenses")) || [];







const pendingTasks =
tasks.filter(
(task)=>!task.completed
).length;



const completedHabits =
habits.filter(
(h)=>h.completed
).length;



const totalExpense =
expenses.reduce(
(sum,e)=>sum + Number(e.amount),
0
);








const context = `

You are Saathi, an intelligent personal assistant inside Tarteeb AI.

Your role:
Help the user organize life, studies, habits, tasks and finances.

User Tarteeb Data:

Pending Tasks: ${pendingTasks}

Total Reminders: ${reminders.length}

Completed Habits: ${completedHabits}/${habits.length}

Total Expenses: Rs. ${totalExpense}



User message:

${userInput}



Instructions:

Reply warmly.

Give practical personalized advice.

Use emojis naturally.

Give helpful explanations.

Avoid one sentence answers.

Be supportive like a productivity companion.

`;







let reply;



try{


reply = await askGemini(context);



}

catch(error){


console.log(error);


reply =
"🌿 I am having trouble connecting right now, but I am still here to help you organize your day.";


}




const saathiReply={

sender:"saathi",

text:reply

};





const finalMessages=[

...updatedUserMessages,

saathiReply

];



saveMessages(finalMessages);



setLoading(false);



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

🤖 Saathi AI Assistant

</h1>





<p className="
text-gray-600
mt-2
text-lg
">

Your intelligent companion for planning, learning and growth.

</p>









<div className="
bg-white
rounded-3xl
shadow
mt-8
p-6
h-[500px]
flex
flex-col
">







<div className="
flex-1
overflow-y-auto
space-y-4
">





{

messages.map((message,index)=>(


<div

key={index}

className={

message.sender==="user"

?

"flex justify-end"

:

"flex justify-start"

}

>



<div className={


message.sender==="user"


?


"bg-emerald-700 text-white px-5 py-3 rounded-2xl max-w-md"


:


"bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl max-w-md"


}>


{message.text}


</div>



</div>


))

}







{

loading && (

<div className="flex justify-start">


<div className="
bg-gray-100
text-gray-600
px-5
py-3
rounded-2xl
max-w-md
">

🤖 Saathi is thinking...

</div>


</div>

)

}



</div>









<div className="
flex
gap-3
mt-4
">





<input


value={input}


onChange={(e)=>
setInput(e.target.value)
}


onKeyDown={(e)=>{

if(e.key==="Enter")
sendMessage();

}}


placeholder="Ask Saathi anything..."


className="
flex-1
border
rounded-xl
px-4
py-3
"


/>








<button


onClick={sendMessage}


disabled={loading}


className="
bg-emerald-700
text-white
px-6
rounded-xl
disabled:opacity-50
"


>

{

loading
?
"Thinking..."
:
"Send"

}


</button>





</div>





</div>









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

🌿 Saathi Reminder

</h2>





<p className="mt-2">

"Organize your tasks. Protect your time. Grow every day."

</p>





</div>







</main>

);


}



export default Saathi;