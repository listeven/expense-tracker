import { connect } from 'react-redux';
import TransactionList from '../components/TransactionList'
import { deleteTransaction, editTransaction } from '../actions'
// Can update later to show transactions based on category or something similar
// Using a function that filters our transactions that will be called inside mapStateToProps

const mapStateToProps = state => {
    return {
        transactions: state.transactions
    }
}

const mapDispatchToProps = dispatch => (
    {
        onDeleteClick: id => {
            dispatch(deleteTransaction(id))
        },
        onEdit: (id, description, amount, date) => {
            dispatch(editTransaction(id, description, amount, date))
        }
    }
)

const VisibleTransactionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionList)

export default VisibleTransactionList