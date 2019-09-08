import { ADD_TRANSACTION, READ_TRANSACTION, EDIT_TRANSACTION, DELETE_TRANSACTION } from '../actions';
import { FETCH_ITEMS_BEGIN, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE } from '../actions';

const initialState = {
    transactionList: []
};

export default function transactions(state = initialState, action){
    switch(action.type){
        case ADD_TRANSACTION:
            return {
                transactionList: 
                    [
                        ...state.transactionList, action.payload.transaction
                    ]
            };
        case READ_TRANSACTION:
            return state;
        case EDIT_TRANSACTION:
            const updatedTransaction = { ...action.payload.transaction };
            return {
                transactionList: state.transactionList.map(transaction => 
                    transaction.id === updatedTransaction.id ? updatedTransaction : transaction
                )
            };           
        case DELETE_TRANSACTION:
            return {
                transactionList: state.transactionList.filter(transaction =>
                    transaction.id !== action.payload.id
                )
            };
        case FETCH_ITEMS_BEGIN:
            return {
                ...state,
                loading: true,
                errors: null
            };
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactionList: action.payload.items
            };
        case FETCH_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors,
                transactionList: []
            };
        default:
            return state;
    }
};