let name = document.querySelector("#name-input");
let email = document.querySelector("#email-input");
let subject = document.querySelector("#subject-input"); 
let message = document.querySelector("#message-input");
let form = document.querySelector("#form1");
let sendButton = document.querySelector("#sendbtn");

// console.log(sendButton);
// console.log(name);
// console.log(email);
// console.log(subject);
// console.log(message);



form.addEventListener('submit', function(event) {
 event.preventDefault();
    let nameValue = name.value;
    let emailValue = email.value;
    let subjectValue = subject.value;
    let messageValue = message.value;

    let data = {
        name : nameValue,
        email : emailValue,
        subject : subjectValue,
        message : messageValue
    };
    
  fetch("http://js.vacsera.com/api/final-project", {
    method:"POST",
    headers:{},
    // mode: "no-cors",
    body: JSON.stringify(data)

    }).then(function(res){
        console.log("sucsses");
        console.log(res);
        
        
    }).catch(function(rej){
        console.log("failed");
        console.log(rej);
        
    });
  
 
  	// 3.1 Convert the response into JSON-JS object.
    // .then(function(response) {
    //   return response.json();
    // })
    // 3.2 Do something with the JSON data
    // .then(function(jsonData) {
    // 	console.log(jsonData);
    //   document.getElementById('results').innerText =
    //   	JSON.stringify(jsonData);
    // });
    //   event.preventDefault();
});


