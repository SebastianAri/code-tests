import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-4ed45-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceriesInDB = ref(database, 'groceries')

console.log(app)

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')


onValue(groceriesInDB, function(snapshot){
    let groceriesArray = Object.values(snapshot.val())

    for (let i = 0; i < groceriesArray.length; i++){
        console.log(groceriesArray[i])
    }
})


addButtonEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value

    push(groceriesInDB, inputValue)

    clearInputFieldEl()

    appendItemToShoppingListEl(inputValue)

})

function clearInputFieldEl(){
    inputFieldEl.value = ''
}

function appendItemToShoppingListEl(itemValue){
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}