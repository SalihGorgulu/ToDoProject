const form = document.getElementById("todo-form");
const newInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const filter = document.querySelector("#filter");
const clearAll = document.querySelector("#clear-todos");
const cardBody2 = document.querySelectorAll(".card-body")[1];
const cardBody1 = document.querySelectorAll(".card-body")[0];

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addToDoItem);
    document.addEventListener("DOMContentLoaded", loadAllList);
    clearAll.addEventListener("click", clearAllList);
    cardBody2.addEventListener("click", deleteListItem);
    filter.addEventListener("keyup", filterList);
}

function loadAllList() {
    newInput.value = "";
    console.log("DOM")
    const list = getAllListFromStorage();
    loadAllListToUI(list);
}

function getAllListFromStorage() {
    console.log("getAllListFromStorage");
    const list = JSON.parse(localStorage.getItem("todos"));
    if (!list == []) {
        return list;
    }
    return [];
}

function loadAllListToUI(storagelist) {
    console.log("loadAllListToUI");
    if (!storagelist == []) {
        storagelist.forEach(element => {
            addTodoToUI(element);
        });
    }
}

function addTodoToUI(listItem) {
    console.log("addTodoToUI")
    const text = document.createTextNode(listItem);
    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";
    a.innerHTML = "<i class='fa fa-remove'></i>";
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.appendChild(text);
    li.appendChild(a);
    todoList.appendChild(li);
}


function addToDoItem(e) {
    console.log("addToDoItem")
    const item = newInput.value.trim(); //trim boşluk sil
    if (!item == "") {
        addTodoToUI(item);
        addToDoToStorage(item);
        alertMessasge("info", "Item Added To List!");
    } else {
        alertMessasge("danger", "Input can not be Empty!");
    }
    newInput.value = "";
    e.preventDefault();
}

function addToDoToStorage(element) {
    console.log("addToDoToStorage")
    const list = getAllListFromStorage();
    list.push(element);
    const storageList = JSON.stringify(list);
    localStorage.setItem("todos", storageList);
}

function clearAllList() {
    todoList.innerHTML = "";
    localStorage.clear();
    alertMessasge("warning","ToDo List Cleared Successfully!");
}

function deleteListItem(e) {
    console.log("deleteListItem");
    if (e.target.className == "fa fa-remove") {
        deleteListItemFromUI(e);
        deleteListItemFromStorage(e);
        alertMessasge("primary",e.target.parentElement.parentElement.textContent+" Deleted!");
    }
}

function deleteListItemFromUI(e) {
    console.log("deleteListItemFromUI");
    e.target.parentElement.parentElement.remove();
}

function deleteListItemFromStorage(e) {
    console.log("deleteListItemFromStorage");
    const deleteName = e.target.parentElement.parentElement.textContent;
    console.log(deleteName);
    const list = getAllListFromStorage();
    list.forEach(function (item, index) {
        console.log(item, index);
        if (item == deleteName) {
            list.splice(index, 1);
        }
    });
    const storageList = JSON.stringify(list);
    localStorage.setItem("todos", storageList);
}

function filterList() {
    todoList.innerHTML = "";
    const list = getAllListFromStorage();
    list.forEach(function (item) {
        if (item.includes(filter.value)) {
            addTodoToUI(item);
        };
    })
}

function alertMessasge(type, message) {
    var alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    cardBody1.appendChild(alert);
    setTimeout(function () {
        alert.remove();
    },500)
}