import React from "react";
import AddTransaction from "../containers/AddTransaction"
import VisibleTransactionList from "../containers/VisibleTransactionList"

function ExpenseTracker() {
    return(
        <div>
            <AddTransaction />
            <VisibleTransactionList />
        </div>
    )
}

export default ExpenseTracker;