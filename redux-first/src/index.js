import { createStore, combineReducers } from 'redux';
import { ADD_TO_CART, addToCart }  from './actions/cart-actions';

const productsReducer = function(state=[], action) {
  return state;
}

const initialState = {
    cart: [
      {
        product: 'bread 700g',
        quantity: 2,
        unitCost: 90
      },
      {
        product: 'milk 500ml',
        quantity: 1,
        unitCost: 47
      }
    ]
  }


  const cartReducer = function(state=initialState, action) {
    switch (action.type) {
      case ADD_TO_CART: {
        return {
          ...state,
          cart: [...state.cart, action.payload]
        }
      }
  
      default:
        return state;
    }
  }


const allReducers = {
    products: productsReducer,
    shoppingCart: cartReducer
}

const rootReducer = combineReducers(allReducers);

let store = createStore(rootReducer);

console.log("initial state: ", store.getState());


let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();