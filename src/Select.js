import React from 'react';

export default (props) => {
    return (
        <select onChange={props.handleSelect} value={props.priority}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
      </select>
    );
}