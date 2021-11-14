import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser : null,
    user : null
}

export const currSlice = createSlice({
    name  : 'statevalues',
    initialState,
    reducer : {
        setCurrentUser : (state, action) => {
            state.currentUser = action.payload
        },
        setUser : (state, action) => {
            state.user = action.payload
        }
    }
});

export const {setCurrentUser, setUser} = currSlice.reducer;

export const selectCurrentUser = (state) => state.statevalues.currentUser
export const selectUser = (state) => state.statevalues.user

export default currSlice.reducer