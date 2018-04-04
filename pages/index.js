import React from 'react'
import io from 'socket.io-client'

import Comp from '../components/Comp'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.socket = io('http://localhost:3000')
    }

    componentDidMount() {
        this.socket.on('connect', data => console.log(data))
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div>
                <p>Hello</p>
                <Comp socket={this.socket} />
            </div>
        )
    }
}

export default Index