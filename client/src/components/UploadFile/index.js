import React from 'react';
import { connect } from 'react-redux';
import { postSelectedFile, setSelectedFile } from '../../redux/actions/fileActions';

const UploadFile = ({ selectedFile, loading, error, postSelectedFile, setSelectedFile }) => {

  const onChangeInputFile = (event) => {
    setSelectedFile(event.target.files[0])
  };

  const onClickUploadFile = () => {
    postSelectedFile(selectedFile)
  };

  return (
    <div className="mt-5">
      <div className="input-group">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputGroupFile04"
                 aria-describedby="inputGroupFileAddon04" onChange={onChangeInputFile} name="filedata" accept=".csv"/>
            <label className="custom-file-label" htmlFor="inputGroupFile04">{!selectedFile ? "Choose file" : selectedFile.name}</label>
        </div>
      </div>

      {
        loading ? (
          <button className="btn btn-primary btn-lg btn-block mt-3" type="button" disabled>
            <span className="spinner-grow spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
        ) : selectedFile === null ? (
          <button type="button" className="btn btn-secondary btn-lg btn-block mt-3" disabled>Choose file</button>
        ) : (
          <button type="button" className="btn btn-primary btn-lg btn-block mt-3" onClick={onClickUploadFile}>Upload</button>
        )
      }

      {
        error && <p className="text-danger">[Error]: {error}</p>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  selectedFile: state.file.selectedFile,
  loading: state.file.loading,
  error: state.file.error
});

export default connect(
  mapStateToProps,
  { postSelectedFile, setSelectedFile }
)(UploadFile);