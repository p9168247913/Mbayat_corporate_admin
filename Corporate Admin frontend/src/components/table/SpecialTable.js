import React, { useEffect } from "react";
import { orderData, transactionData } from "./TableData";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, Modal, ModalBody, Form, Col } from "reactstrap";
import Icon from "../icon/Icon";
import Button from "../button/Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const SpecialTable = ({ action, isCompact, data }) => {
  const DropdownTrans = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu end>
          <ul className="link-list-plain">
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                View
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Invoice
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Print
              </DropdownItem>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  return (
    <table className={`table table-tranx ${isCompact ? "is-compact" : ""}`}>
      <thead>
        <tr className="tb-tnx-head">
          <th className="tb-tnx-id">
            <span className="">#</span>
          </th>
          <th className="tb-tnx-info">
            <span className="tb-tnx-desc d-none d-sm-inline-block">
              <span>Bill For</span>
            </span>
            <span className="tb-tnx-date d-md-inline-block d-none">
              <span className="d-md-none">Date</span>
              <span className="d-none d-md-block">
                <span>Issue Date</span>
                <span>Due Date</span>
              </span>
            </span>
          </th>
          <th className="tb-tnx-amount is-alt">
            <span className="tb-tnx-total">Total</span>
            <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
          </th>
          {action && (
            <th className="tb-tnx-action">
              <span>&nbsp;</span>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((item) => {
            return (
              <tr key={item.id} className="tb-tnx-item">
                <td className="tb-tnx-id">
                  <a
                    href="#id"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    <span>{item.id}</span>
                  </a>
                </td>
                <td className="tb-tnx-info">
                  <div className="tb-tnx-desc">
                    <span className="title">{item.bill}</span>
                  </div>
                  <div className="tb-tnx-date">
                    <span className="date">{item.issue}</span>
                    <span className="date">{item.due}</span>
                  </div>
                </td>
                <td className="tb-tnx-amount is-alt">
                  <div className="tb-tnx-total">
                    <span className="amount">${item.total}</span>
                  </div>
                  <div className="tb-tnx-status">
                    <Badge
                      className="badge-dot"
                      color={
                        item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </td>

                {action && (
                  <td className="tb-tnx-action">
                    <DropdownTrans />
                  </td>
                )}
              </tr>
            );
          })
          : transactionData.data.map((item) => {
            return (
              <tr key={item.id} className="tb-tnx-item">
                <td className="tb-tnx-id">
                  <a
                    href="#id"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    <span>{item.id}</span>
                  </a>
                </td>
                <td className="tb-tnx-info">
                  <div className="tb-tnx-desc">
                    <span className="title">{item.bill}</span>
                  </div>
                  <div className="tb-tnx-date">
                    <span className="date">{item.issue}</span>
                    <span className="date">{item.due}</span>
                  </div>
                </td>
                <td className="tb-tnx-amount is-alt">
                  <div className="tb-tnx-total">
                    <span className="amount">${item.total}</span>
                  </div>
                  <div className="tb-tnx-status">
                    <Badge
                      className="badge-dot"
                      color={
                        item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </td>

                {action && (
                  <td className="tb-tnx-action">
                    <DropdownTrans />
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export const OrderTable = () => {
  const DropdownTrans = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu end>
          <ul className="link-list-plain">
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                View
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Invoice
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Print
              </DropdownItem>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  return (
    <table className="table table-orders">
      <thead className="tb-odr-head">
        <tr className="tb-odr-item">
          <th className="tb-odr-info">
            <span className="tb-odr-id">Order ID</span>
            <span className="tb-odr-date d-none d-md-inline-block">Date</span>
          </th>
          <th className="tb-odr-amount">
            <span className="tb-odr-total">Amount</span>
            <span className="tb-odr-status d-none d-md-inline-block">Status</span>
          </th>
          <th className="tb-odr-action">&nbsp;</th>
        </tr>
      </thead>
      <tbody className="tb-odr-body">
        {orderData.map((item) => {
          return (
            <tr className="tb-odr-item" key={item.id}>
              <td className="tb-odr-info">
                <span className="tb-odr-id">
                  <a
                    href="#id"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    {item.id}
                  </a>
                </span>
                <span className="tb-odr-date">{item.date}</span>
              </td>
              <td className="tb-odr-amount">
                <span className="tb-odr-total">
                  <span className="amount">${item.amount}</span>
                </span>
                <span className="tb-odr-status">
                  <Badge
                    className="badge-dot"
                    color={
                      item.status === "Complete" ? "success" : item.status === "Pending" ? "warning" : "danger"
                    }
                  >
                    {item.status}
                  </Badge>
                </span>
              </td>
              <td className="tb-odr-action">
                <div className="tb-odr-btns d-none d-md-inline">
                  <Button color="primary" className="btn-sm">
                    View
                  </Button>
                </div>
                <DropdownTrans />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export const LoginLogTable = () => {

  const [loginLogData, setLoginLogData] = useState([])
  console.log(loginLogData.length)
  localStorage.setItem("loginLogData", loginLogData.length)

  const getLoginLog = async () => {
    await axios.get(`http://localhost:5500/corporateUserLog`, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    })
      .then(response => {
        console.log(response.data);
        setLoginLogData(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLoginLog();
  }, []);

  const handleLogItemDelete = (item) => {
    fetch(`http://localhost:5500/corporateUserLog/${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    })
      .then((response) => response.json())
      .then(() => {
        setLoginLogData(loginLogData.filter((logItem) => logItem._id !== item._id));
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  };


  const handleLogHistoryDelete = async () => {
    await axios.delete(`http://localhost:5500/corporateUserLog`, {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      }
    })
      .then((response) => {
        toast.success("Deleted Browsing History")
        getLoginLog()
      })
      .catch((error) => {
        toast.error("An error occured")
      });
  };

  const [deleteAll, setDeleteAll] = useState({
    delete: false
  })

  const onFormCancel = () => {
    setDeleteAll({ delete: false });
  };

  const handleDeleteModal =()=>{
    handleLogHistoryDelete()
    setDeleteAll({ delete: false });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    
    return formattedDate;
  }

  return (
    <div style={{ maxHeight: '500px', overflow: 'auto' }}>
      <table className="table table-ulogs" style={{ columnGap: "20px" }}>
        <thead className="table-light" style={{ position: 'sticky', top: "0px" }}>
          <tr>
            <th className="tb-col-os">
              <span className="overline-title">
                Sr. No. <span className="d-sm-none">/ IP</span>
              </span>
            </th>
            <th className="tb-col-os">
              <span className="overline-title">
                Browser <span className="d-sm-none">/ IP</span>
              </span>
            </th>
            <th className="tb-col-ip">
              <span className="overline-title">IP</span>
            </th>
            <th className="tb-col-time">
              <span className="overline-title">Time</span>
            </th>
            <th className="tb-col-action">
              <button style={{
                border: "none",
                color: 'red',
                background: "none",
              }}
                className="overline-title"
                onMouseOver={(e) => {
                  e.target.style.color = "black"
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "red"
                }}
                onClick={() => setDeleteAll({ delete: true })}
              >Clear All</button>
            </th>
          </tr>
        </thead>
        <tbody >
          {loginLogData.map((item, idx) => {
            return (
              <tr key={idx}>
                <td className="tb-col-os" >{idx + 1}</td>
                <td className="tb-col-os" style={{ width: "35%" }}>{item.browserName}</td>
                <td className="tb-col-ip">
                  <span className="sub-text">{item.ipAddress}</span>
                </td>
                <td className="tb-col-time">
                  <span className="sub-text">
                    {formatDate(item.loginTime)}
                  </span>
                </td>
                <td className="tb-col-action">
                  <div
                    onClick={(ev) => {
                      ev.preventDefault();
                      handleLogItemDelete(item)

                    }}
                    className="link-cross me-sm-n1"
                  >
                    <Icon name="cross"></Icon>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpen={deleteAll.delete} toggle={() => setDeleteAll({ delete: false })} className="modal-dialog-centered" size="sm"
      >
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              onFormCancel();
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Clear all Login History?</h5>

            <div className="mt-4">
              <Button onClick={handleDeleteModal} style={{background:"red", color:"white",}} size="md" type="submit">
                Yes
              </Button>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
                className="link link-light"
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
