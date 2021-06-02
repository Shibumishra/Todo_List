var todoInput = document.getElementById("todo-input");

// var todoListFromStroge =
//   localStorage.getItem("todo-list") === null
//     ? []
//     : JSON.parse(localStorage.getItem("todo-list"));
// for (var i = 0; i < todoListFromStroge.length; i++) {
//   renderTodoCard(
//     todoListFromStroge[i].message,
//     todoListFromStroge[i].createdTime,
//     todoListFromStroge[i].id
//   );
// }

var http =new XMLHttpRequest()
http.open('GET', 'https://607c412c67e6530017573d5a.mockapi.io/todo', true)
http.onreadystatechange = function(){
    if(this.readyState === 4){
        try {
            console.log(JSON.parse(this.responseText))
            var todoList = JSON.parse(this.responseText)
             for (var i = 0; i < todoList.length; i++){
                renderTodoCard(todoList[i].message, todoList[i].createdTime, todoList[i].id)
        }   
        } catch (error) {
            location.assign("./Somethinwron.html")
        }   
        localStorage.setItem('todo-list', JSON.stringify(todoList))
    }
}
http.send();

var userLoggedInStatus = localStorage.getItem('userLoginStatus');
if(userLoggedInStatus === "true"){
    var loginbar = document.getElementById('post-login-view')
    loginbar.style.display='flex'

    var loginTopBar = document.getElementById('login-top')
    loginTopBar.style.display='none'

    var usernameElem = document.getElementById('username');
    usernameElem.innerHTML=localStorage.getItem('Username')
}else{
    var todoInput = document.getElementById('todo-input')
    todoInput.placeholder = "Please login first!"
    todoInput.disabled = true;
    todoInput.readOnly = true;
}

var btnLogout = document.getElementById('login-btn')
btnLogout.onclick = function(){
    localStorage.setItem('userLoginStatus',false)
    location.assign('./index.html')
}

var todoForm = document.getElementById("todo-form");
todoForm.onsubmit = function (e) {
  e.preventDefault();
};


function removeTodoFormStorage(todoId){
    var todoList = localStorage.getItem("todo-list") === null
    ? []
    : JSON.parse(localStorage.getItem("todo-list"));

    var elmentPos = -1;
    for(var pos=0; pos<todoList.length; pos++){
        if(todoList[pos].id === todoId){
            elmentPos = pos;
        }
    }
    if(elmentPos >= 0){
        todoList.splice(elmentPos, 1);
        console.log(todoList);
        localStorage.setItem('todo-list', JSON.stringify(todoList))
    }
}

function renderTodoCard(message, currentTime, todoId) {
  var MaintodoList = document.getElementById("todo-list");
  var mainCart = document.createElement("div");
  mainCart.classList = "todo-card";
  mainCart.id= todoId;
  var todoDiv = document.createElement("div");
  var Message = document.createElement("h3");
  Message.classList = "todo-message";
  Message.innerHTML = message;
  todoDiv.appendChild(Message);
  var creatTime = document.createElement("p");
  creatTime.classList = "todo-time";
  creatTime.innerHTML = currentTime;
  todoDiv.appendChild(creatTime);
  mainCart.appendChild(todoDiv);
  var iconWrapper = document.createElement("div");
  var deletIcon = document.createElement("i");
  var editIcon = document.createElement("i");
  deletIcon.classList = "fas fa-trash icon";
  deletIcon.onclick = function(){
    var todoCard = document.getElementById(todoId) 
    MaintodoList.removeChild(todoCard)
    removeTodoFormStorage(todoId)
  }

  editIcon.classList = "fas fa-pen icon";
  editIcon.onclick = function (){
    alert('Editing')
  }
  iconWrapper.appendChild(editIcon);
  iconWrapper.appendChild(deletIcon);
  mainCart.appendChild(iconWrapper);
  MaintodoList.appendChild(mainCart);
}

todoInput.onkeyup = function (eObj) {
  if (eObj.key === "Enter") {
    console.log(todoInput.value);
    if (todoInput.value.length > 0) {
      var currentTime = timeDate();
      var message = todoInput.value;
      var todoId = new Date().getTime();
      renderTodoCard(message, currentTime, todoId);
      todoInput.value = "";

      var obj = {
        id: todoId,  
        message: message,
        createdTime: currentTime,
      };

      var http = new XMLHttpRequest()
      http.open('POST', 'https://607c412c67e6530017573d5a.mockapi.io/todo', true);
      http.onreadystatechange = function (){
          if(this.readyState === 4){
              alert('Todo is completed!!')
          }
      }
      http.send(JSON.stringify(obj));

    //   var todoList =
    //     localStorage.getItem("todo-list") === null
    //       ? []
    //       : JSON.parse(localStorage.getItem("todo-list"));
    //   todoList.push(obj);
    //   localStorage.setItem("todo-list", JSON.stringify(todoList));
    //   console.log(todoList);

    } else {
      alert("Please Enter the message!");
    }
  }
};


function timeDate() {
  var current = new Date();
  var hour =
    current.getHours() > 12 ? current.getHours() - 12 : current.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  var min = current.getMinutes();
  min = min < 10 ? "0" + min : min;
  var sec = current.getSeconds();
  sec = sec < 10 ? "0" + sec : sec;
  var suffix = current.getHours() > 12 ? "PM" : "AM";

  return hour + ":" + min + ":" + sec + " " + suffix;
}
