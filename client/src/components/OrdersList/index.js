import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getOrdersList, setPage, setSortBy, setLimit, deleteOrder, editOrder } from '../../redux/actions/orderActions';

const OrderList = ({ data: {orders, limit, page, total, pages, sortBy, loading, error}, getOrdersList, setPage, setSortBy, setLimit, deleteOrder, editOrder }) => {

  const [currentItem, setCurrentItem] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentDate, setCurrentDate] = useState({
    day: 0,
    month: 0,
    year: 0,
    hour: 0,
    minute: 0,
    second: 0
  });
  const [currentValue, setCurrentValue] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');

  const {day, month, year, hour, minute, second} = currentDate;

  useEffect(() => {
    getOrdersList({ page, limit, sortBy })
  },[page, limit, sortBy]);

  const HandleSetPage = (event) => {
    event.preventDefault();
    setPage(event.target.innerText*1)
  };
  const HandleSetSortBy = (sortType) => {
    setSortBy(sortType)
  };
  const HandleSetLimit = (event) => {
    setLimit(event.target.innerText*1)
  };

  const createPagination = () => {
    let pagination = [];
    for (let i = 0; i < pages; i++) {
      pagination.push(
        <li key={i} className={page === i+1 ? 'page-item active' : 'page-item'}><a onClick={HandleSetPage} className='page-link' href={`?page=${i+1}`}>{i+1}</a></li>
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

  const HandleClickEdit = () => {
    editOrder({id: currentItem, email: currentUserEmail, date: currentDate, value: currentValue, currency: currentCurrency, status: currentStatus})
  };
  const HandleClickDelete = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      deleteOrder(id)
    }
  };
  const HandleSetCurrent = (item) => {
    setCurrentItem(item._id);
    const d = new Date(item.date);
    setCurrentUserEmail(item.user_email);
    setCurrentDate({
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds()
    });
    setCurrentValue(item.value);
    setCurrentCurrency(item.currency);
    setCurrentStatus(item.status);
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
                <th scope="col">actions</th>
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
                      <td>
                        <button type="button" className="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter"  onClick={() => HandleSetCurrent(item)}>Edit</button>
                        <button type="button" className="btn btn-link" onClick={() => HandleClickDelete(item._id)}>Delete</button></td>
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

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Edit Order</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1email">Email</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1email" value={currentUserEmail} onChange={(e) => setCurrentUserEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1email">Date</label>
                  <div className="form-row" id="exampleFormControlInput1emailDate">
                    <div className="col">
                      <label>Day</label>
                      <input type="number" min="1" max="31" className="form-control" value={day} onChange={(e) => setCurrentDate({...currentDate, day: e.target.value})}/>
                    </div>
                    <div className="col">
                      <label>Month</label>
                      <input type="number" min="1" max="12" className="form-control" value={month} onChange={(e) => setCurrentDate({...currentDate, month: e.target.value})}/>
                    </div>
                    <div className="col">
                      <label>Year</label>
                      <input type="number" min="1970" className="form-control" value={year} onChange={(e) => setCurrentDate({...currentDate, year: e.target.value})}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <label>Hours</label>
                      <input type="number" min="0" max="23" className="form-control" value={hour} onChange={(e) => setCurrentDate({...currentDate, hour: e.target.value})}/>
                    </div>
                    <div className="col">
                      <label>Minutes</label>
                      <input type="number" min="0" max="59" className="form-control" value={minute} onChange={(e) => setCurrentDate({...currentDate, minute: e.target.value})}/>
                    </div>
                    <div className="col">
                      <label>Seconds</label>
                      <input type="number" min="0" max="59" className="form-control" value={second} onChange={(e) => setCurrentDate({...currentDate, second: e.target.value})}/>
                    </div>
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1Value">Value</label>
                  <input type="number" className="form-control" id="exampleFormControlInput1Value" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1Currency">Currency</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1Currency" value={currentCurrency} onChange={(e) => setCurrentCurrency(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1Status">Status</label>
                  <select className="form-control" id="exampleFormControlSelect1Status" value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                    <option>approved</option>
                    <option>pending</option>
                    <option>rejected</option>
                  </select>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={HandleClickEdit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

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
    setLimit,
    deleteOrder,
    editOrder
  }
)(OrderList);