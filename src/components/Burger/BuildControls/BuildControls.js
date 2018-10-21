import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controlls = [{label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}];

const buildControlls = (props) => {


    return (
        <div className={classes.BuildControls}>

            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>

            {controlls.map((item) => {
                return <BuildControl disabled={props.disabled[item.type]}
                                     removed={() => props.ingredientRemoved(item.type)}
                                     added={() => props.ingredientAdded(item.type)} key={item.label}
                                     label={item.label}/>;
            })}

            <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>

        </div>
    );
};

export default buildControlls;