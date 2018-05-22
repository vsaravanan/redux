import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux' ;
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
// import expect from 'expect';
// import deepFreeze from 'deep-freeze';
import { composeWithDevTools } from 'redux-devtools-extension';



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


        var newState = state.map( (e) => { return e; }); // copy state values
            newState.push(todo(undefined, action));
            return newState;


        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
          return state;
      }
};


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


const todoApp = combineReducers({
    todos,
    visibilityFilter
  });


// const store = createStore(todoApp,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//composeWithDevTools()





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
      default:
        return todos;        
    }
  }




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

let nextTodoId = 0;

const AddTodo = (props, { store }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          text: input.value,
          id: nextTodoId++
        });
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
}

AddTodo.contextTypes = {
  store: PropTypes.object 
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
    All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
    Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
    Completed
    </FilterLink>
  </p>
);




class FilterLink extends Component {

  componentDidMount() {
    // const { store } = this.props; // no browser supports this!
    const store = this.context.store;    
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const store = this.context.store;
    const state = store.getState(); 
    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>        

    );         
  }


};

FilterLink.contextTypes = {
  store: PropTypes.object
}

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
class VisibleTodoList extends Component {
  componentDidMount() {
    // const { store } = this.props; // ES6 destructuring syntax
    // const {store} = this.props; // without destructuring
    const store = this.context.store; 
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }  
  render() {
    const props = this.props;
    // const {store} = props;
    const store = this.context.store; 
    const state = store.getState();
    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
        />
    )
  }
}

VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

const TodoApp = () => 
 (
      <div>
        <AddTodo   />        

        <VisibleTodoList  />

        <Footer  />

      </div>
    );

    // class Provider extends Component {
    //   getChildContext() {
    //     return {
    //       store: this.props.store // what no ES6 Destructuring here Dan...?
    //     };
    //   }
    
    //   render() {
    //     return this.props.children;
    //   };
    
    // }

  ReactDOM.render(
    <Provider store={createStore(todoApp, composeWithDevTools())}>
    <TodoApp   />
    </Provider>,
    document.getElementById('root')
  );


//store.subscribe(render);
//render();
console.log('All tests are passed');

