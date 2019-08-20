import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withStyles } from "@bit/mui-org.material-ui.styles"
import TableRow from "@bit/mui-org.material-ui.table-row"
import TableCell from "@bit/mui-org.material-ui.table-cell"
import FormControl from "react-bootstrap/FormControl"
import TransactionInput from './TransactionInput';


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

const dateFormat = date => {
    const dateObj =  new Date(date);
    const fixedDateObj = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * -60000 );
    return fixedDateObj.toLocaleDateString();
}

class Transaction extends Component{
    constructor(){
        super()
        this.state={
            editing: false,
        }
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleEditClick(){
        this.setState({editing: true})
    }

    handleSave(id, newDesc, newAmt, newDate){
        // eslint-disable-next-line
        if(!newDesc.trim() || newAmt == 0) {
            return
        }
 
        this.props.onEdit(id, newDesc, newAmt, newDate)
        this.setState({editing: false})
    }

    handleCancel(){
        this.setState({editing: false})
    }

    render(){
        const {transaction} = this.props

        let element
        if (this.state.editing) {
            element = (
                <TransactionInput 
                    description={transaction.description}
                    amount={transaction.amount}
                    date={transaction.date}
                    onSave={(newDesc, newAmt, newDate) => this.handleSave(transaction.id, newDesc, newAmt, newDate)}
                    onCancel={() => this.handleCancel}
                />
            )
        } else {
            element = (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                        {transaction.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">{transaction.amount}</StyledTableCell>
                    <StyledTableCell align="left">{dateFormat(transaction.date)}</StyledTableCell>
                    <StyledTableCell align="left">
                        <button
                            className='editItem'
                            onClick={this.handleEditClick}
                        >
                            Edit
                        </button>
                        <button 
                            className='deleteItem' 
                            onClick={() => this.props.onDeleteClick(transaction.id)}
                            style={
                                {border:'none', backgroundColor: 'white'}
                            }
                        > 
                            <FontAwesomeIcon icon='times-circle' color='red'/> 
                        </button>                        
                    </StyledTableCell>
                </StyledTableRow>                
            )
        }
        
        

        return(
            element
        )

    }
}


export default Transaction


/*
    <li
        style={
            {
                color: amount > 0 ? 'green' : 'red'
            }
        }
    >
        {console.log(description)}
        {console.log(amount)}
        {description} {amount}
        <button 
            className='deleteItem' 
            onClick={onDeleteClick}
            style={
                {border:'none', backgroundColor: 'white'}
            }
        >
            <FontAwesomeIcon icon='times-circle' color='red'/> 
        </button>
    </li>
*/

/*

        element = this.state.editing ? 
        (<StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {transaction.description}
            </StyledTableCell>
            <StyledTableCell align="right">{transaction.amount}</StyledTableCell>
            <StyledTableCell align="right">{dateFormat(transaction.date)}</StyledTableCell>
            <StyledTableCell align="right">
                <button 
                    className="saveEdit"
                    onClick={this.handleSave}
                >
                    Save   
                </button>
                <button
                    className="cancelEdit"
                    onClick={this.handleCancel}
                >
                    Cancel    
                </button>                      
            </StyledTableCell>
        </StyledTableRow>)
        :(<StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {transaction.description}
            </StyledTableCell>
            <StyledTableCell align="right">{transaction.amount}</StyledTableCell>
            <StyledTableCell align="right">{dateFormat(transaction.date)}</StyledTableCell>
            <StyledTableCell align="right">
                <button
                    className='editItem'
                    onClick={this.handleEditClick}
                >
                    Edit
                </button>
                <button 
                    className='deleteItem' 
                    onClick={() => onDeleteClick}
                    style={
                        {border:'none', backgroundColor: 'white'}
                    }
                > 
                    <FontAwesomeIcon icon='times-circle' color='red'/> 
                </button>                        
            </StyledTableCell>
        </StyledTableRow>)

*/