import { connect } from 'react-redux';
import TransactionList from '../components/TransactionList';
import { deleteTransaction, editTransaction, readTransactions } from '../actions';
// Can update later to show transactions based on category or something similar
// Using a function that filters our transactions that will be called inside mapStateToProps

const mapStateToProps = state => {
    return {
        transactions: state.transactions.transactionList
    }
};

// Can be an object instead of function
const mapDispatchToProps = {
    deleteTransaction,
    editTransaction,
    readTransactions
};

const VisibleTransactionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionList);

export default VisibleTransactionList;

// Function version of mapDispatchToProps
// const mapDispatchToProps = dispatch => (
//     {
//         onDeleteClick: id => {
//             dispatch(deleteTransaction(id))
//         },
//         onEdit: transaction => {
//             dispatch(editTransaction(transaction))
//         },
//         onRead: () => {
//             dispatch(readTransactions())
//         }
//     }
// )