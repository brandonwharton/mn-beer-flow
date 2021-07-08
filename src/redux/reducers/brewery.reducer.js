import { combineReducers } from 'redux';

// reducer to hold current state for brewery details
const breweryList = (state = [], action) => {
    switch(action.type) {
        case 'SET_BREWERY_DATA':
            return action.payload;
        default:
            return state;
    }
}

// reducer to hold favorite breweries
const favoritesList = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAVORITES_DATA':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    breweryList,
    favoritesList,
});
