const input = document.querySelector("#num")
const button = document.querySelector("#butt")
const result = document.querySelector("#result")

button.addEventListener("click", function() {
    const number = Number(input.value)
    if(number%2===0){
        result.textContent = "Even Number"
    } else {
        result.textContent = "Odd Number"
    }
})


const input1 = document.querySelector("#num1")
const input2 = document.querySelector("#num2")
const input3 = document.querySelector("#num3")
const button1 = document.querySelector("#butt1")
const result1 = document.querySelector("#result1")

button1.addEventListener("click", function(){
    let num1 = Number(input1.value)
    let num2 = Number(input2.value)
    let num3 = Number(input3.value)
    if(num1 > num2 && num1 > num3) {
        result1.textContent = num1 + " is largest"
    }  else if (num2 > num3 && num2 > num1){
        result1.textContent = num2 + " is largest"
    } else {
        result1.textContent = num3 + " is largest"
    }
})


const input4 = document.querySelector("#num4")
const button2 = document.querySelector("#butt2")
const result2 = document.querySelector("#result2")

button2.addEventListener("click", function(){
    const num4 = Number(input4.value)
    let table=""
    for(let i=1; i<=10; i++ ){
        table = table + num4 + " X " + i + " = " + (num4*i) + "<br>"
    }
    result2.innerHTML = table
})


const input5 = document.querySelector("#num5")
const button3 = document.querySelector("#butt3")
const result3 = document.querySelector("#result3")

button3.addEventListener("click", function(){
    const num5 = Number(input5.value)
    let fact = 1
    for(let i=1; i<=num5; i++){
        fact = fact * i
    }
    result3.textContent = "Factorial is " + fact
})


const button4 = document.querySelector("#butt4")
const result4 = document.querySelector("#result4")

button4.addEventListener("click", function(){
    const students = ["Ali", "Ahmed", "Sara"]
    let names = ""
    students.forEach(function(student){
        names = names + student + "<br>"
    })
    result4.innerHTML = names
})


const button5 = document.querySelector("#butt5")
const result5 = document.querySelector("#result5")

button5.addEventListener("click", function(){
    const marks = [65, 72, 80, 55, 90, 68]
    const highMarks = marks.filter(function(mark){
        return mark > 70
    })
    result5.textContent = "Marks above 70: " + highMarks.join(", ")
})


const button6 = document.querySelector("#butt6")
const result6 = document.querySelector("#result6")

button6.addEventListener("click", function(){
    const student = {
        name: "Ali",
        age: 21,
        department: "Computer Science",
        cgpa: 3.7
    }
    result6.innerHTML = "Name: " + student.name + "<br>" +
        "Age: " + student.age + "<br>" +
        "Department: " + student.department + "<br>" +
        "CGPA: " + student.cgpa
})



const heading1 = document.querySelector("#heading1")
const button7 = document.querySelector("#butt7")

button7.addEventListener("click", function(){
    heading1.textContent = "Text Changed!"
    heading1.style.color = "blue"
})


let count = 0
const counter = document.querySelector("#counterDisplay")
const button8 = document.querySelector("#butt8")
const button9 = document.querySelector("#butt9")

button8.addEventListener("click", function(){
    count++
    counter.textContent = count
})

button9.addEventListener("click", function(){
    count--
    counter.textContent = count
})


const form1 = document.querySelector("#form1")
const result7 = document.querySelector("#result7")

form1.addEventListener("submit", function(event){
    event.preventDefault()
    const formName = document.querySelector("#formName").value
    const formEmail = document.querySelector("#formEmail").value
    const formMarks = document.querySelector("#formMarks").value

    if(formName === "" || formEmail === "" || formMarks === ""){
        result7.textContent = "Please fill all fields."
    } else {
        result7.textContent = "Form submitted successfully!"
    }
})


const input6 = document.querySelector("#num6")
const button10 = document.querySelector("#butt10")
const list1 = document.querySelector("#list1")

button10.addEventListener("click", function(){
    if(input6.value !== ""){
        const li = document.createElement("li")
        li.textContent = input6.value
        list1.appendChild(li)
        input6.value = ""
    }
})


const button11 = document.querySelector("#butt11")
const list2 = document.querySelector("#list2")

button11.addEventListener("click", async function(){
    list2.innerHTML = "Loading..."
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const users = await response.json()
        list2.innerHTML = ""
        users.forEach(function(user){
            const li = document.createElement("li")
            li.textContent = user.name
            list2.appendChild(li)
        })
    } catch (error) {
        list2.innerHTML = "Error fetching users."
        console.log(error)
    }
})