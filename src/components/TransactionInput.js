import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withStyles } from "@bit/mui-org.material-ui.styles"
import TableRow from "@bit/mui-org.material-ui.table-row"
import TableCell from "@bit/mui-org.material-ui.table-cell"
import FormControl from "react-bootstrap/FormControl"


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

class TransactionInput extends Component{
    constructor(props){
        super(props)
        this.state={
            newDesc: this.props.description,
            newAmt: this.props.amount,
            newDate: this.props.date

        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(e){
        const {name, value} = e.target
        this.setState(
            {
                [name]: value
            }
        )
    }

    render(){
        return(
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    <FormControl 
                        type="text"
                        name="newDesc"
                        value={this.state.newDesc}
                        onChange={this.handleChange}
                        autoComplete="off"
                        placeholder='Description'
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <FormControl 
                        type="number"
                        name="newAmt"
                        value={this.state.newAmt}
                        onChange={this.handleChange}
                        autoComplete="off"
                        placeholder='Amount'
                        step="0.01"
                    />                
                </StyledTableCell>
                <StyledTableCell align="left">
                    <FormControl 
                        type="date"
                        name="newDate"
                        value={this.state.newDate}
                        onChange={this.handleChange}
                    />                                
                </StyledTableCell>
                <StyledTableCell align="left">
                    <button 
                        className="saveEdit"
                        onClick={() => this.props.onSave(this.state.newDesc, this.state.newAmt, this.state.newDate)}
                    >
                        Save   
                    </button>
                    <button
                        className="cancelEdit"
                        onClick={() => this.props.onCancel()}
                    >
                        Cancel    
                    </button>                      
                </StyledTableCell>
            </StyledTableRow>    
        )
    }


}

export default TransactionInput