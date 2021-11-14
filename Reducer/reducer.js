import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";

const reducers = combineReducers({
    currentUser : currentUserReducer
})

export default reducers