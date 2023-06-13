import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
  RSelect,
} from "../../../components/Component";
import { getDateStructured } from "../../../utils/Utils";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody, Badge } from "reactstrap";
import { useForm } from "react-hook-form";
import {getAllVendorOrders, updateOrderStatus} from "../../../services/orderServices/orderService";
import moment from "moment";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie'

const OrderRegular = () => {

  const cookies = new Cookies();

  const [data, setData] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "",
    customer: "",
    purchased: "",
    total: "",
    check: false,
  });
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  useEffect(async () => {
    await fetchAllOrders();
  },[]);

  const fetchAllOrders = async () => {
    const get = await getAllVendorOrders();
    if(get.status === "success"){
      setData(get.data);
    }else{
      setData([]);
    }
  }

  // Changing state value when searching name
  useEffect(async () => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return item.orderId.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else {
      setData([...data]);
      await fetchAllOrders();
    }
  }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markAsDelivered = async (id) => {

    let newData = data;
    let index = newData.find((item) => item.id === id);

    if(index.orderStatus === "delivered"){
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Order already mark as delivered",
      });
    }else{
      const submitData = {
        vendorId: cookies.get('user').id,
        orderId: id,
        status: "delivered"
      }

      const markAsDone = await updateOrderStatus(submitData);
      if(markAsDone.status === "success"){
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Order mark as delivered successfully.",
        });
        await fetchAllOrders();
      }else{
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: markAsDone.message,
        });
      }
    }

  };


  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
      <React.Fragment>
        <Head title="Corporate Orders"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Corporate Orders</BlockTitle>
              </BlockHeadContent>
              <BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                  <a
                      href="#more"
                      className="btn btn-icon btn-trigger toggle-expand me-n1"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setSmOption(!smOption);
                      }}
                  >
                    <Icon name="more-v"></Icon>
                  </a>
                  <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <div className="form-control-wrap">
                          <div className="form-icon form-icon-right">
                            <Icon name="search"></Icon>
                          </div>
                          <input
                              type="text"
                              className="form-control"
                              id="default-04"
                              placeholder="Search by orderId"
                              onChange={(e) => onFilterChange(e)}
                          />
                        </div>
                      </li>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle
                              color="transparent"
                              className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                          >
                            Status
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                  <span>Upcoming</span>
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                  <span>Delivered</span>
                                </DropdownItem>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>

                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow size="md">
                  <span className="sub-text">Product Name</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">Date</span>
                </DataTableRow>

                <DataTableRow size="sm">
                  <span className="sub-text">Customer</span>
                </DataTableRow>

                <DataTableRow>
                  <span className="sub-text">Status</span>
                </DataTableRow>

                <DataTableRow >
                  <span className="sub-text">Actions</span>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                  ? currentItems.map((item) => (
                      <DataTableItem key={item.id}>
                        <DataTableRow size="md">
                          <span className="tb-sub text-primary">{item.productId?.name}</span>
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span>{moment(item.createdAt).format('DD-MM-Y') }</span>
                        </DataTableRow>
                        <DataTableRow size="sm">
                          <span className="tb-sub">{item.userId?.first_name + " " + item.userId?.last_name }</span>
                        </DataTableRow>
                        <DataTableRow>
                      <span
                          className={`dot bg-${item.orderStatus === "delivered" ? "success" : "warning"} d-sm-none`}
                      ></span>
                          <Badge
                              className="badge-sm badge-dot has-bg d-none d-sm-inline-flex text-capitalize"
                              color={
                                item.orderStatus === "delivered" ? "success" : "warning"
                              }
                          >
                            {item.orderStatus}
                          </Badge>
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
          </Block>

          <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
            <ModalBody>
              <a href="#cancel" className="close">
                {" "}
                <Icon
                    name="cross-sm"
                    onClick={(ev) => {
                      ev.preventDefault();
                      onFormCancel();
                    }}
                ></Icon>
              </a>
              <div className="p-2">
                <h5 className="title">Add Order</h5>
                <div className="mt-4">
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="g-3">
                      <Col md="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="customer">
                            Customer Name
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                name="customer"
                                onChange={(e) => onInputChange(e)}
                                ref={register({
                                  required: "This field is required",
                                })}
                                defaultValue={formData.customer}
                            />
                            {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="date">
                            Date of order
                          </label>
                          <div className="form-control-wrap">
                            <DatePicker
                                selected={formData.date}
                                className="form-control"
                                onChange={(date) => setFormData({ ...formData, date: date })}
                            />
                            {errors.date && <span className="invalid">{errors.date.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="purchased">
                            Purchased Product
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                name="purchased"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.purchased}
                            />
                            {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="total">
                            Total Price
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="number"
                                className="form-control"
                                name="total"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.total}
                            />
                            {errors.total && <span className="invalid">{errors.total.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="status">
                            Status
                          </label>
                          <div className="form-control-wrap">
                            <RSelect
                                name="status"
                                options={[
                                  { value: "On Hold", label: "On Hold" },
                                  { value: "Delivered", label: "Delivered" },
                                ]}
                                onChange={(e) => setFormData({ ...formData, status: e.value })}
                                defaultValue={formData.status}
                            />
                          </div>
                        </div>
                      </Col>

                      <Col size="12">
                        <Button color="primary" type="submit">
                          <Icon className="plus"></Icon>
                          <span>Add Order</span>
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </ModalBody>
          </Modal>

          <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
            <ModalBody>
              <a href="#cancel" className="close">
                {" "}
                <Icon
                    name="cross-sm"
                    onClick={(ev) => {
                      ev.preventDefault();
                      onFormCancel();
                    }}
                ></Icon>
              </a>
              <div className="nk-tnx-details mt-sm-3">
                <div className="nk-modal-head mb-3">
                  <h5 className="title">Order Details</h5>
                </div>
                <Row className="gy-3">
                  <Col lg={6}>
                    <span className="sub-text">Order Id</span>
                    <span className="caption-text">{formData.id}</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Status</span>
                    <span
                        className={`dot bg-${formData.orderStatus === "delivered" ? "success" : "warning"} d-sm-none`}
                    ></span>
                    <Badge
                        className="badge-sm badge-dot has-bg d-none d-sm-inline-flex text-capitalize"
                        color={
                          formData.orderStatus === "delivered" ? "success" : "warning"
                        }
                    >
                      {formData.orderStatus}
                    </Badge>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Customer</span>
                    <span className="caption-text">{formData.userId?.first_name + " "+ formData.userId?.last_name }</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Product Name</span>
                    <span className="caption-text">{formData.productId?.name}</span>
                  </Col>
                  <Col lg={6}>
                    <span className="sub-text">Total Price</span>
                    <span className="caption-text">${formData.subTotal}</span>
                  </Col>
                </Row>
              </div>
            </ModalBody>
          </Modal>
        </Content>
      </React.Fragment>
  );
};

export default OrderRegular;
