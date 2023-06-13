import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";
import { orderData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "../orders/OrderData";
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
    DataTableBody,
    DataTable,
    RSelect,
    Button,
    Row,
    Col,
} from "../../../components/Component";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,

    ModalBody,
    Modal,
    Badge
} from "reactstrap";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../../utils/Utils";
import {getUserByInterest} from "../../../services/interestServices/interestService";
import Swal from "sweetalert2";

const Notification = () => {
    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        notification: "",
    });
    const [view, setView] = useState({
        add: false,
        details: false,
    });
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(7);
    const [sort, setSortState] = useState("");

    // Sorting data
    const sortFunc = (params) => {
        let defaultData = data;
        if (params === "asc") {
            let sortedData = defaultData.sort((a, b) => a.ref.localeCompare(b.ref));
            setData([...sortedData]);
        } else if (params === "dsc") {
            let sortedData = defaultData.sort((a, b) => b.ref.localeCompare(a.ref));
            setData([...sortedData]);
        }
    };

    useEffect(async () => {
        await getAllUserLists();
    },[]);

    const getAllUserLists = async () => {
        const getLists = await getUserByInterest();
        if(getLists.status === "success"){
            let tempData = [];

            tempData = getLists.data.map((value) => {
                let check = false;
                return {...value, ...check};
            });
            setData(tempData);
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
        }
    }, [onSearchText]);

    // toggle function to view order details
    const toggle = (type) => {
        setView({
            add: type === "add" ? true : false,
            details: type === "details" ? true : false,
        });
    };

    // selects all the orders
    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.check = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };

    // resets forms
    const resetForm = () => {
        setFormData({
            notification: "",
        });
    };

    // Submits form data
    const onFormSubmit = () => {
        const { notification } = formData;

        if(notification !== ""){

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Notification sent successfully",
            });

            setView({ add: false, details: false });
            resetForm();
        }

    };


    // OnChange function to get the input data
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // selects one product
    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].check = e.currentTarget.checked;
        setData([...newData]);
    };


    // function to close the form modal
    const onFormCancel = () => {
        setView({ add: false, details: false });
        resetForm();
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
            <Head title="Notification"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Notification</BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <Button
                                    className="toggle btn-icon d-md-none"
                                    color="primary"
                                    onClick={() => {
                                        toggle("add");
                                    }}
                                >
                                    <Icon name="plus"></Icon>
                                </Button>
                                <Button
                                    className="toggle d-none d-md-inline-flex"
                                    color="primary"
                                    onClick={() => {
                                        toggle("add");
                                    }}
                                >
                                    <Icon name="plus"></Icon>
                                    <span>Send Notification</span>
                                </Button>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <DataTable className="card-stretch">
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">Send Notification</h5>
                                </div>
                                <div className="card-tools me-n1">
                                    <ul className="btn-toolbar gx-1">
                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                                    <Icon name="setting"></Icon>
                                                </DropdownToggle>
                                                <DropdownMenu end className="dropdown-menu-xs">
                                                    <ul className="link-check">
                                                        <li>
                                                            <span>Show</span>
                                                        </li>
                                                        <li className={itemPerPage === 10 ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setItemPerPage(10);
                                                                }}
                                                            >
                                                                10
                                                            </DropdownItem>
                                                        </li>
                                                        <li className={itemPerPage === 15 ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setItemPerPage(15);
                                                                }}
                                                            >
                                                                15
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                    <ul className="link-check">
                                                        <li>
                                                            <span>Order</span>
                                                        </li>
                                                        <li className={sort === "dsc" ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setSortState("dsc");
                                                                    sortFunc("dsc");
                                                                }}
                                                            >
                                                                DESC
                                                            </DropdownItem>
                                                        </li>
                                                        <li className={sort === "asc" ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setSortState("asc");
                                                                    sortFunc("asc");
                                                                }}
                                                            >
                                                                ASC
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <DataTableBody bodyclass="nk-tb-tnx">
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
                                    <span className="sub-text">Customer Name</span>
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
                                                    id={item.id + "pid-all"}
                                                    key={Math.random()}
                                                    onChange={(e) => onSelectChange(e, item.id)}
                                                />
                                                <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                                            </div>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>{item.first_name + " " + item.last_name}</span>
                                        </DataTableRow>

                                    </DataTableItem>
                                ))
                                : null}
                        </DataTableBody>
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
                                    <span className="text-silent">No Customer found</span>
                                </div>
                            )}
                        </PreviewAltCard>
                    </DataTable>
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
                            <h5 className="title">Send Notification</h5>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit(onFormSubmit)}>
                                    <Row className="g-3">
                                        <Col md="12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="customer">
                                                    Notification Text
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="notification"
                                                        onChange={(e) => onInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col size="12">
                                            <Button color="primary" type="submit">
                                                <span>Send</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

            </Content>
        </React.Fragment>
    );
};

export default Notification;
