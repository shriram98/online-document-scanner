import React from 'react'

import '../css/display.css'

import Annotation from 'react-image-annotation'

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currAngle: 0,
            annotations: [],
            annotation: {}
        }

        this.rotateLeft = this.rotateLeft.bind(this);
        this.rotateRight = this.rotateRight.bind(this);
        this.cropImage = this.cropImage.bind(this);
        this.removeAnnt = this.removeAnnt.bind(this);
    }

    onChange = (annotation) => {
        this.setState({ annotation })
    }
    
    onSubmit = (annotation) => {
        const { geometry, data } = annotation

        this.setState({
            annotation: {},
            annotations: this.state.annotations.concat({
            geometry,
            data: {
                ...data,
                id: Math.random()
            }
            })
        })
    }

    rotateRight(e) {
        console.log('method called');
        var deg = this.state.currAngle;
        this.setState({currAngle: (deg+90)%360}, ()=>{
            var image = document.getElementById('disp')
            console.log('rotate('+this.state.currAngle+'deg)')
            var string = 'rotate('+this.state.currAngle+'deg)'
            image.style.transform=string
        })
    }

    rotateLeft(e) {
        var deg = this.state.currAngle;
        this.setState({currAngle: (deg-90)%360}, ()=>{
            var image = document.getElementById('disp')
            console.log('rotate('+this.state.currAngle+'deg)')
            var string = 'rotate('+this.state.currAngle+'deg)'
            image.style.transform=string
        })
    }

    cropImage(e) {
        console.log('method called');
    }

    removeAnnt(e) {
        console.log('method called');
        this.setState({
            annotations: [],
            annotation: {}
        })
    }




    render() {
        var url = this.props.url
        return(
            <div>
                {/* <img src={url[0].url} className="display-image" /> */}
                <div id="disp" className="display-image">
                    <Annotation
                        src={url.url}
                        annotations={this.state.annotations}
                        type={this.state.type}
                        value={this.state.annotation}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                    />
                </div>
                <div className="edit-buttons--container">
                    <button className="edit-button" onClick={this.rotateLeft}>rotate left</button>
                    <button className="edit-button" onClick={this.rotateRight}>rotate right</button>
                    <button className="edit-button" onClick={this.cropImage}>crop</button>
                    <button className="edit-button" onClick={this.removeAnnt}>Remove Annotation</button>
                </div>
            </div>
        )
    }
}


