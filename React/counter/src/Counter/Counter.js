import React from 'react'
import './Counter.css'

export default class Counter extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }

    addToCounter() {
       this.setState(prevState => {
           return { count : prevState.count + 1 }
       })
    }

    minusFromCounter() {
       this.setState(prevState => {
        return { count : prevState.count - 1 }
       })
    }
    render() {
        return (
            <div>
                <section className='main'>
                    <div className="container">
                        <h1>Counter</h1>
                        <h3>{this.state.count}</h3>
                        <div className="box-btn">
                            <button id='add' onClick={this.addToCounter.bind(this)}>Add Count</button>
                            <button id='lower' onClick={this.minusFromCounter.bind(this)}>Lower Count</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
} 
