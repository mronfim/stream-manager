import React from 'react'

export default class FollowerAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lineSize: 0,
            lineOffset: 0,
        }
    }

    componentDidMount() {
        this.setState({
            lineSize: '75%',
            lineOffset: 25,
        })

        odoo.default({ el: '.js-odoo', from: 'NEW FOLLOWER!', to: 'FOREIGNN     ', animationDelay: 2600 });
    }

    render() {
        let lineFillStyle = {
            width: this.state.lineSize,
        }

        return (
            <div className='follower-alert'>
                <div className='top-line line'
                    style={{
                        top: `${148 - this.state.lineOffset}px`,
                    }}>
                    <div className='line-fill' style={{ ...lineFillStyle }}></div>
                </div>
                <div className='bottom-line line'
                    style={{
                        top: `${148 + this.state.lineOffset}px`,
                    }}>
                    <div className='line-fill' style={{...lineFillStyle}}></div>
                </div>
                <div className='js-odoo'></div>
                <canvas style={{width: '100px', height: '100px', backgroundColor: 'red'}}></canvas>
            </div>
        )
    }
}