import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

        const ingredientSummary = Object.keys(props.ingredients).map((ingredientKey) => {
            return (
                <li key={ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
                </li>
            );
        });


        return (
            <>
                <h3>Your order</h3>
                <p>Delicious burger with following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>

                <p><strong>Price: {props.price.toFixed(2)} </strong></p>

                <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </>
        );
    }
;

export default orderSummary;