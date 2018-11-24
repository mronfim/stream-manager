import React from 'react'
import io from 'socket.io-client'

import stylesheet from '../../styles/chewbagelz/overlay.scss'

import Label from '../../components/chewbagelz/Label'

class Overlay extends React.Component {
    constructor(props) {
        super(props)
        // this.socket = io('http://localhost:3000')
        this.state = {
            // user: {}
            donation: 'ForeignLIVE',
        }
    }

    componentDidMount() {
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
    }

    animate() {
        // this.setState({ donation: 'Bitecode' })
        this.refs.recentDonation.setText('Bitecode')
    }

    render() {
        const { donation } = this.state
        return (
            <div className="overlay-container">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div className="webcam">
                    <div className="info-label" style={{ left: '25px', right: '215px' }}>
                        <Label ref="recentDonation" text={donation} id="donation" />
                    </div>
                    <div className="info-label" style={{ right: '25px', left: '215px', textAlign: 'right' }}>
                        <Label ref="recentFollow" text={donation} id="follow" />
                    </div>
                </div>
                <button onClick={() => this.animate()}>ANIMATE</button>
            </div>
        )
    }
}

export default Overlay