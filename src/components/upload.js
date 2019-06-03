import React from 'react'

import '../css/upload.css'

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            images:[]
        }
        this.uploadImage = this.uploadImage.bind(this)
    }

    uploadImage(e) {
        const files = Array.from(e.target.files)
        this.setState({ uploading: true })

        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append(i, file)
        })

        fetch(`http://localhost:1234/image-upload`, {
        method: 'POST',
        body: formData
        })
        .then(res => res.json())
        .then(images => {
            this.setState({ 
                uploading: false,
                images
            })
            console.log(images)
        })
    }
    
    render() {
        return(
            <div>
                <label className="upload-lbl">
                    Enter the File to Upload
                    <input type="file" name="upload-image" className="upload-btn" onChange={this.uploadImage}></input>
                </label>
            </div>
        )
    }
}