import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux' ;
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

const Counter = ({
    value,
    onIncrement,
    onDecrement
    }) => (
        <div>
            <h1> {value} </h1>
            <button onClick={onIncrement}> + </button>
            <button onClick={onDecrement}> - </button>
        </div>
);

const store = createStore(counter);


const render = () => {
    ReactDOM.render (
        <Counter 
        value = {store.getState()} 
        onIncrement={ () =>
            store.dispatch({
                type:'INCREMENT'
            })
        }
        onDecrement={ () =>
            store.dispatch({
                type:'DECREMENT'
            })
        }        
        />,
        document.getElementById('root')
    );
};

const addCounter = (list) => {
    list.push(0);
    return list;
};

const testAddCounter = () => {
    const listBefore = []; 
    const listAfter = [0];

    // deepFreeze(listBefore);

    expect (
        addCounter(listBefore)
    ).toEqual(listAfter);
}

testAddCounter();
console.log('All tests are passed');

store.subscribe(render);
render();