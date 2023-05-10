import {createSlice} from "@reduxjs/toolkit"
const userSelectedSlice=createSlice({ 
 name:"userSelectedSlice", 
 initialState:{ 
    meetWithPatient:"",
    selectedUser:"",
    selectedReceiver:"",
    messagesProps:[]

 }, 
 reducers:{ 
  selectMeetWithPatient(state,action){ 
    state.meetWithPatient=action.payload;
   },
  selectUser(state,action){ 
   state.selectedUser=action.payload;
  },
  selectReceiver(state,action){ 
    state.selectedReceiver=action.payload;
   },
   selectMessagesProps(state,action){ 
    state.messagesProps=action.payload;
   },
  unselectedPoduct(state,action){ 
    state.selectedUser=null;
  },
  }
 }); 


export const { 
  selectUser, 
  unselectedPoduct, 
  selectReceiver,
  selectMeetWithPatient,
  selectMessagesProps
  }=userSelectedSlice.actions;
export default userSelectedSlice.reducer;