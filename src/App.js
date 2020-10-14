import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTrashAlt, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { CSSTransitionGroup } from 'react-transition-group';
import Alert from './Alert';
import Select from './Select';
import Checkbox from './Checkbox';
import Search from './Search';
// import { initialize, dataModule } from './initialize'

// initialize();

// const posts = dataModule.dataset("tasks")


const sortSymbols = {
  "asc": "▲",
  "desc": "▼"
}

class App extends Component {
  state = {
    id: null,
    name: '',
    list: [],
    deadline: '',
    alert: { shown: false, type: '', success: true },
    searchText: '',
    sortDirection: 'asc'
  };


  componentWillMount() {
    this.getTasks()
  };

  showAlert = ({ type, success }) => {
    if (this.timeout) { clearTimeout(this.timeout) }; // clears timeout so if there is an alert shown and another one is shown, the later one will not be cleared with past alert timeout
    let alert = Object.assign({}, this.state.alert); // clones alert so shallow compare triggers state update
    alert.shown = true;
    alert.type = type;
    alert.success = success;
    this.setState({ alert });
    this.timeout = setTimeout(() => {
      alert.shown = false;
      this.setState({ alert })
    }, 1800);
  };

  addTask = async () => {
    this.showAlert({ type: 'add', success: true }) // if successful, success can be omitted since it is true by default
    // if(error) { this.showAlert({ type: 'add', success: false }) } // if there is any error (change condition)
    const { name, list } = this.state;
    // const subList = await posts.insert([{ name }]).execute()
    const subList = [{
      id: Math.random(),
      name,
      deadline: "",
      isChecked: false,
      priority: 'high',
      checkedCallback: (self) => {
        this.setState({ list: this.state.list.map(value => value.id === self.id ? { ...value, isChecked: self.isChecked } : value) });
      }
    }];
    if (subList.length > 0) this.setState({ list: [...list, ...subList] });
  };

  getTasks = async () => {
    // const list = await posts.select().execute()
    const list = [{
      id: 1,
      name: "Meeting",
      deadline: "2019-08-02",
      priority: 'high',
      isChecked: false,
      checkedCallback: (self) => {
        this.setState({ list: this.state.list.map(value => value.id === self.id ? { ...value, isChecked: self.isChecked } : value) });
      }
    }];
    if (list.length > 0) this.setState({ list });
  }

  deleteSelectedTasks = async () => {
    this.showAlert({ type: 'delete', success: true });
    const { list } = this.state;
    const deletedList = list.filter(item => item.isChecked === true);
    if (deletedList.length > 0) this.setState({ list: list.filter(item => deletedList.every(element => item.id != element.id)) });

  };

  deleteTask = async id => {
    this.showAlert({ type: 'delete', success: true }); // if successful, success can be omitted since it is true by default
    // if(error) { this.showAlert({ type: 'delete', success: false }) } // if there is any error (change condition)
    const { list } = this.state;
    // const deletedList = await posts.delete().where(field => field("id").isLike(id)).execute()
    const deletedList = list.filter(item => item.id === id)
    if (deletedList.length > 0) this.setState({ list: list.filter(item => item.id !== deletedList[0].id) })
  };

  updateTask = async (id, name, deadline, isChecked, checkedCallback, priority) => {
    this.showAlert({ type: 'update', success: true }) // if successful, success can be omitted since it is true by default
    // if(error) { this.showAlert({ type: 'update', success: false }) } // if there is any error (change condition)
    const { list } = this.state;
    // const updatedList = await posts.update([{ name, deadline }]).where(field => field("id").isLike(id)).execute()
    const updatedList = [{ id, name, deadline, isChecked, checkedCallback, priority }];
    if (updatedList.length > 0) this.setState({ list: list.map(item => item.id === updatedList[0].id ? updatedList[0] : item) });
  };

  update = id => {
    const { list } = this.state;
    const data = list.filter(value => value.id === id)[0];
    this.updateTask(id, data.name, data.deadline, data.isChecked, data.checkedCallback, data.priority);
    this.setState({ deadline: '' });
  };

  matchSearchText = searchText => {
    this.setState({ searchText });
  };

