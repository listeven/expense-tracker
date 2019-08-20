import {ADD_TRANSACTION, DELETE_TRANSACTION, EDIT_TRANSACTION} from '../actions'

const initialState = [
    {
        id: 0,
        description: 'Chipotle',
        amount: -10.99,
        date: '08-01-2019'
    }
]

export default function transactions(state = initialState, action){
    switch(action.type){
        case ADD_TRANSACTION:
            return [
                ...state,
                {
                    id: state.reduce((maxId, transaction) => Math.max(transaction.id, maxId), -1) + 1,
                    description: action.description,
                    amount: action.amount,
                    date: action.date
                }
            ]
            
        case DELETE_TRANSACTION:
            return state.filter(transaction =>
                transaction.id !== action.id
            )
        case EDIT_TRANSACTION:
            return state.map(transaction =>
                transaction.id === action.id ?
                {
                    ...transaction,
                    description: action.description,
                    amount: action.amount,
                    date: action.date
                } : transaction
            )
        default:
            return state
    }
}