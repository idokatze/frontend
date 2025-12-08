import {
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from 'redux'
import { carReducer } from './reducers/toy.reducer.js'
// import { userReducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({
    // carModule: carReducer,
    // userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
