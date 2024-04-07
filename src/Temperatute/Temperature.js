import './Temperature.css'
import React from 'react'

export default class Temperature extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            temperature: 10,
            tempClass: 'cold'
        }
    }

    increaseTemp() {
        if (this.state.temperature >= 30) {
            return false
        }
        this.setState(prevState => {
            return { temperature: prevState.temperature + 1 }
        })
        if(this.state.temperature >=15){
            this.setState({tempClass: 'hot'})
        }
    }

    decreaseTemp() {
        if(this.state.temperature <= 0) {
            return false
        }
        this.setState(prevState => {
            return { temperature: prevState.temperature - 1 }
        })
        if(this.state.temperature <15){
            this.setState({tempClass: 'cold'})
        }
    }
    render() {
        return (
            <div>
                <section className='container-temperature'>
                    <div className="temperature">
                        <h1>Temperature</h1>
                        <div className={`tem-display ${this.state.tempClass}`}>
                            {this.state.temperature}°C
                        </div>
                        <div className="btn-box">
                            <button id='up' onClick={this.increaseTemp.bind(this)}>+</button>
                            <button id='down' onClick={this.decreaseTemp.bind(this)}>-</button>
                        </div>                     
                    </div>
                </section>
            </div>
        )
    }
}

