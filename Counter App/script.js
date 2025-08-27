let count = document.querySelector('#count');

let decrementBtn = document.querySelector('#decrement');

let incrementBtn = document.querySelector('#increment');

decrementBtn.addEventListener('click', () => {
    count.innerText = parseInt(count.innerText) - 1;
});

incrementBtn.addEventListener('click', () => {
    count.innerText = parseInt(count.innerText) + 1;
});




/*            ملاحظات          

1- parseInt() بتخلي النص يتحول لرقم صحيح    
عشان انت مستخدم هناك الانبوت وده بيخلي اللي جواه يبقى نص مش رقم span  
2- innerText بتجيب النص اللي جوه العنصر
3- querySelector() بتجيب العنصر اللي انت عايزه من ال HTML
4- addEventListener() بتخلي الزرار يشتغل لما تدوس عليه
5- arrow function () => {} ديه طريقة جديدة لكتابة الدوال في الجافا سكريبت
6- لما تدوس على الزرار هيزود او ينقص الرقم اللي في النص




*/
