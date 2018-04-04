import React from 'react'

let start = 0

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            progressWidth: 0,
            right: 0,
            left: -100,
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            width: this.progressBar.offsetWidth,
            progressWidth: this.progress.offsetWidth,
            right: this.progress.offsetWidth - this.progressBar.offsetWidth,
        })

        window.requestAnimationFrame(timestamp => {
            this._animateGlow(timestamp)
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

    _calculateProgressColor(progress) {
        if (progress < 0.5) {
            // const color_start = h2r('#ff6e67')
            const color_start = h2r('#ff2020')
            const color_end = h2r('#fffc67')

            return r2h(_interpolateColor(color_start, color_end, progress * 2))
        } else {
            const color_start = h2r('#fffc67')
            const color_end = h2r('#5ffa68')

            return r2h(_interpolateColor(color_start, color_end, progress - (1 - progress)))
        }
    }

    _animateGlow(timestamp) {
        if (!start)
            start = timestamp
        var progress = timestamp - start

        let left = ((this.state.left + 202) % 650) - 200
        
        this.setState({
            ...this.state,
            left,
        })
        
        window.requestAnimationFrame(timestamp => {
            this._animateGlow(timestamp)
        })
    }

    render() {
        let { label, current, goal } = this.props
        let percentage = current / goal * 100
        let width = `${ percentage >= 100 ? 100 : percentage }%`
        let right = `${ this.state.right }px`
        let left = `${ this.state.left }px`
        
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
                    style={{ width, backgroundColor: this._calculateProgressColor(current/goal) }}>

                    <div className="glow" style={{ left }}></div>

                    <div>
                        <span className="current">{current}</span>
                        <span className="label">{label}</span>
                        <span className="goal">{goal}</span>
                    </div>
                </div>
            </div>
        )
    }
}

var _interpolateColor = function (color1, color2, factor) {
    if (arguments.length < 3) { factor = 0.5; }
    if (factor < 0) factor = 0
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

var r2h = function (rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
};

var h2r = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};