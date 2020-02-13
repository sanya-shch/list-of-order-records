import React from 'react';
import { connect } from 'react-redux';
import { getReport } from '../../redux/actions/reportActions';

const GetReport = ({ loading, error, total, getReport }) => {

  const onClickGetReport = () => {
    getReport()
  };

  return (
    <div className="mt-5">
      {
        total > 0 &&
        <>{
          loading ? (
            <button className="btn btn-primary btn-lg btn-block mt-3" type="button" disabled>
              <span className="spinner-grow spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-lg btn-block mt-3" onClick={onClickGetReport}>Get Report File</button>
          )
        }</>
      }

      {
        error && <p className="text-danger">[Error]: {error}</p>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.report.loading,
  error: state.report.error,
  total: state.orders.total
});

export default connect(
  mapStateToProps,
  { getReport  }
)(GetReport);