import React from 'react'
import io from 'socket.io-client'

import stylesheet from '../styles/index.scss'

class Index extends React.Component {
    constructor(props) {
        super(props)
        // this.socket = io('http://localhost:3000')
    }

    componentDidMount() {
        // this.socket.on('connect', data => console.log(data))
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <p>Hello</p>
            </div>
        )
    }
}

export default Index