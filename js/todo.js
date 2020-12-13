let pendingItems = 0;
let completedItems = 0;
const showButton = document.querySelector('.show__button');
document.querySelector('.add__button').addEventListener('click', newListItem);
showButton.addEventListener('click', showComplete);
document.querySelector('.clear__button').addEventListener('click', clearAll);

const addDate = () => {
    const today = new Date();
    const dayDisplayed = document.querySelector('.current__day');
    const dateDisplayed = document.querySelector('.current__date');
    let weekday = today.toLocaleString('en-US', { weekday: "long" })
    let date = today.toLocaleDateString('en-US');
    dayDisplayed.textContent = weekday;
    dateDisplayed.textContent = date;
}

addDate()

const updatePending = () => {
    const pending = document.querySelector('.pending__items');
    if (pendingItems === 0) {
        pending.textContent = `
                    🍻
        Time to chill! You have no todos.`
    }
    else {
        pending.textContent = `You have ${pendingItems} pending tasks(s).`
    }
}

const updateCompleted = () => {
    const completed = document.querySelector('.completed__tasks');
    completed.textContent = `You have ${completedItems} completed tasks(s).`
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

const checkStorage = () => {
    let tasks = [];
    Object.keys(localStorage).forEach(function(key) {
        tasks.push(key);
     });
    if (tasks !== []) {
        for (let i=0; i<tasks.length; i++) {
            const li = document.createElement("li");
            const checkBox = document.createElement("input");
            const closeButton = document.createElement("i");
            const text = document.createElement('span');
            text.textContent = tasks[i];
            text.classList.add('list__text');
            checkBox.type = 'checkbox';
            checkBox.classList.add('list__checkbox');
            closeButton.classList.add('close__button', 'fa', 'fa-trash');
            itemGenerator(li, checkBox, text, closeButton);
            listenerGenerator(li, checkBox, text, closeButton);
            pendingItems++
            updatePending();
        }
    }
    updatePending();
}

checkStorage();

function textGenerator() {
    const text = document.createElement('span');
    let inputValue = document.querySelector(".input__field").value;
    if (inputValue === '') {
        inputValue = document.querySelector(".input__field").placeholder;
    }
    text.textContent = inputValue;
    text.classList.add('list__text');
    return text;
}

function itemGenerator(li, checkBox, text, closeButton) {
    li.appendChild(checkBox);
    li.appendChild(text);
    li.appendChild(closeButton);
    document.querySelector(".list").appendChild(li);
    setTimeout(function () {
        li.classList.add("show");
    }, 10);
    localStorage.setItem(text.textContent, text);
}

function notDuplicate(text) {
    const list = document.querySelector(".list").children;
    for (let i = 0; i < list.length; i++) {
        if (text.textContent === (list[i].children[1]).textContent) {
            return false;
        }
    }
    return true;
}

function removeItem(li, text) {
    li.removeChild(li.lastChild);
    document.querySelector(".list").removeChild(li);
    localStorage.removeItem(text.textContent);
    pendingItems = pendingItems - 1;
    updatePending();
}

function addCompletedItem(li) {
    completedItems++;
    updateCompleted();
    document.querySelector(".list__completed").appendChild(li);
}

function listenerGenerator(li, checkBox, text, closeButton) {

    li.addEventListener('mouseover', () => {
        closeButton.classList.add('show');
    });
    li.addEventListener('mouseout', () => {
        closeButton.classList.remove('show');
    });

    closeButton.addEventListener('click', () => {
        removeItem(li, text);
    });

    checkBox.addEventListener('click', () => {
        removeItem(li, text);
        addCompletedItem(li);
    });

}

function newListItem() {

    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    const closeButton = document.createElement("i");
    checkBox.type = 'checkbox';
    checkBox.classList.add('list__checkbox');
    closeButton.classList.add('close__button', 'fa', 'fa-trash');
    let text = textGenerator();
    if (notDuplicate(text)) {
        itemGenerator(li, checkBox, text, closeButton);
        listenerGenerator(li, checkBox, text, closeButton);

        pendingItems++
        updatePending();
    }
    document.querySelector(".input__field").value = "";
}

function clearAll() {
    const list1 = document.querySelector(".list__completed");
    while (list1.firstChild) {
        list1.removeChild(list1.lastChild);
    }
    completedItems = 0;
    showComplete();

}

function showComplete() {
    const completed = document.querySelector('.completed__tasks');
    const list = document.querySelector(".list__completed");
    if (showButton.textContent === 'Show Complete') {
        if (completedItems > 0) {
            completed.classList.add('show');
            list.classList.add('show');
            showButton.textContent = 'Hide Complete';
        }
    } else {
        completed.classList.remove('show');
        list.classList.remove('show');
        showButton.textContent = 'Show Complete';
    }
}
