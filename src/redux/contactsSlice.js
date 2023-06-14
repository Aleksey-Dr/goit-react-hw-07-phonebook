import { createSlice } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [fetchContacts.pending]: handlePending,
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected]: handleRejected,

        [addContact.pending]: handlePending,
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            let includesName = false;
            state.items.map(contact => {
                contact.name === action.payload.name && (includesName = true);
                return includesName;
            });

            includesName
                ? alert(state.items.name + ' is already in contacts')
                : state.items.push({
                    name: action.payload.name,
                    phone: action.payload.number,
                    id: action.payload.id,
                });
        },
        [addContact.rejected]: handleRejected,

        [deleteContact.pending]: handlePending,
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = state.items.filter(contact =>
                contact.id !== action.payload.id);
        },
        [deleteContact.rejected]: handleRejected,
    },
});

export default contactsSlice.reducer;