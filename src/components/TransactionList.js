import React from 'react';
import { withStyles } from "@bit/mui-org.material-ui.styles";
import Table from "@bit/mui-org.material-ui.table";
import TableBody from "@bit/mui-org.material-ui.table-body";
import TableCell from "@bit/mui-org.material-ui.table-cell";
import TableHead from "@bit/mui-org.material-ui.table-head";
import TableRow from "@bit/mui-org.material-ui.table-row";
import Paper from "@bit/mui-org.material-ui.paper";
import Transaction from "./Transaction"

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto', 
    },
    table: {
        minWidth: 650,
    },
});

const dateFormat = date => {
    const dateObj =  new Date(date);
    const fixedDateObj = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * -60000 );
    return fixedDateObj.toLocaleDateString();
}

function TransactionList({classes, transactions, onDeleteClick, onEdit}) {
    console.log(onDeleteClick)
    console.log(onEdit)
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell align="left">Amount</StyledTableCell>
                        <StyledTableCell align="left">Date</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transaction => {
                        return (
                            <Transaction key={transaction.id} transaction={transaction} onDeleteClick={onDeleteClick} onEdit={onEdit}/>
                        )})
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(TransactionList);

/*
const TransactionList = ({transactions, onDeleteClick}) => (
    <ul>
        {transactions.map((transaction) => (
           <Transaction key={transaction.id} {...transaction} onDeleteClick={() => onDeleteClick(transaction.id)}/>
        )) }
    </ul>
)

export default TransactionList
*/


/*

                            <StyledTableRow key={transaction.id}>
                                <StyledTableCell component="th" scope="row">
                                    {transaction.description}
                                </StyledTableCell>
                                <StyledTableCell align="left">{transaction.amount}</StyledTableCell>
                                <StyledTableCell align="left">{dateFormat(transaction.date)}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <button 
                                        className='deleteItem' 
                                        onClick={() => onDeleteClick(transaction.id)}
                                        style={
                                            {border:'none', backgroundColor: 'white'}
                                        }
                                    > 
                                        <FontAwesomeIcon icon='times-circle' color='red'/> 
                                    </button>                        
                                </StyledTableCell>
                            </StyledTableRow>

*/