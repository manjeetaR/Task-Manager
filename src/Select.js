import React from 'react';

export default (props) => {
    const {list, item, priority, handleSelect} = props;
    return (
        <select className="selectStyle" onChange={(evt) => handleSelect(evt, list, item)} value={priority}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
      </select>
    );
}