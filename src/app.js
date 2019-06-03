import React from 'react'
import ReactDOM from 'react-dom'

import './css/app.css'

import Display from './components/display'

import FlatButton from 'material-ui/FlatButton'

import ImageMapper from 'react-image-mapper'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview : false,
            uploading: false,
            images:[],
            progress : 'not uploaded'
        }
        this.uploadImage = this.uploadImage.bind(this)
        this.closeDisplay = this.closeDisplay.bind(this)
        this.MAP = {
            name: "my-map",
            areas: [
                { name: "1", shape: "poly", coords: [128,159,656,78,1075,555,576,641], strokeColor: "red"},
            ]
        }
    }
    
    closeDisplay(e) {
        this.setState({preview: false});
    }

    uploadImage(e) {
        const files = Array.from(e.target.files)
        this.setState({ uploading: true })
        console.log('fn called')

        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append(i, file)
        })

        this.setState({
            progress: 'uploading please wait ..'
        })

        fetch(`http://localhost:1234/image-upload`, {
        method: 'POST',
        body: formData
        })
        .then(res => res.json())
        .then(images => {
            this.setState({ 
                uploading: false,
                images,
                preview: true,
                progress: 'image recieved'
            })
            console.log(images)
        })
    }

    render() {

        var display;

        if(this.state.preview) {
            display = <div id="display" className="display-container">
                        <button className="close-btn" onClick ={this.closeDisplay}>&#x274C;</button>
                        <Display url={this.state.images}/>
                      </div>
        }
        else {
            display = ""
        }

        return(
            <div>
            <div className="container">
                <div className="upload-container">
                    <label className="upload-lbl" >
                        Enter the File to Upload
                        <input type="file" name="upload-image" className="upload-btn" onChange={(e) => this.uploadImage(e)} accept="image/*"></input>
                    </label>
                    <div className="upload-progress">
                        <label><span className="status-color">Status:</span>{this.state.progress}</label>
                    </div>
                </div>
                {display}
            </div>
            </div>

        )
    }
}