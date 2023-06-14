import { createSlice } from '@reduxjs/toolkit';

import shortid from 'shortid';

import { fetchContacts, addContact } from './operations';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [fetchContacts.pending](state) {
            state.isLoading = true;
        },
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        [addContact.pending](state) {
            state.isLoading = true;
        },
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
                    id: shortid.generate(),
                    name: action.payload.name,
                    phone: action.payload.number,
                });
        },
        [addContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    reducers: {
        // addContact(state, action) {

        //     let includesName = false;
        //     state.items.map(contact => {
        //         contact.name === action.payload.name && (includesName = true);
        //         return includesName;
        //     });

        //     includesName
        //         ? alert(state.items.name + ' is already in contacts')
        //         : state.items.push({
        //             id: shortid.generate(),
        //             name: action.payload.name,
        //             phone: action.payload.number,
        //         });
        // },

        deleteContact(state, action) {
            state.items = state.items.filter(contact =>
                contact.id !== action.payload.id);
        },
    },
});

export const { deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;