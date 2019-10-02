import React, { Component, Fragment } from 'react'
import { initialize, dataModule } from './initialize'

initialize();

const posts = dataModule.dataset("tasks");

class App extends Component {

  state = {
    name: '',
    list: [],
    deadline: ''
  }

  componentWillMount() {
    this.getTasks()
  }

  addTask = async () => {
    const { name, list } = this.state
    const subList = await posts.insert([{ name }]).execute()
    if (list.length > 0) this.setState({ list: [...list, ...subList] })
  }

  getTasks = async () => {
    let list = await posts.select().execute()
    if (list.length > 0) this.setState({ list })
  }

  deleteTask = async id => {
    const { list } = this.state
    let deletedList = await posts.delete().where(field => field("id").isLike(id)).execute()
    if (deletedList.length > 0) this.setState({ list: list.filter(item => item.id !== deletedList[0].id) })
  }

  updateTask = async (id, name, deadline) => {
    const { list } = this.state
    let updatedList = await posts.update([{ name, deadline }]).where(field => field("id").isLike(id)).execute()
    if (updatedList.length > 0) this.setState({ list: list.map(item => item.id === updatedList[0].id ? updatedList[0] : item) })
  }

  update = id => {
    const { list } = this.state
    const data = list.filter(value => value.id === id)[0]
    this.updateTask(id, data.name, data.deadline)
    this.setState({ deadline: '' })
  }

  render() {
    const { list, deadline } = this.state
    return (
      <main>
        <h1> Task Manager</h1>
        <label>&#128221;Add Task:  &nbsp;</label>
        <input onChange={e => this.setState({ name: e.target.value })} />
        <button onClick={this.addTask}>Add</button>
        <ol>
          {list.map(item => {
            debugger
            return <Fragment><li><input onChange={e => this.setState({ list: list.map(value => value.id === item.id ? { ...value, name: e.target.value } : value) })} defaultValue={item.name} />
              {(item.deadline || deadline === item.id) ? <input defaultValue={item.deadline} onChange={e => this.setState({ list: list.map(value => value.id === item.id ? { ...value, deadline: e.target.value } : value) })} type="date" defaultValue={item.deadline} /> :
                <button onClick={() => this.setState({ deadline: item.id })}>Add Deadline</button>}
              <button onClick={() => this.update(item.id)}>Update</button>
              <button style={{ color: 'red' }} onClick={() => this.deleteTask(item.id)}>X</button></li>
            </Fragment>
          })}
        </ol>
      </main>
    )
  }
}

export default App