import React from 'react'

import Facecam from './Facecam'
import Brand from './Brand'
import Console from './Console'

export default class Overlay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='overlay-container'>
                {/* <Facecam />
                <Brand /> */}
                <Console />
            </div>
        )
    }
}