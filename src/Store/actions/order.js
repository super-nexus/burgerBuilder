import * as actionTypes from './actions'
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,data) => {
        return{
            type: actionTypes.PURCHASE_BURGER_SUCCESS,
            orderId: id,
            orderData: data
        }
};

export const purchaseBurgerFailed = (error) => {
    return{
        type: actionTypes.CATCH_INGREDIENT_FAILED,
        error
    }
};

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData).then((doc) => {
            console.log("Post method");
            dispatch(purchaseBurgerSuccess(doc.data.name, orderData));
        })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            });

    }
};

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
};

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json').then((res) => {
            let fetchedOrders = [];

            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
          //  console.log(JSON.stringify(fetchedOrders));
           // this.setState({loading: false, orders: fetchedOrders});

            dispatch(fetchOrdersSuccess(fetchedOrders));

        }).catch((err) => fetchOrdersFail(err));
    }
};