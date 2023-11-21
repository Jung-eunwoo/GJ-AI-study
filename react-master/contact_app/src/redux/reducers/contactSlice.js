import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name:'contact',
    initialState:{
        contacts:[],
        filterContacts:[],
        keyword: [],
    },
    reducers: {
        addContact:(state, action) => {
            state.contacts = state.contacts.concat(action.payload)
        },
        searchContact:(state, action) => {
            // like로 수정할 예정
            state.keyword = state.contacts.filter((item)=>item.id===action.payload.keyword)
        }
    }
})

// conponenet 접근
export const ContactReducerActions = contactSlice.actions

// store 접근
export default contactSlice.reducer