import React from 'react';

class Alert extends React.Component {
  getText = () => {
    let text;
    switch(this.props.type) {
      case 'update':
        text = this.props.success ? 'Updated task list successfully.' : 'An error ocurred while updating task list.';
        break;
      case 'add':
        text = this.props.success ? 'Added item to task list successfully.' : 'An error ocurred while adding item to task list.';
        break;
      case 'delete':
        text = this.props.success ? 'Deleted item form task list successfully.' : 'An error ocurred while deleting item from task list.';
        break;
      default: text = ''; break;
    }
    return text;
  }

  render() {
    return (
      <div className='alert' id={this.props.success ? 'success' : 'error'}>
        {this.getText()}
      </div>
    );
  }
}

export default Alert;