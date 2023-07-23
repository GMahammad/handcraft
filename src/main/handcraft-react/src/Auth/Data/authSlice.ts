import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userEmail: '',
  name:'',
  accessToken: '',
  tokenType: '',
  roles: '',
  isAuthenticated:false
};

const authSlice = createSlice({
  name: "auth",
  initialState:initialAuthState,
  reducers: {
    loginSuccess: (state: any, action) => {
        const {user} = action.payload;
      state.userEmail = user.email
      state.name = user.firstName
      state.accessToken = user.accessToken
      state.tokenType = user.tokenType
      state.roles = user.roles
    },
    isAuthenticatedChecker:(state:any)=>{
        if(state.roles.includes('USER') === true){
            state.isAuthenticated = true
        }
    },
    logout:(state:any)=>{
        state.userEmail=""
        state.accessToken=""
        state.tokenType=""
        state.roles=[]
        state.isAuthenticated = false
    }
  },
});
export const {loginSuccess,isAuthenticatedChecker,logout} = authSlice.actions;
export default authSlice.reducer;
