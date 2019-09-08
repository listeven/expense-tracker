import axios from 'axios';

export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const READ_TRANSACTION = 'READ_TRANSACTION'

export const FETCH_ITEMS_BEGIN = 'FETCH_ITEMS_BEGIN'
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE'


export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
})

export const fetchItemsSuccess = items => ({
    type: FETCH_ITEMS_SUCCESS,
    payload: { items }
})

export const fetchItemsFailure = errors => ({
    type: FETCH_ITEMS_FAILURE,
    payload: { errors }    
})

export const addTransaction = transaction => ({
    type: ADD_TRANSACTION,
    payload: { transaction }
})

export const readTransactions = () => {
    return dispatch => {
        dispatch(fetchItemsBegin());
        return axios.get('http://localhost:5000/api/transactions')
            .then(({data}) => {
                console.log("Success");
                dispatch(fetchItemsSuccess(data));
            })
            .catch(error => dispatch(fetchItemsFailure(error)));
    }
}

export const editTransaction = transaction => ({
    type: EDIT_TRANSACTION,
    payload: { transaction }
})

export const deleteTransaction = id => ({
    type: DELETE_TRANSACTION,
    payload: { id }
})
