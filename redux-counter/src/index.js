import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux' ;
import expect from 'expect';
import deepFreeze from 'deep-freeze';
//import { composeWithDevTools } from 'redux-devtools-extension';

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
        //   return [
        //     ...state,
        //     todo(undefined, action)
        //   ];
        // array spread causing errors...

        var newState = state.map( (e) => { return e; }); // copy state values
            newState.push(todo(undefined, action));
            return newState;


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


// const combineReducers = (reducers) => {
//     return (state = {}, action) => {
//       return Object.keys(reducers).reduce(
//         (nextState, key) => {
//           nextState[key] = reducers[key](
//             state[key],
//             action
//           );
//           return nextState;
//         },
//         {} // empty initial nextState
//       );
//     };
//   };

const todoApp = combineReducers({
    todos,
    visibilityFilter
  });

// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// });

const store = createStore(todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//composeWithDevTools()


const FilterLink = ({
    filter, 
    currentFilter,
    children
  }) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
      <a href='#'
        onClick={e => {
          e.preventDefault();
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter 
          });
        }}
      >
      {children}
      </a>
    );
  };
  
  const getVisibleTodos = (
    todos,
    filter
  ) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(
          t => t.completed
        );
      case 'SHOW_ACTIVE':
        return todos.filter(
          t => !t.completed
        );
    }
  }


let nextTodoId = 0;

const Todo = ({
  onClick,
  completed,
  text
}) => (
<li
  onClick={onClick}
  style={{
  textDecoration:
    completed ?
      'line-through' :
      'none'
  }}
 >
  {text}
</li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);



class TodoApp extends Component {
    
  render() {
    const {
        todos,
        visibilityFilter
    } = this.props; //  ES6 Destructuring assignment is not supported in Chrome. use below one
    //const todos = this.props.todos, visibilityFilter = this.props.visibilityFilter
    const visibleTodos = getVisibleTodos(
        todos,
        visibilityFilter
      );      
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />          
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <TodoList 
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id // where is id value?
            })
          } />

<p>
  Show:
  {' '}
  <FilterLink
    filter='SHOW_ALL'
    currentFilter={visibilityFilter}
  >
  All
  </FilterLink>
  {', '}
  <FilterLink
    filter='SHOW_ACTIVE'
    currentFilter={visibilityFilter}
  >
  Active
  </FilterLink>
  {', '}
  <FilterLink
    filter='SHOW_COMPLETED'
    currentFilter={visibilityFilter}
  >
  Completed
  </FilterLink>
</p>

      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
console.log('All tests are passed');

