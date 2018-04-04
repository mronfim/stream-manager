import React from 'react'
import io from 'socket.io-client'

import stylesheet from '../styles/overlay.scss'
import Console from '../components/Console'

class Overlay extends React.Component {
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
            <div className="overlay-container">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Console />
            </div>
        )
    }
}

Overlay.defaultProps = {

}

export default Overlay