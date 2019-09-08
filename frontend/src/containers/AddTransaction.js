import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { addTransaction } from '../actions';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

// Get current date for default value of date form
const currDate = moment().format("YYYY-MM-DD");

class AddTransaction extends Component{
    constructor(props){
        super(props);
        this.state={
            amount: '',
            description: '',
            date: currDate,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e){
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value
            }
        );
    };

    handleSubmit(e){
        e.preventDefault();
        // eslint-disable-next-line
        if(!this.state.description.trim() || this.state.amount == 0 || !this.state.date) {
            return;
        }

        const newTransaction = {
            id: this.props.transactions.reduce((maxId, transaction) => Math.max(transaction.id, maxId), -1) + 1,
            description: this.state.description,
            amount: Number(this.state.amount).toFixed(2),
            date: this.state.date
        };

        // Post newTransaction to our database
        axios.post('http://localhost:5000/api/transactions/add', newTransaction)
            .then(res => console.log(res))
            .catch(err => console.log("Post failed. Error: " + err));

        // Add newTransaction to our store
        this.props.addTransaction(newTransaction);

        this.setState({
            amount: '',
            description: '',
            date: currDate
        });
    };

    render(){
        return(
            <div>
                <Form className="m-5" onSubmit={ this.handleSubmit } >
                    <InputGroup>
                        <FormControl
                            type='text'
                            name='description'
                            value={ this.state.description }
                            autoComplete='off'
                            onChange={ this.handleChange }
                            placeholder='Description'
                        />
                        <FormControl
                            type='number'
                            name='amount'
                            value={ this.state.amount }
                            autoComplete='off'
                            onChange={ this.handleChange }
                            placeholder='Amount'
                            step='0.01'
                        />
                        <FormControl
                            type='date'
                            name='date'
                            value={ this.state.date }
                            autoComplete='off'
                            onChange={ this.handleChange }
                        />                        
                        <InputGroup.Append>
                            <Button 
                                variant="outline-secondary" 
                                type="submit"
                            >Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions.transactionList
    };
};

const mapDispatchToProps = {
    addTransaction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTransaction);
