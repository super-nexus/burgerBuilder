import * as actionType from '../actions/actions';
import {updateObject} from "../utility";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const burgerBuilder = (state = initialState, action) => {

    switch(action.type){

        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            };

        case actionType.CATCH_INGREDIENT_FAILED:
            return{
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default burgerBuilder;