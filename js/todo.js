'use strict';

const date = document.querySelector('.date');
const day = document.querySelector('.day');
const input = document.querySelector('input');
const counter = document.querySelector('.todo__counter');
const doneCounter = document.querySelector('.done__counter');
const todoList = document.querySelector('.todo__list');
const todoDoneList = document.querySelector('.todo__doneList');
const clear = document.querySelector('.todo__clear');
const complete = document.querySelector('.todo__complete');
const hide = document.querySelector('.todo__hide');
let todoNone = document.querySelector('.todo__done');
const button = document.querySelector('button');

let todoElement, todoWhite, todoRed, todoDiv, todoElementLabel;
let todoDoneDiv, todoElementDone, todoElementLabelDone;
let inputText;
let number = 0;
let sorszam = 0;
let percent = 0;
let done = 0;

const dateHandler = () => {
    const now = new Date();
    let options = { weekday: 'long' };
    day.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
    date.textContent = new Intl.DateTimeFormat('en-GB').format(now);
}

const todoDoneHide = () => {
    hide.addEventListener('click', () => {
        complete.classList.toggle('hide');
        hide.textContent = hide.textContent.includes('Hide') ? 'Show Complete' : 'Hide Complete';
    })
}

const numberSet = (value) => {
    if (value === 0) {
        number = 0;
    } else if (value === 1) {
        number += 1;
    } else if (value === -1) {
        number -= 1;
    }
    counter.textContent = number;
}

const clearTodo = () => {
    let todoListLength = todoList.childNodes.length;
    while (todoListLength > 0) {
        todoList.removeChild(todoList.childNodes[todoListLength - 1]);
        todoListLength -= 1;
    }
    localStorage.clear();
    numberSet(0);
    sorszam = 0;
    todoNone.classList.remove('hide');
}

const deleteTodo = (ev) => {
    const todoDiv = ev.currentTarget.parentElement;
    const todoId = todoDiv.className.split(' ').pop();
    todoDiv.parentElement.removeChild(todoDiv);
    localStorage.removeItem(`todo${todoId}`);
    numberSet(-1);
    if (localStorage.length === 0) {
        todoNone.classList.remove('hide');
    }
}

const createRedElement = (element) => {
    todoRed = document.createElement('div');
    element.appendChild(todoRed);
    todoRed.className = ('hide');
    const redIcon = document.createElement('i');
    todoRed.appendChild(redIcon);
    redIcon.className = ('fa fa-trash');
    todoRed.addEventListener('click', deleteTodo);
}

const createTodoDiv = (sorszam) => {
    todoDiv = document.createElement('div');
    todoDiv.className = (`todoDiv todo${sorszam}`);
    todoElement = document.createElement('input');
    todoElement.setAttribute('type', 'checkbox');
    todoElement.setAttribute('id', `todo${sorszam}`);
    todoElement.setAttribute('name', `todo${sorszam}`);
    todoElementLabel = document.createElement('label');
    todoElementLabel.setAttribute('for', `todo${sorszam}`);
    todoElementLabel.innerHTML = inputText;
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(todoElement);
    todoDiv.appendChild(todoElementLabel);
    createRedElement(todoDiv);
    todoDiv.addEventListener('mouseover', ev => ev.currentTarget.lastChild.className = ('appearRed'));
    todoDiv.addEventListener('mouseleave', ev => ev.currentTarget.lastChild.className = ('hide'));
    todoElement.addEventListener('click', checkBox);
}

const toDo = () => {
    inputText = input.value;
    numberSet(1);
    sorszam += 1;
    localStorage.setItem(`todo${sorszam}`, inputText);
    input.value = '';
    createTodoDiv(sorszam);
    if (!todoNone.classList.contains('hide')) {
        todoNone.classList.add('hide');
    }
}

const createTodoDoneDiv = (ev) => {
    todoDoneDiv = document.createElement('div');
    todoDoneDiv.className = ('todoDoneDiv');
    todoElementDone = document.createElement('input');
    todoElementDone.setAttribute('type', 'checkbox');
    todoElementDone.setAttribute('id', `todoDone${sorszam}`);
    todoElementDone.setAttribute('name', `todoDone${sorszam}`);
    todoElementDone.checked = true;
    todoElementLabelDone = document.createElement('label');
    todoElementLabelDone.setAttribute('for', `todo${sorszam}`);
    todoElementLabelDone.innerHTML = ev.currentTarget.parentElement.textContent;
    todoDoneList.appendChild(todoDoneDiv);
    todoDoneDiv.appendChild(todoElementDone);
    todoDoneDiv.appendChild(todoElementLabelDone);
}

const checkBox = (ev) => {
    if (ev.currentTarget.checked === true) {
        ev.currentTarget.parentElement.parentElement.removeChild(ev.currentTarget.parentElement);
        createTodoDoneDiv(ev);
        done += 1;
        percent = done / sorszam;
        numberSet(-1);
        doneCounter.textContent = (percent * 100).toPrecision(3);
    }
}

const listenerSet = () => {
    button.addEventListener('click', toDo);
    clear.addEventListener('click', clearTodo);
}

const toDoStart = (i) => {
    createTodoDiv(i);
    todoElementLabel.textContent = localStorage.getItem(localStorage.key(i));
}

const start = () => {
    dateHandler();
    todoDoneHide();
    if (localStorage.length === 0) {
        todoNone.classList.remove('hide');
    } else {
        todoNone.classList.add('hide');
    }
    Object.keys(localStorage).forEach((element, index) => toDoStart(index));

    number = localStorage.length;
    counter.textContent = number;
    sorszam = number;
    listenerSet();
}
start();