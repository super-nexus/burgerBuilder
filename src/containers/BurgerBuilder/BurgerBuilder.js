import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../Store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {


    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((ingredient) => {
            return ingredients[ingredient];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0
    };

    purchasingHandler = () => {
        this.setState({purchasing: true})
    };


    // addIngredientHandler = (type) => {
    //     let oldCount = this.state.ingredients[type];
    //     let updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     let oldCount = this.state.ingredients[type];
    //
    //     if (oldCount === 0) {
    //         return;
    //     }
    //
    //     let updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //
    //     updatedIngredients[type] = updatedCount;
    //
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };


    purchasingCanceled = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {

        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

/*        if (this.state.loading) {
            orderSummary = <Spinner/>
        }*/

        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;


        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ordered={this.purchasingHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.totalPrice}
                        disabled={disableInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                    />
                </>

            );
            orderSummary = (<OrderSummary
                price={this.props.totalPrice}
                purchaseCanceled={this.purchasingCanceled}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>);
        }

        return (
            <>
                <Modal modalClosed={this.purchasingCanceled} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );

    }

}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};
const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
