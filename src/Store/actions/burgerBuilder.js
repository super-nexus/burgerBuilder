import * as actionTypes from './actions';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
};

export const removeIngredient = (ingredientName) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
};

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
};

export const catchIngredientFailed = () => {
    return{
        type: actionTypes.CATCH_INGREDIENT_FAILED
    }
}

export const initIngredient = () => {

    return dispatch => {

         axios.get('/ingredients.json').then((response) => {
             dispatch(setIngredients(response.data));
         }).catch(err => {
             dispatch(catchIngredientFailed());
         });

    }

};