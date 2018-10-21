import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {


    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('/ingredients.json').then((response) => {
            this.setState({ingredients: response.data});
        }).catch(err => {
            this.setState({error: true});
        });
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((ingredient) => {
            return ingredients[ingredient];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0})

    };

    purchasingHandler = () => {
        this.setState({purchasing: true})
    };


    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];

        if (oldCount === 0) {
            return;
        }

        let updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };


    purchasingCanceled = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // console.log('Purchase continued');

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Andrija',
                address: 'Vogelna 7',
                country: 'Slovenia',
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fast'
        };

        this.setState({loading: true});

        axios.post('/orders.json', order).then((doc) => {
            this.setState({loading: false, purchasing: false});
        })
            .catch((err) => {
                this.setState({loading: true, purchasing: false});
            });

    };

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;


        if(this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ordered={this.purchasingHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disableInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                    />
                </>

            );
            orderSummary = (<OrderSummary
                price={this.state.totalPrice}
                purchaseCanceled={this.purchasingCanceled}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>);
        }

        return (
            <Aux>
                <Modal modalClosed={this.purchasingCanceled} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }


}

export default withErrorHandler(BurgerBuilder, axios);
