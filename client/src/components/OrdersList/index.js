import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getOrdersList, setPage, setSortBy, setLimit } from '../../redux/actions/orderActions';

const OrderList = ({ data: {orders, limit, page, total, pages, sortBy, loading, error}, getOrdersList, setPage, setSortBy, setLimit }) => {

  useEffect(() => {
    getOrdersList({ page, limit, sortBy })
  },[page, limit, sortBy]);

  const HandleSetPage = (event) => {
    setPage(event.target.innerText)
  };
  const HandleSetSortBy = (sortType) => {
    setSortBy(sortType)
  };
  const HandleSetLimit = (event) => {
    setLimit(event.target.innerText)
  };

  const createPagination = () => {
    let pagination = [];
    for (let i = 0; i < pages; i++) {
      pagination.push(
        <li key={i} className={page === i+1 ? 'page-item active' : 'page-item'}><a onClick={HandleSetPage} className='page-link' href="#">{i+1}</a></li>
      )
    }
    return pagination
  };

  const createDropdownItem = () => {
    let dropdownItem = [];
    for (let i = 0; i < total; i++) {
      dropdownItem.push(
        <button key={i} className="dropdown-item" type="button"  onClick={HandleSetLimit}>{i+1}</button>
      )
    }
    return dropdownItem
  };

  const createDate = (d) => {
    d = new Date(d);
    return ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth())).slice(-2) + "." +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
  };

  return (
    <div className="mt-5">
      {
        loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : total > 0 ? (
          <>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" onClick={() => HandleSetSortBy('user_email')} className={`btn ${sortBy === 'user_email' ? 'btn-primary' : 'btn-outline-secondary'}`}>User Email</button>
              <button type="button" onClick={() => HandleSetSortBy('date')} className={`btn ${sortBy === 'date' ? 'btn-primary' : 'btn-outline-secondary'}`}>Date</button>
              <button type="button" onClick={() => HandleSetSortBy('value')} className={`btn ${sortBy === 'value' ? 'btn-primary' : 'btn-outline-secondary'}`}>Value</button>
              <button type="button" onClick={() => HandleSetSortBy('currency')} className={`btn ${sortBy === 'currency' ? 'btn-primary' : 'btn-outline-secondary'}`}>Currency</button>
              <button type="button" onClick={() => HandleSetSortBy('status')} className={`btn ${sortBy === 'status' ? 'btn-primary' : 'btn-outline-secondary'}`}>Status</button>
            </div>

            <table className="table mt-3">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Email</th>
                <th scope="col">Date</th>
                <th scope="col">Value</th>
                <th scope="col">Currency</th>
                <th scope="col">Status</th>
              </tr>
              </thead>
              <tbody>
              {
                orders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.user_email}</td>
                      <td>{createDate(item.date)}</td>
                      <td>{item.value}</td>
                      <td>{item.currency}</td>
                      <td>{item.status}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>

            <div className="d-flex mt-3">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {
                    createPagination()
                  }
                </ul>
              </nav>

              <div className="dropdown dropup ml-3">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {limit}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  {
                    createDropdownItem()
                  }
                </div>
              </div>
            </div>
            {
              error && <p className="text-danger">[Error]: {error}</p>
            }
          </>
        ) : (
          <h4 className="d-flex justify-content-center">no orders</h4>
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.orders
});

export default connect(
  mapStateToProps,
  {
    getOrdersList,
    setPage,
    setSortBy,
    setLimit
  }
)(OrderList);