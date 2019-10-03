import React, { Component, Fragment } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import {
  addName,
  addDeadline,
  addListItem,
  deleteListItem,
  updateTask
} from './actions/actionCreators';
import { throwStatement } from '@babel/types';
// import { initialize, dataModule } from './initialize'

// initialize();

// const posts = dataModule.dataset("tasks")

const dummyList = [
  {
    id: 1,
    name: 'Meeting',
    deadline: '2019-08-02'
  }
];

class App extends Component {
  state = {
    id: null,
    name: '',
    deadline: '',
    list: []
  };

  componentDidMount() {
    const { list } = this.props;
    this.setState({
      list: [...this.state.list, ...list]
    });
  }

  componentDidUpdate(prevProps) {
    prevProps.list !== this.props.list &&
      this.setState({ list: this.props.list });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addTask = async () => {
    const { name, addListItem } = this.props;
    const subList = [
      {
        id: Math.random(),
        name,
        deadline: ''
      }
    ];
    if (subList.length > 0) addListItem(subList);
  };

  deleteTask = async id => {
    this.props.deleteListItem(id);
  };

  updateTask = async (id, name, deadline) => {
    this.props.updateTask(id, name, deadline);
  };

  render() {
    const { list, deadline, name, id } = this.state;
    return (
      <main className='container'>
        <h1 className='header'> Task Manager</h1>
        <label className='labelStyle'>
          <span className='notesEmoji' role='img' aria-label='notes'>
            &#128221;
          </span>
          Add Task: &nbsp;
        </label>
        <div>
          <input
            className='inputStyle'
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
          <button className='buttonStyle' onClick={this.addTask}>
            Add
          </button>
        </div>
        <ol>
          {list.length > 0 &&
            list.map(item => (
              <li key={item.id}>
                <input
                  className='listInput'
                  onChange={this.handleChange}
                  value={item.name}
                />
                {item.deadline || deadline === item.id ? (
                  <input
                    className='listInputDeadline'
                    value={item.deadline}
                    onChange={this.handleChange}
                  />
                ) : (
                  <button
                    className='itemButton'
                    onClick={() => this.setState({ deadline: item.id })}
                  >
                    Add Deadline
                  </button>
                )}
                <button
                  className='itemButton'
                  onClick={() => this.updateTask(item.id, name, deadline)}
                >
                  Update
                </button>
                <button
                  className='itemButton'
                  style={{ color: 'red' }}
                  onClick={() => this.deleteTask(item.id)}
                >
                  X
                </button>
              </li>
            ))}
        </ol>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  name: state.tasks.name,
  list: state.tasks.list,
  deadline: state.tasks.deadline
});

const mapDispatchToProps = dispatch => ({
  addName: name => dispatch(addName(name)),
  addDeadline: deadline => dispatch(addDeadline(deadline)),
  addListItem: (id, name, deadline) =>
    dispatch(addListItem(id, name, deadline)),
  deleteListItem: id => dispatch(deleteListItem(id)),
  updateTask: (id, name, deadline) => dispatch(updateTask(id, name, deadline))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
