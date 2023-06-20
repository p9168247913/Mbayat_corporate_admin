import React, { useState } from 'react'
import Content from '../../../../layout/content/Content'
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, DataTableHead, DataTableItem, DataTableRow, Icon, PaginationComponent, PreviewAltCard, TooltipComponent } from '../../../../components/Component';
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Head from '../../../../layout/head/Head';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { orderData } from "../order/OrderData";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const cartPage = () => {
  const [data, setData] = useState(orderData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);


  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const token = localStorage.getItem("accessToken")

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const getCartData = () => {
    fetch("http://localhost:5500/corporateCart", {
      method:"GET",
      headers: {
        Authorization: token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data)
        const newData = data.map(item => ({ ...item, quantity: 1 }))
        // console.log("New Data", newData)
        setCartItems(newData);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }

  useEffect(() => {
    getCartData()
  }, []);

  useEffect(() => {
    // Calculate total price based on selected items
    let total = 0;
    cartItems.forEach((item) => {
      if (selectedItemIds.includes(item._id)) {
        total += item.price * item.quantity;
      }
    });
    setTotalPrice(total);
  }, [selectedItemIds, cartItems]);

  const handleQuantityChange = (item, quantity) => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  };

  const handleItemDelete = (item) => {
    // Send delete request to remove item from the cart API
    fetch(`http://localhost:5500/corporateCart/${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    })
      .then((response) => response.json())
      .then(() => {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
        console.log(cartItems.length)

      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
    // console.log(item)
  };

  const handleItemCheckboxChange = (item) => {
    const selectedIds = [...selectedItemIds];
    if (selectedIds.includes(item._id)) {
      selectedIds.splice(selectedIds.indexOf(item._id), 1); // Remove item ID from the array
    } else {
      selectedIds.push(item._id); // Add item ID to the array
    }
    setSelectedItemIds(selectedIds);
  };

  const handleDeleteAndLoad = (item) => {
    handleItemDelete(item)
    getCartData()
    toast.success("Cart item deleted")
  }

  return (
    
    <>
      <Head title="Cart"></Head>
      {/* <h1>Cart PAge</h1>
         */}
      <Content>
        <BlockHead size="sm" >
          <BlockBetween >
            <BlockHeadContent>
              <BlockTitle ><Icon name="cart"></Icon> Shopping Cart</BlockTitle>
            </BlockHeadContent>
            <div>
              <h5 ><Icon name="bag"></Icon> Total Cart Items: {cartItems.length}</h5>
            </div>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: "sm" ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          
                        }}
                        disabled={selectedItemIds.length === 0}
                      >
                        <Link to="/shipping-address" style={{color:"white"}}>
                        <Icon name="bag"></Icon>
                        <span>Purchase Selected Items</span>
                        </Link>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Content>


      {/* <Block>
        <div className="nk-tb-list is-separate is-medium mb-3">
          <DataTableHead className="nk-tb-item">
            <DataTableRow className="nk-tb-col-check">
              <div className="custom-control custom-control-sm custom-checkbox notext">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="pid-all"
                  onChange={(e) => selectorCheck(e)}
                />
                <label className="custom-control-label" htmlFor="pid-all"></label>
              </div>
            </DataTableRow>
            <DataTableRow>
              <span className="sub-text">Order</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span className="sub-text">Customer</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="sub-text">Date</span>
            </DataTableRow>
            <DataTableRow>
              <span className="sub-text">Status</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="sub-text">Purchased</span>
            </DataTableRow>
            <DataTableRow>
              <span className="sub-text">Total</span>
            </DataTableRow>
            <DataTableRow className="nk-tb-col-tools">
              <ul className="nk-tb-actions gx-1 my-n1">
                <li>
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon me-n1">
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#markasdone"
                            onClick={(ev) => {
                              ev.preventDefault();
                              selectorMarkAsDelivered();
                            }}
                          >
                            <Icon name="truck"></Icon>
                            <span>Mark As Delivered</span>
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#remove"
                            onClick={(ev) => {
                              ev.preventDefault();
                              selectorDeleteOrder();
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Remove Orders</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
              </ul>
            </DataTableRow>
          </DataTableHead>

          {currentItems.length > 0
            ? currentItems.map((item) => (
              <DataTableItem key={item.id}>
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      defaultChecked={item.check}
                      id={item.id + "oId-all"}
                      key={Math.random()}
                      onChange={(e) => onSelectChange(e, item.id)}
                    />
                    <label className="custom-control-label" htmlFor={item.id + "oId-all"}></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <a href="#id" onClick={(ev) => ev.preventDefault()}>
                    #{item.orderId}
                  </a>
                </DataTableRow>
                <DataTableRow size="sm">
                  <span className="tb-sub">{item.customer}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span>{item.date}</span>
                </DataTableRow>
                <DataTableRow>
                  <span
                    className={`dot bg-${item.status === "Delivered" ? "success" : "warning"} d-sm-none`}
                  ></span>
                  <Badge
                    className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                    color={
                      item.status === "Delivered" ? "success" : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="tb-sub text-primary">{item.purchased}</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-lead">$ {item.total}</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    {item.status !== "Delivered" && (
                      <li className="nk-tb-action-hidden" onClick={() => markAsDelivered(item.id)}>
                        <TooltipComponent
                          tag="a"
                          containerClassName="btn btn-trigger btn-icon"
                          id={"delivery" + item.id}
                          icon="truck"
                          direction="top"
                          text="Mark as Delivered"
                        />
                      </li>
                    )}
                    <li
                      className="nk-tb-action-hidden"
                      onClick={() => {
                        loadDetail(item.id);
                        toggle("details");
                      }}
                    >
                      <TooltipComponent
                        tag="a"
                        containerClassName="btn btn-trigger btn-icon"
                        id={"view" + item.id}
                        icon="eye"
                        direction="top"
                        text="View Details"
                      />
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdown"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  loadDetail(item.id);
                                  toggle("details");
                                }}
                              >
                                <Icon name="eye"></Icon>
                                <span>Order Details</span>
                              </DropdownItem>
                            </li>
                            {item.status !== "Delivered" && (
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdown"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    markAsDelivered(item.id);
                                  }}
                                >
                                  <Icon name="truck"></Icon>
                                  <span>Mark as Delivered</span>
                                </DropdownItem>
                              </li>
                            )}
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdown"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteOrder(item.id);
                                }}
                              >
                                <Icon name="trash"></Icon>
                                <span>Remove Order</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              </DataTableItem>
            ))
            : null}
        </div>
        <PreviewAltCard>
          {data.length > 0 ? (
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center">
              <span className="text-silent">No orders found</span>
            </div>
          )}
        </PreviewAltCard>
      </Block> */}
      <div style={{ width: "100%", height: "65vh", display: 'flex', gap: "40px", }}>
        <div style={{ width: "60%", height: "95%", maxHeight: "70vh", overflow: "auto", }}>
          {
            cartItems.length > 0 ?
              cartItems.map((item, i) => (
                <div key={i} style={{ paddingTop: '10px', paddingBottom: '10px', display: "flex", gap: "10px", marginLeft: "100px", backgroundColor: "white", borderRadius: "30px", width: "80%", height: "auto", marginTop: "12px", paddingLeft: "", boxShadow: "box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
                  <input
                    type="checkbox"
                    checked={selectedItemIds.includes(item._id)}
                    onChange={() => handleItemCheckboxChange(item)}
                    style={{
                      width: "20px",
                      border: "1px solid red",
                      marginLeft: "15px",
                      cursor: 'pointer',
                    }}
                  />

                  <div style={{ width: "30%", }}>
                    <img src={item.imageLink}
                      style={{
                        marginLeft: "20px",
                        borderRadius: "13px",
                        marginTop: "8px",
                        width: '80%',
                        height: "180px",
                        // border:"1px solid red"
                      }} />
                  </div>
                  <div >

                    <p style={{
                      fontWeight: "bold",
                      fontSize: "20px"
                    }
                    }>{item.brand}</p>

                    <p
                      style={{
                        fontWeight: "100",
                        fontSize: "13px",
                        width: "380px"
                      }}
                    >
                      {item.description}
                    </p>

                    <p style={{
                      fontWeight: "500"
                    }}
                    >
                      Price: {item.price * item.quantity} KWD
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: "space-between",
                      }}>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: "100px",
                        }}>
                        {/* Reduce Quantity */}
                        <button 
                          disabled={item.quantity === 1}
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          style={{
                            fontWeight: "bolder",
                            fontSize: "16px",
                            backgroundColor: 'rgb(199,205,215)',
                            border: 'none',
                            borderRadius: "5px",
                            width: "30px",
                            height: "30px",
                            boxShadow: "box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
                          }}
                        >
                          -
                        </button>

                        <div style={{
                          fontSize: '20px',
                          fontWeight: "bold"
                        }}
                        >
                          {item.quantity}
                        </div>

                        {/* Add Quantity */}
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          style={{
                            fontWeight: "bolder",
                            fontSize: "16px",
                            backgroundColor: 'rgb(199,205,215)',
                            border: 'none',
                            borderRadius: "5px",
                            width: "30px",
                            height: "30px",
                            boxShadow: "box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
                          }}
                        >
                          +
                        </button>
                      </div>
                      {/* Delete Button */}
                      <div>
                        <button
                          onClick={() => handleDeleteAndLoad(item)}
                          style={{
                            border: "none",
                            backgroundColor: "white"
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = 'red';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.color = 'black';
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : <h4>Your Cart is empty</h4>
          }

        </div>
        <div style={{ width: "1px", height: "65vh", border: "1px solid gray" }}></div>
        <div style={{width:"44%"}}>
          <p>{
            selectedItemIds.length > 0 ? `${selectedItemIds.length} items selected` : "No items selected"
          }</p>

          <h2>{
            selectedItemIds.length > 0 ? `Total Amount: ${totalPrice} KWD` : ""
          }</h2>        </div>
      </div>

    </>
  )
}

export default cartPage