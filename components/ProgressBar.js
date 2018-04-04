import React from 'react'

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            progressWidth: 0,
            right: 0,
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            width: this.progressBar.offsetWidth,
            progressWidth: this.progress.offsetWidth,
            right: this.progress.offsetWidth - this.progressBar.offsetWidth,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        let width = this.progress.offsetWidth
        if (prevState.progressWidth == width)
            return;
        this.setState({
            ...prevState,
            progressWidth: this.progress.offsetWidth,
            right: this.progress.offsetWidth - this.progressBar.offsetWidth,
        })
    }

    render() {
        let { label, current, goal } = this.props
        let percentage = current / goal * 100
        let width = `${ percentage >= 100 ? 100 : percentage }%`
        let right = `${ this.state.right }px`
        return (
            <div
                ref={progressBar => { this.progressBar = progressBar }}
                className="progress-bar">
                
                <div className="info-bg">
                    <span className="current">{current}</span>
                    <span className="label">{label}</span>
                    <span className="goal">{goal}</span>
                </div>
                <div 
                    ref={progress => { this.progress = progress }}
                    className="progress"
                    style={{ width }}>

                    <div style={{ right }}>
                        <span className="current">{current}</span>
                        <span className="label">{label}</span>
                        <span className="goal">{goal}</span>
                    </div>
                </div>
            </div>
        )
    }
}