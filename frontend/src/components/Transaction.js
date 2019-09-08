import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from "@bit/mui-org.material-ui.styles";
import TableRow from "@bit/mui-org.material-ui.table-row";
import TableCell from "@bit/mui-org.material-ui.table-cell";
import TransactionInput from './TransactionInput';

// Date formatter from moment.js
const dateFormat = date => (moment(date).format('l'));

// Number formatter to display our transaction amounts properly
const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// Styled table components to be used in our table
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


class Transaction extends Component{
    constructor(){
        super();
        this.state={
            editing: false,         // state variable to know when a transaction is being edited
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    handleEditClick(){
        this.setState({ editing: true });
    };

    handleSave(id, newDesc, newAmt, newDate){
        // eslint-disable-next-line
        if(!newDesc.trim() || newAmt == 0) {
            return;
        }
        const updatedTransaction = {
            id: id,
            description: newDesc,
            amount: Number(newAmt).toFixed(2),
            date: newDate
        };

        // Update transaction in our database
        axios.put("http://localhost:5000/api/transactions/update/" + id, updatedTransaction)
            .then((res) => console.log(res))
            .catch(err => console.log("Update failed. Error: " + err));

        // Update transaction in our store
        this.props.onEdit(updatedTransaction);
        this.handleCancel();
    };

    handleDelete(id){
        // Delete transaction from our database
        axios.delete("http://localhost:5000/api/transactions/" + id)
            .then(() => console.log("Item deleted"))
            .catch(err => console.log("Error: " + err));

        // Delete transaction from our store
        this.props.onDeleteClick(id);
    };

    handleCancel(){
        this.setState({ editing: false });
    };

    render(){
        const { transaction } = this.props;

        let element;    // Element will be either TransactionInput component or a StyledTableRow component depending on editing state
        if (this.state.editing) {
            element = (
                <TransactionInput 
                    description={ transaction.description }
                    amount={ transaction.amount }
                    date={ transaction.date }
                    onSave={ (newDesc, newAmt, newDate) => this.handleSave(transaction.id, newDesc, newAmt, newDate) }
                    onCancel={ () => this.handleCancel() }
                />
            )
        } else {
            element = (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                        { transaction.description }
                    </StyledTableCell>
                    <StyledTableCell align="left">{ formatter.format(transaction.amount) }</StyledTableCell>
                    <StyledTableCell align="left">{ dateFormat(transaction.date) }</StyledTableCell>
                    <StyledTableCell align="left">
                        <button
                            className='editItem'
                            onClick={ this.handleEditClick }
                            style={ {border:'none', backgroundColor: 'transparent'} }
                        >
                            <FontAwesomeIcon icon='pen' color='grey'/> 
                        </button>
                        <button 
                            className='deleteItem' 
                            onClick={ () => this.handleDelete(transaction.id) }
                            style={ {border:'none', backgroundColor: 'transparent'} }
                        > 
                            <FontAwesomeIcon icon={ ['far', 'trash-alt'] } color='grey'/> 
                        </button>                        
                    </StyledTableCell>
                </StyledTableRow>                
            )
        }
                
        return(
            element     // Display the appropriate element
        );
    };
};

export default Transaction;
