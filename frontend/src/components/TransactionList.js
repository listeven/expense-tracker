import React, { Component } from 'react';
import { withStyles } from "@bit/mui-org.material-ui.styles";
import Table from "@bit/mui-org.material-ui.table";
import TableBody from "@bit/mui-org.material-ui.table-body";
import TableCell from "@bit/mui-org.material-ui.table-cell";
import TableHead from "@bit/mui-org.material-ui.table-head";
import TableRow from "@bit/mui-org.material-ui.table-row";
import Paper from "@bit/mui-org.material-ui.paper";
import Transaction from "./Transaction";

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

class TransactionList extends Component {
    //eslint-disable-next-line
    constructor(props){
        super(props);
    };

    // Initial call to read transactions from our database
    componentDidMount(){
        this.props.readTransactions();
    };

    render(){
        const { classes, transactions, deleteTransaction, editTransaction } = this.props;
        let reversedTransactions = [...transactions].reverse();
        return (
            <Paper className={ classes.root }>
                <Table className={ classes.table }>
                    <colgroup>
                        <col style={{width:'35%'}}/>
                        <col style={{width:'25%'}}/>
                        <col style={{width:'25%'}}/>
                        <col style={{width:'15%'}}/>
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell align="left">Amount</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { 
                            reversedTransactions.map(transaction => {
                            return (
                                <Transaction key={ transaction.id } transaction={ transaction } onDeleteClick={ deleteTransaction } onEdit={ editTransaction }/>
                            )})
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    };
};

export default withStyles(styles)(TransactionList);
