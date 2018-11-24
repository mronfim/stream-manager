import React from 'react'

export default class Label extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
        }
    }

    setText(text) {
        let query = `.label-${this.props.id} span`
        var title1 = new TimelineMax();
        title1.staggerFromTo(query, 0.5,
            { ease: Back.easeOut.config(1), opacity: 1, bottom: 0, color: 'white' },
            { ease: Back.easeOut.config(1), opacity: 0, bottom: 10, color: 'black' }, 0.05, 0, () => {
                this.setState({ text }, () => {
                    title1.staggerFromTo(query, 0.5,
                        { ease: Back.easeOut.config(1), opacity: 0, bottom: -10, color: 'black' },
                        { ease: Back.easeOut.config(1), opacity: 1, bottom: 0, color: 'white' }, 0.05)
                })
            })
    }

    render() {
        const { text } = this.state
        return (
            <div className={`label-${this.props.id}`}>
                {[...text].map((letter, i) => <span key={i}>{letter}</span>)}
            </div>
        )
    }
}