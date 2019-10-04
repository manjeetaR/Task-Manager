import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class Alert extends React.Component {
  getText = () => {
    let text;
    switch(this.props.type) {
      case 'update': 
        text = this.props.success ? <span><FontAwesomeIcon icon={ faCheck} /> Updated task list successfully.</span> : <span>An error ocurred while updating task list.</span>; 
        break;
      case 'add': 
        text = this.props.success ? <span><FontAwesomeIcon icon={ faCheck } /> Added item to task list successfully.</span> : <span>An error ocurred while adding item to task list.</span>; 
        break;
      case 'delete': 
        text = this.props.success ? <span><FontAwesomeIcon icon={ faTimes } /> Deleted item form task list successfully.</span> : <span>An error ocurred while deleting item from task list.</span>; 
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