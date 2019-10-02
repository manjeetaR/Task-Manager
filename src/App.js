import React, { Component } from 'react'
import { initialize, dataModule } from './initialize'

initialize();

const posts = dataModule.dataset("tasks");

class App extends Component {

  state = {
    name: '',
    list: []
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

  updateTask = async (id, name) => {
    const { list } = this.state
    let updatedList = await posts.update([{ name }]).where(field => field("id").isLike(id)).execute()
    if (updatedList.length > 0) this.setState({ list: list.map(item => item.id === updatedList[0].id ? updatedList : item) })
  }

  render() {
    const { list } = this.state
    return (
      <main>
        <h1> Task Manager</h1>
        <label>Add Task:  &nbsp;</label>
        <input onChange={e => this.setState({ name: e.target.value })} />
        <button onClick={this.addTask}>Add</button>
        <ol>
          {list.map(item => <li><input onKeyDown={e => { if (e.keyCode === 13) this.updateTask(item.id, e.target.value) }} defaultValue={item.name} /><span style={{ color: 'red' }} onClick={() => this.deleteTask(item.id)}>&nbsp;   x</span></li>)}
        </ol>
      </main>
    )
  }
}

export default App