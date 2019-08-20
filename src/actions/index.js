export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION'


export const addTransaction = (description, amount, date) => ({
    type: ADD_TRANSACTION,
    description,
    amount,
    date
})

export const deleteTransaction = (id) => ({
    type: DELETE_TRANSACTION,
    id
})

export const editTransaction = (id, description, amount, date) => ({
    type: EDIT_TRANSACTION,
    id,
    description,
    amount,
    date
})