  sort = () => {
    // We use [...arr] as sort mutates original array
    const sortedList = [...this.state.list].sort((a, b) => {
      // asc = a-b / desc = b-a
      const [left, right] = this.state.sortDirection === 'asc' ? [a, b] : [b, a]
      return new Date(left.deadline).getTime() - new Date(right.deadline).getTime()
    })

    this.setState({ list: sortedList })
  }

  toggleSortDirection = () => {
    const direction = this.state.sortDirection === 'asc' ? 'desc' : 'asc'
    this.setState({ sortDirection: direction }, () => this.sort());
  }

  toggleMode = () => {
    const htmlTag = document.documentElement;
    htmlTag.className == 'darkMode' 
      ? htmlTag.classList.remove("darkMode")
      : htmlTag.className = 'darkMode'
  }

  timeLeft = (deadline) => {
    const daysLeft = ((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)).toFixed(0)
    return daysLeft > 0 ? `${daysLeft} day(s) left` : 'expired'
  }


  handleSelect = (evt, list, item) => {
    this.setState({
      list: list.map(value => value.id === item.id ? { ...value, priority: evt.target.value } : value)
    });
  };

  render() {
    const { list, deadline, searchText } = this.state;
    return (
      <main className="container">
        <h1 className="header"> Task Manager</h1>
        <Search handleTextChange={this.matchSearchText} />
        <label className="labelStyle">
          <span className="notesEmoji" role="img" aria-label="notes">
            &#128221;
					</span>
          Add Task: &nbsp;
				</label>
        <div>
          <input className='inputStyle' onChange={e => this.setState({ name: e.target.value })} />
          <button
            className='buttonStyle add'
            onClick={this.addTask}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
          <button
            className={`itemButton deleteSelected ${this.state.list.every(item => !item.isChecked) ? 'hide' : 'show'}`}
            onClick={() => this.deleteSelectedTasks()}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete Selected
          </button>
          <div className="sortContainer" onClick={this.toggleSortDirection}>
            <button className='buttonStyle'>Sort by Deadline</button>
            <button className='buttonStyle'>{sortSymbols[this.state.sortDirection]}</button>
          </div>
        </div>
        <ol>
          <CSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {list.map(item => (
              item.name.toLowerCase().includes(searchText) && (
                <li key={item.id}>
                  <Checkbox task={item} />
                  <span className={`priority ${item.priority}`}>{item.priority && item.priority.toUpperCase()}</span>
                  <input
                    className="listInput"
                    onChange={e =>
                      this.setState({
                        list: list.map(value =>
                          value.id === item.id ? { ...value, name: e.target.value } : value
                        ),
                      })
                    }
                    value={item.name}
                  />
                  {item.deadline && <button className='itemButton'>{this.timeLeft(item.deadline)}</button>}
                  {item.deadline || deadline === item.id ? (
                    <input
                      className="listInputDeadline"
                      value={item.deadline}
                      onChange={e =>
                        this.setState({
                          list: list.map(value =>
                            value.id === item.id
                              ? { ...value, deadline: e.target.value }
                              : value
                          ),
                        })
                      }
                      type="datetime-local"
                      defaultValue={item.deadline}
                    />
                  ) : (
                      <button className="itemButton buttonAnimate" onClick={() => this.setState({ deadline: item.id })}>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Add Deadline
									</button>
                    )}
                  <Select handleSelect={this.handleSelect} list={list} item={item} priority={item.priority} />
                  <button className="itemButton buttonAnimate" onClick={() => this.update(item.id)}>
                    <FontAwesomeIcon icon={faSyncAlt} /> Update
								</button>
                  <button
                    className={`itemButton red ${item.isChecked ? 'hide' : 'show'}`}
                    onClick={() => this.deleteTask(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>)
            ))}
          </CSSTransitionGroup>
        </ol>
        <CSSTransitionGroup
          transitionName="down"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.state.alert.shown && (
            <Alert
              type={this.state.alert.type}
              success={this.state.alert.success}
            />
          )}
        </CSSTransitionGroup>
        <label className="nameMode">Toggle dark mode</label>
        <input className="mode-input" id="buttonMode" type="checkbox" onClick={this.toggleMode} />
        <label className="mode-btn" for="buttonMode"></label>
      </main>
    );
  }
}

export default App;
