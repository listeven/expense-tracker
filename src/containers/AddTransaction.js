import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addTransaction } from '../actions'

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'



var formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

class AddTransaction extends Component{
    constructor(){
        super()
        this.state={
            amount: '',
            description: '',
            date: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState(
            {
                [name]: value
            }
        )
    }

    handleSubmit(e){
        e.preventDefault()
        const {dispatch} = this.props
        // eslint-disable-next-line
        if(!this.state.description.trim() || this.state.amount == 0) {
            return
        }

        dispatch(addTransaction(this.state.description, formatter.format(this.state.amount), this.state.date))
        this.setState({
            amount: '',
            description: '',
            date: ''
        })
    }

    render(){
        return(
            <div>
                <Form className="m-5" onSubmit={this.handleSubmit} >
                    <InputGroup>
                        <FormControl
                            type='text'
                            name='description'
                            value={this.state.description}
                            autoComplete='off'
                            onChange={this.handleChange}
                            placeholder='Description'
                        />
                        <FormControl
                            type='number'
                            name='amount'
                            value={this.state.amount}
                            autoComplete='off'
                            onChange={this.handleChange}
                            placeholder='Amount'
                            step='0.01'
                        />
                        <FormControl
                            type='date'
                            name='date'
                            value={this.state.date}
                            autoComplete='off'
                            onChange={this.handleChange}
                            placeholder='Date'
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

        )
    }
}


export default connect()(AddTransaction)

/*

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='number'
                        name='amount'
                        value={this.state.amount}
                        autoComplete='off'
                        onChange={this.handleChange}
                        placeholder='Amount'
                        step='0.01'
                    />

                    <input 
                        type='text'
                        name='description'
                        value={this.state.description}
                        autoComplete='off'
                        onChange={this.handleChange}
                        placeholder='Description'
                    />
                    <button type='submit'>
                        Add Transaction
                    </button>

                </form>

*/