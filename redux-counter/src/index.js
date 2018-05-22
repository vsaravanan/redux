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


const renderOld = () => {
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
    //list.push(0);
    return [...list, 0];
};

const removeCounter = (list, index) => {
    //list.splice(index, 1);
    //return list;
    // return list
    // .slice(0, index)
    // .concat(list.slice(index + 1));

    return [
        ...list.slice(0,index),
        ...list.slice(index+1)
    ];
};

const testAddCounter = () => {
    const listBefore = []; 
    const listAfter = [0];

    deepFreeze(listBefore);

    expect (
        addCounter(listBefore)
    ).toEqual(listAfter);
}


const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);

    expect (
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
}

const incrementCounter = (list, index) => {
    // return list
    //   .slice(0, index)
    //   .concat(list[index] + 1)
    //   .concat(list.slice(index + 1));
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
      ];

   };

// write a test/assertion before implementing the function:
const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter  = [0, 11, 20];

  deepFreeze(listBefore);
  
  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);

}


testAddCounter();
testRemoveCounter();
testIncrementCounter();



const toggleTodo = (todo) => {
    // todo.completed = !todo.completed;
    // return todo;

    // ES6
    // return Object.assign({}, todo, {
    //     completed: !todo.completed
    //   });  
    
    // ES7
    return {
        ...todo,
        completed: !todo.completed
    };
};



store.subscribe(render);
render();

const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false
        }
      case 'TOGGLE_TODO':
        if (state.id !== action.id) {
          return state;
        }
        return Object.assign({}, state, { 
          completed: !state.completed     
        });
      default:
        return state;
    }
  }

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
          return [
            ...state,
            todo(undefined, action)
          ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
          return state;
      }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();

const testToggleTodoOld = () => {
    const todoBefore = {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
    const todoAfter  = {
      id: 0,
      text: 'Learn Redux',
      completed: true
    }
    expect(
      toggleTodo(todoBefore)
    ).toEqual(todoAfter);
  }

testToggleTodoOld();

const testToggleTodo = () => {
    const stateBefore = [
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
    ];
    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    };
    const stateAfter = [
    {
        id: 0,
        text: 'Learn Redux',
        completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: true
    }
    ];
  
    deepFreeze(stateBefore);
    deepFreeze(action);
  
    expect(
      todos(stateBefore, action)
    ).toEqual(stateAfter);
  }


testToggleTodo(); // run the test

const visibilityFilter = (
  state = 'SHOW_ALL', // default state
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};


// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// });


console.log('All tests are passed');


const { Component } = React;

class TodoApp extends Component {
// filled out below ...
}

const render = () => {
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
  );
};