import { combineReducers } from 'redux'
import transactions from './transactions'

// Can easily add more reducers later on
const expenseTracker = combineReducers({
    transactions
})

export default expenseTracker