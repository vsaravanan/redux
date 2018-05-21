import { createStore } from 'redux';
import { addToCart }  from './actions/cart-actions';
import rootReducer from './reducers/index';



let store = createStore(rootReducer);

console.log("initial state: ", store.getState());


let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();