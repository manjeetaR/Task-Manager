import React from 'react';

export default (props) => {
    const {list, item, priority, handleSelect} = props;
    return (
        <select className="selectStyle" onChange={(evt) => handleSelect(evt, list, item)} value={priority}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
      </select>
    );
}