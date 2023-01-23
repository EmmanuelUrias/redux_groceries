// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = {
    groceries: []
}

const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type) {
        case 'grocery/add': 
            return [
                ...state, {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default: 
        return state
    }
}

let store = Redux.createStore(groceryReducer)

const renderList = (state) => {
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        // Generate a new list element for each grocery item
        let li = document.createElement('li')
        // Append the new element to our list DOM element, we targeted
        // it at the beginning of this code-along!
        list.appendChild(li)
        // Populate the text content of the list item
        li.textContent = grocery.text
    })
}

const newGrocery = (e) => {
    e.preventDefault() // stops page from refreshing
    let groceryText = document.getElementById('newItem').value
    console.log(typeof groceryText)
    store.dispatch({
        type: 'grocery/add',
        payload: groceryText
    })
    console.log(store.getState())
}

const clearList = () => {
    document.getElementById('newItem').value = '' // clears out text content from input
    store.dispatch({
        type: 'grocery/clear'
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

grocerySubmit.addEventListener('click', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

store.subscribe(render)

