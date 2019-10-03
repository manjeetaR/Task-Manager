import React from 'react';

class Checkbox extends React.Component {
    constructor() {
        super();
        this.state = { checked: false };
        this.checkClicked = this.checkClicked.bind(this);
    }
    checkClickedCallback() { //runs after state is changed
        this.props.task.isChecked = this.state.checked;
        this.props.task.checkedCallback(this.props.task);
    }

    checkClicked() {
        this.setState({checked: !this.state.checked}, this.checkClickedCallback); 
    }

    render() {
        return (
            <input type="checkbox" className="checkbox" defaultChecked={this.state.checked} onChange={this.checkClicked}></input>
        )
    }
}

export default Checkbox;