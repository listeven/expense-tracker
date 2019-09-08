import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from "@bit/mui-org.material-ui.styles";
import TableRow from "@bit/mui-org.material-ui.table-row";
import TableCell from "@bit/mui-org.material-ui.table-cell";
import FormControl from "react-bootstrap/FormControl";

// Styled table components
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
        super(props);
        this.state={
            newDesc: this.props.description,                // Set default values to the transactions initial values
            newAmt: this.props.amount,
            newDate: this.props.date
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e){
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value
            }
        );
    };

    // Renders a StyledTableRow similar to in Transaction.js but uses forms in the cells for user input
    render(){
        return(
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    <FormControl 
                        type="text"
                        name="newDesc"
                        value={ this.state.newDesc }
                        onChange={ this.handleChange }
                        autoComplete="off"
                        placeholder='Description'
                    />
                </StyledTableCell>
                <StyledTableCell align="left">
                    <FormControl 
                        type="number"
                        name="newAmt"
                        value={ this.state.newAmt }
                        onChange={ this.handleChange }
                        autoComplete="off"
                        step="0.01"
                    />                
                </StyledTableCell>
                <StyledTableCell align="left">
                    <FormControl 
                        type="date"
                        name="newDate"
                        value={ this.state.newDate }
                        onChange={ this.handleChange }
                    />                                
                </StyledTableCell>
                <StyledTableCell align="left">
                    <button 
                        className="saveEdit"
                        onClick={ () => this.props.onSave(this.state.newDesc, this.state.newAmt, this.state.newDate) }
                        style={ {border:'none', backgroundColor:'transparent'} }
                    >
                        <FontAwesomeIcon icon='check' color='green'/> 
                    </button>
                    <button
                        className="cancelEdit"
                        onClick={ () => this.props.onCancel() }
                        style={ {border:'none', backgroundColor:'transparent'} }
                    >
                        <FontAwesomeIcon icon='times-circle' color='red'/>                         
                    </button>                      
                </StyledTableCell>
            </StyledTableRow>    
        )
    };
};

export default TransactionInput;