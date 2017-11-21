import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageImport extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      disabled: false
    }
    this.uploadFiles = this.uploadFiles.bind(this);
  }


  uploadFiles(files) {
    this.props.handleImage(files[0]);
    let preview = files[0].preview;
    this.setState({
      preview: preview,
      disabled: true
    });
  }


  render() {
    let dropZoneText = !this.state.disabled?'Solte uma imagem aqui':<img src={this.state.preview} style={{
      maxHeight: 200,
      maxWidth: 170
    }}/>;
    let dropzoneRef;
    return (
      <div>
        <Dropzone ref={(node) => { dropzoneRef = node; }} onDropAccepted={this.uploadFiles} accept="image/jpeg, image/png" disabled={this.state.disabled} >
          <div style={{
            padding: '20px',
            color: 'grey',
            borderColor: 'grey',
          }} >
            {dropZoneText}
          </div>
        </Dropzone>
        <button type="button" className="btn btn-primary" style={{
          marginTop: '10px',
        }} onClick={() => { dropzoneRef.open() }}>
          Selecionar imagem
        </button>
      </div>
    );
  }
}

export default ImageImport;