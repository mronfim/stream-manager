import React from 'react'
import io from 'socket.io-client'

import stylesheet from '../../styles/foreign/overlay.scss'

// import FollowerGoal from '../components/FollowerGoal'

class Overlay extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.socket = io('http://localhost:3000')
    //     this.state = {
    //         user: {}
    //     }
    // }

    // componentDidMount() {
    //     this.socket.on('user info', data => {
    //         this.setState({
    //             ...this.state,
    //             user: data,
    //         })
    //     })

    //     this.socket.on('new follow', data => {
    //         let user = this.state.user || {}
    //         let followers = user.followers || 0

    //         this.setState({
    //             ...this.state,
    //             user: {
    //                 ...user,
    //                 followers: followers + data.total,
    //                 recentFollower: data.recentFollower,
    //             }
    //         })
    //     })
    // }

    render() {
        return (
            <div className="overlay-container">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                {/* <FollowerGoal /> */}
            </div>
        )
    }
}

export default Overlay