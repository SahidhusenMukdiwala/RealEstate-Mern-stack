import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error:null,
    loading:false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        // state will give you access of initial state properties . 
        signInStart: (state) =>{
            state.loading = true;
        },
        signInSuccess:(state,action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state,action) =>{
            state.loading = true;
        },
        updateUserSuccess:(state,action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart:(state) =>{
            state.loading = true;
        },
        signOutUserSuccess:(state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        DeleteUserStart:(state) =>{
            state.loading = true;
        },
        DeleteUserSuccess:(state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        DeleteUserFailure:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,updateUserSuccess,updateUserFailure,updateUserStart,signOutUserFailure,signOutUserStart,signOutUserSuccess,DeleteUserFailure,DeleteUserStart,DeleteUserSuccess} =userSlice.actions

export default userSlice.reducer; 