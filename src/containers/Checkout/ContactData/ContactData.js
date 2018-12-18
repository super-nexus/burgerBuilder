import React, {Component} from 'react'
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/actions/index';

export class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street address'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },

            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 3
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country: '
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest', displayValue: 'Fastest'
                    },
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    };


    checkValidity(value, rules) {
        let isValid = true;

        if(!rules){return true;}

        if(rules.required && isValid){
            isValid = value.trim() !== '';
        }

        if(rules.minLength && isValid){
            isValid = value.length >= rules.minLength;
        }

        if(rules.maxLength && isValid){
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
       // console.log(this.props.ings);

        const formData = {};

        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        };

        this.props.onOrderBurger(order);

     //   this.setState({loading: true});

    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormData = {...this.state.orderForm};
        const updatedFormElement = {...updatedFormData[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
       // console.log(updatedFormElement);
        updatedFormData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifiers in updatedFormData){
            formIsValid = updatedFormData[inputIdentifiers].valid && formIsValid;
        }

        this.setState({orderForm: updatedFormData, formIsValid: formIsValid});
    };

    render() {

        let formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/*<Input elementType="..." elementConfig="..." className={classes.Input} type="text" name="name" placeholder="Your name: "/>*/}
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button clicked={this.orderHandler} disabled={!this.state.formIsValid} btnType='Success'>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (data) => dispatch(actions.purchaseBurger(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
