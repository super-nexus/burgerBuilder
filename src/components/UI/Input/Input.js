import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;

    let inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case('select'):
            inputElement =
            (<select onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;