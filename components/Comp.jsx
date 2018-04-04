import React from 'react'

export default class Comp extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.socket.on('req', data => {
            console.log('getting mssg from server')
            console.log(data)
        })
    }

    render() {
        return (
            <p>My Comp</p>
        )
    }
}