import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token : null , firstname : null , username : null },
};

export const userSlice = createSlice({
 name: 'friends',
  initialState,
 reducers: {
   login: (state, action) => {
    console.log("login")
     state.value = action.payload
   },
   logout:(state) =>{
    state.value= {token : null , firstname : null , username : null };
   }
 },
});

export const { login,logout } = userSlice.actions;
export default userSlice.reducer;