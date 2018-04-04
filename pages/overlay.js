import React from 'react'
import io from 'socket.io-client'

import stylesheet from '../styles/overlay.scss'
import Console from '../components/Console'

class Overlay extends React.Component {
    constructor(props) {
        super(props)
        this.socket = io('http://localhost:3000')
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.socket.on('user info', data => {
            this.setState({
                ...this.state,
                user: data,
            })
        })
    }

    render() {
        return (
            <div className="overlay-container">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Console user={this.state.user} />
            </div>
        )
    }
}

export default Overlay