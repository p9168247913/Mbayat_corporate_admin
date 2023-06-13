import React, { useState, useEffect } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import {
    Block,
    BlockHead,
    BlockTitle,
    BlockBetween,
    BlockHeadContent,
    BlockDes,
    Icon,
    Row,
    Col,
    Button,
    DataTableHead,
    DataTableBody,
    DataTableRow,
    DataTableItem,
    PaginationComponent,
} from "../../../../components/Component";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";
import { productData, categoryOptions } from "../ProductData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../../../components/Component";
import Cookies from "universal-cookie";
import {
    createProductCategory,
    editProductCategory,
    getAllCategoryByVendor
} from "../../../../services/productServices/productService";

const ProductCategory = () => {
    const [data, setData] = useState([]);
    const [sm, updateSm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        img: null,
        sku: "",
        price: 0,
        stock: 0,
        category: [],
        fav: false,
        check: false,
    });
    const [editId, setEditedId] = useState();
    const [view, setView] = useState({
        edit: false,
        add: false,
        details: false,
    });
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);
    const [files, setFiles] = useState([]);

    const cookies = new Cookies();

    useEffect(async () => {
        await getAllCategorys();
    },[]);

    const getAllCategorys = async () => {
        const get = await getAllCategoryByVendor();
        if(get.status === "success"){
            setData(get.data);
        }
    }

    // Changing state value when searching name
    useEffect(async () => {
        if (onSearchText !== "") {
            const filteredObject = data.filter((item) => {
                return item.name.toLowerCase().includes(onSearchText.toLowerCase());
            });
            setData([...filteredObject]);
        } else {
            setData([...data]);
            await getAllCategorys();
        }
    }, [onSearchText]);

    // OnChange function to get the input data
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // category change
    const onCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    // function to close the form modal
    const onFormCancel = () => {
        setView({ edit: false, add: false, details: false });
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
        });
        reset({});
    };

    const onFormSubmit = async (form) => {
        const { title } = form;
        let submittedData = {
            userId: cookies.get('user').id,
            categoryName: title,
        };

        const createApi = await createProductCategory(submittedData);
        if(createApi.status === "success"){
            setView({ open: false });
            resetForm();
            await getAllCategorys();
        }else{

        }
    };

    const onEditSubmit = async (form) => {
        let id = editId;
        let {name} = form;

        let submitData = {
            productCategoryId: id,
            categoryName: name,
            userId: cookies.get('user').id,
        }

        const edit = await editProductCategory(submitData);
        if(edit.status === "success"){
            resetForm();
            setView({ edit: false, add: false });
            await getAllCategorys();
        }else{

        }

    };

    // function that loads the want to editted data
    const onEditClick = (id) => {
        data.forEach((item) => {
            if (item.id === id) {
                setFormData({
                    name: item.name,
                });
            }
        });
        setEditedId(id);
        setFiles([]);
        setView({ add: false, edit: true });
    };

    // selects all the products
    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.check = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };

    // selects one product
    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].check = e.currentTarget.checked;
        setData([...newData]);
    };

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    // function to delete a product
    const deleteProduct = (id) => {
        let defaultData = data;
        defaultData = defaultData.filter((item) => item.id !== id);
        setData([...defaultData]);
    };

    // function to delete the seletected item
    const selectorDeleteProduct = () => {
        let newData;
        newData = data.filter((item) => item.check !== true);
        setData([...newData]);
    };

    // toggle function to view product details
    const toggle = (type) => {
        setView({
            edit: type === "edit" ? true : false,
            add: type === "add" ? true : false,
            details: type === "details" ? true : false,
        });
    };

    // handles ondrop function of dropzone
    const handleDropChange = (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    };

    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const { errors, register, handleSubmit, reset } = useForm();

    return (
        <React.Fragment>
            <Head title="Product List"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle>Product Categories</BlockTitle>
                        </BlockHeadContent>
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
                                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
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
                                                    placeholder="Quick search by Name"
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
                                                                <span>Active</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>In Active</span>
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>
                                        <li className="nk-block-tools-opt">
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
                                                <span>Add Category</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Card>
                        <div className="card-inner-group">
                            <div className="card-inner p-0">
                                <DataTableBody>
                                    <DataTableHead>
                                        <DataTableRow className="nk-tb-col-check">
                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                <label className="custom-control-label" htmlFor="uid_1"></label>
                                            </div>
                                        </DataTableRow>
                                        <DataTableRow size="sm">
                                            <span>Name</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>Sub Categories</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>Status</span>
                                        </DataTableRow>
                                        <DataTableRow className="nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1 my-n1">
                                                <li className="me-n1">
                                                    Actions
                                                </li>
                                            </ul>
                                        </DataTableRow>
                                    </DataTableHead>
                                    {currentItems.length > 0
                                        ? currentItems.map((item) => {
                                            return (
                                                <DataTableItem key={item.id}>
                                                    <DataTableRow className="nk-tb-col-check">
                                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                                            <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                                                        </div>
                                                    </DataTableRow>
                                                    <DataTableRow size="sm">
                                                      <span className="tb-product">
                                                        <span className="title">{item.name}</span>
                                                      </span>
                                                    </DataTableRow>
                                                    <DataTableRow size="md">
                                                      <span className="tb-sub">
                                                          {
                                                              item.category !== undefined && (
                                                                  <>
                                                                      {item.category.map((cat) => {
                                                                          if (item.category[cat] + 1 === null || undefined) {
                                                                              return cat.label;
                                                                          } else return cat.label + ", ";
                                                                      })}
                                                                  </>
                                                              )
                                                          }
                                                      </span>
                                                    </DataTableRow>
                                                    <DataTableRow size="sm">
                                                      <span className="tb-product">
                                                        <span className="title text-capitalize">{item.status}</span>
                                                      </span>
                                                    </DataTableRow>
                                                    <DataTableRow className="nk-tb-col-tools">
                                                        <ul className="nk-tb-actions gx-1 my-n1">
                                                            <li className="me-n1">
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle
                                                                        tag="a"
                                                                        href="#more"
                                                                        onClick={(ev) => ev.preventDefault()}
                                                                        className="dropdown-toggle btn btn-icon btn-trigger"
                                                                    >
                                                                        <Icon name="more-h"></Icon>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu end>
                                                                        <ul className="link-list-opt no-bdr">
                                                                            <li>
                                                                                <DropdownItem
                                                                                    tag="a"
                                                                                    href="#edit"
                                                                                    onClick={(ev) => {
                                                                                        ev.preventDefault();
                                                                                        onEditClick(item.id);
                                                                                        toggle("edit");
                                                                                    }}
                                                                                >
                                                                                    <Icon name="edit"></Icon>
                                                                                    <span>Edit Category</span>
                                                                                </DropdownItem>
                                                                            </li>
                                                                            <li>
                                                                                <DropdownItem
                                                                                    tag="a"
                                                                                    href="#remove"
                                                                                    onClick={(ev) => {
                                                                                        ev.preventDefault();
                                                                                        deleteProduct(item.id);
                                                                                    }}
                                                                                >
                                                                                    <Icon name="trash"></Icon>
                                                                                    <span>Remove Category</span>
                                                                                </DropdownItem>
                                                                            </li>
                                                                        </ul>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </li>
                                                        </ul>
                                                    </DataTableRow>
                                                </DataTableItem>
                                            );
                                        })
                                        : null}
                                </DataTableBody>
                                <div className="card-inner">
                                    {data.length > 0 ? (
                                        <PaginationComponent
                                            itemPerPage={itemPerPage}
                                            totalItems={data.length}
                                            paginate={paginate}
                                            currentPage={currentPage}
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <span className="text-silent">No products found</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Block>

                <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
                            <h5 className="title">Update Category</h5>
                            <div className="mt-4">
                                <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                                    <Row className="g-3">
                                        <Col size="12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="product-title">
                                                    Category Name
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        onChange={(e) => onInputChange(e)}
                                                        ref={register({
                                                            required: "This field is required",
                                                        })}
                                                        defaultValue={formData.name}
                                                    />
                                                    {errors.title && <span className="invalid">{errors.title.message}</span>}
                                                </div>
                                            </div>
                                        </Col>

                                        <Col size="12">
                                            <Button color="primary" type="submit">
                                                <Icon className="plus"></Icon>
                                                <span>Save Category</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <SimpleBar
                    className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
                        view.add ? "content-active" : ""
                    }`}
                >
                    <BlockHead>
                        <BlockHeadContent>
                            <BlockTitle tag="h5">Add Category</BlockTitle>
                            <BlockDes>
                                <p>Add information or update Category.</p>
                            </BlockDes>
                        </BlockHeadContent>
                    </BlockHead>
                    <Block>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <Row className="g-3">
                                <Col size="12">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="product-title">
                                            Category Name
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                onChange={(e) => onInputChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                                defaultValue={formData.name}
                                            />
                                            {errors.title && <span className="invalid">{errors.title.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="12">
                                    <Button color="primary" type="submit">
                                        <Icon className="plus"></Icon>
                                        <span>Save Category</span>
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </Block>
                </SimpleBar>

                {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
            </Content>
        </React.Fragment>
    );
};

export default ProductCategory;
