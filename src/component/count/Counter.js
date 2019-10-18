import {Component} from 'react'
class Counter extends Component{
    constructor(props) {
        super(props);
        this.clickAdd = this.clickAdd.bind(this);
    }
    clickAdd() {
        this.props.onIncrement();
    }
    render() {
        const {value, clickAdd} = this.props
        return (
            <div>
                <span>{value}</span>
                <button onClick = {clickAdd}>+1</button>
            </div>
        )
    }
}
export default Counter