import { useState } from "react";


function HisaabKitaab() {


const [expenses,setExpenses] = useState(()=>{

const saved =
localStorage.getItem("tarteebExpenses");

return saved
? JSON.parse(saved)
: [];

});




const [title,setTitle]=useState("");

const [amount,setAmount]=useState("");

const [category,setCategory]=useState("");






const saveExpenses=(updated)=>{


setExpenses(updated);


localStorage.setItem(
"tarteebExpenses",
JSON.stringify(updated)
);


};








const addExpense=()=>{


if(
!title ||
!amount ||
!category
){

alert(
"Please fill all fields."
);

return;

}




const newExpense={


id:Date.now(),

title,

amount:Number(amount),

category,

date:
new Date().toLocaleDateString(
"en-PK"
)

};




saveExpenses([

...expenses,

newExpense

]);



setTitle("");

setAmount("");

setCategory("");



};









const deleteExpense=(id)=>{


const updated =
expenses.filter(
(expense)=>
expense.id !== id
);


saveExpenses(updated);


};









const total = expenses.reduce(

(sum,expense)=>

sum + Number(expense.amount),

0

);








const categoryTotal=(cat)=>{


return expenses

.filter(
(expense)=>
expense.category===cat
)

.reduce(

(sum,expense)=>
sum + Number(expense.amount),

0

);


};








const formatPKR=(value)=>{


return new Intl.NumberFormat(
"en-PK"
).format(value);


};







let highestCategory="None";


if(expenses.length>0){


const categories =
[

"🍔 Food",

"📚 Education",

"🚗 Transport",

"🛍 Shopping",

"🏠 Home",

"💻 Other"

];



highestCategory =
categories.reduce(

(a,b)=>

categoryTotal(a) >

categoryTotal(b)

? a:b

);

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

💰 Hisaab Kitaab

</h1>




<p className="
text-gray-600
mt-2
">

Manage your money wisely with Tarteeb.

</p>









{/* Summary Cards */}



<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



<div className="
bg-emerald-700
text-white
rounded-2xl
p-6
">

<h2 className="
font-bold
">

Total Spending

</h2>


<p className="
text-3xl
mt-3
">

Rs. {formatPKR(total)}

</p>


</div>







<div className="
bg-white
rounded-2xl
shadow
p-6
">

<h2 className="
font-bold
">

Transactions

</h2>


<p className="
text-3xl
mt-3
text-emerald-700
">

{expenses.length}

</p>


<p className="text-gray-500">

Expenses recorded

</p>

</div>









<div className="
bg-white
rounded-2xl
shadow
p-6
">

<h2 className="font-bold">

Highest Spending

</h2>


<p className="
text-lg
mt-3
text-emerald-700
font-bold
">

{highestCategory}

</p>


</div>


</div>









{/* Add Expense */}


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

placeholder="
Expense title
"

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

value={amount}

onChange={(e)=>
setAmount(e.target.value)
}

placeholder="
Amount in PKR
"

className="
w-full
border
rounded-xl
px-4
py-3
"

/>








<select

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

className="
w-full
border
rounded-xl
px-4
py-3
"

>


<option value="">
Select Category
</option>

<option>
🍔 Food
</option>

<option>
📚 Education
</option>

<option>
🚗 Transport
</option>

<option>
🛍 Shopping
</option>

<option>
🏠 Home
</option>

<option>
💻 Other
</option>


</select>







<button

onClick={addExpense}

className="
bg-emerald-700
text-white
px-6
py-3
rounded-xl
hover:bg-emerald-600
"

>

Add Expense

</button>


</div>









{/* Category Breakdown */}


<div className="
bg-white
rounded-2xl
shadow
p-6
mt-8
">


<h2 className="
text-xl
font-bold
">

📊 Spending Breakdown

</h2>



<div className="
grid
md:grid-cols-3
gap-4
mt-5
">


{

[
"🍔 Food",
"📚 Education",
"🚗 Transport",
"🛍 Shopping",
"🏠 Home",
"💻 Other"

].map((cat)=>(


<div

key={cat}

className="
bg-[#faf7f0]
rounded-xl
p-4
"

>


<p className="font-semibold">

{cat}

</p>


<p className="
text-emerald-700
font-bold
mt-2
">

Rs. {formatPKR(categoryTotal(cat))}

</p>


</div>


))


}


</div>


</div>









{/* Expense History */}



<div className="
mt-8
space-y-4
">



{

expenses.length===0 ?


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

🌱 No expenses yet

</h2>


<p className="
text-gray-500
mt-2
">

Start recording your spending.

</p>


</div>


:


expenses.map((expense)=>(


<div

key={expense.id}

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

💸 {expense.title}

</h2>


<p className="text-gray-500">

{expense.category} | {expense.date}

</p>


</div>





<div className="text-right">


<p className="
font-bold
text-emerald-700
">

Rs. {formatPKR(expense.amount)}

</p>


<button

onClick={()=>
deleteExpense(expense.id)
}

className="
text-red-500
mt-2
"

>

Delete

</button>


</div>



</div>


))


}



</div>






</main>


);


}


export default HisaabKitaab;