import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class FileUpload extends Component {
    state = {
        projectId: '',
        buttonText: 'Preparing your bot... Please wait...'
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" name="file" className="form-control" onChange={this.onChangeHandler} />
                            </div>
                            <div className="col-md-12 pull-right">
                                <button width="100%" type="button" className="btn btn-info" onClick={this.fileUploadHandler}>Upload File</button>
                            </div>
                        </form>
                        <br />
                        <div>
                            {
                                this.state.projectId ?
                                    <Button variant="primary" size="lg" block>
                                        {
                                            "Uploaded Successfully."
                                        }
                                    </Button> :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChangeHandler = (event) => {
        console.log('onChangeHandler triggered')
        var file = event.target.files[0];
        console.log(file);
        console.log(this.validateSize(event));
        if (this.validateSize(event)) {
            console.log(file);
            this.setState({
                selectedFile: file
            });
        }
    }


    fileUploadHandler = () => {
        setTimeout(() => {
            this.setState({
                buttonText: "Take me to my chatbot"
            })
        }, 5000)
        console.log('fileUploadHandler triggered')
        const data = new FormData()
        console.log(this.state.selectedFile);
        data.append('file', this.state.selectedFile)
        console.log(data);
      
        axios.post("http://localhost:5000/api/file/upload", data)
           
            .then(res => {
                console.log(res.data)
                this.setState({ projectId: res.data.projectId })
            })
            .catch(err => {
                console.log('upload failed')
            })
    }

    validateSize = (event) => {
        let file = event.target.files[0];
        let size = 30000;
        let err = '';
        console.log(file.size);
        if (file.size > size) {
            err = file.type + 'is too large, please pick a smaller file\n';
            console.log(err)
        }
        return true
    };
}

export default FileUpload;