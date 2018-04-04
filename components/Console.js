import React from 'react'
import Ionicon from 'react-ionicons'

import ProgressBar from './ProgressBar'

export default class Console extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let follower = this.props.follower || '???'
        let winCount = this.props.wins || '???'
        let killCount = this.props.kills || '???'
        return (
            <div className='console-container'>
                <div className='console'>
                    <div className='header'>
                        <div className='ui-buttons'>
                            <Ionicon icon='md-remove' fontSize='15px' color='white' />
                            <Ionicon icon='md-square-outline' fontSize='15px' color='white' />
                            <Ionicon icon='md-close' fontSize='15px' color='white' />
                        </div>
                    </div>
                    <div className='face-cam'></div>
                    <div className='title-container'>
                        <div className='title'>
                            <div className='text'>
                                Foreign
                            </div>
                        </div>
                    </div>
                    <div className='output-screen'>
                        <div className='log'>
                            <span className='dir'>~/RECENT_FOLLOWER</span>
                            <span className='symbol'>$</span>
                            <span id='follower'>{follower}</span>
                            <ProgressBar label="follower goal" current="10" goal = "25" />
                        </div>
                        <div className='game-stats'>
                            <div className='wins'>Wins <span id='win-count'>[{winCount}]</span></div>
                            <div className='kills'>Kills <span id='kill-count'>[{killCount}]</span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}