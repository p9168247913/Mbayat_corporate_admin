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
    createProductSubCategory,
    editProductSubCategory,
    getAllCategoryByVendor, getAllSubCategoryByVendor
} from "../../../../services/productServices/productService";

const ProductSubCategory = () => {
    const [data, setData] = useState([]);
    const [sm, updateSm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
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
    const [parentCategory, setParentCategory] = useState([]);

    const cookies = new Cookies();

    useEffect(async () => {
        await getAllCategorys();
        await getParentCategory();
    },[]);

    const getAllCategorys = async () => {
        const get = await getAllSubCategoryByVendor();
        if(get.status === "success"){
            setData(get.data);
        }
    }

    const getParentCategory = async () => {
        const get = await getAllCategoryByVendor();
        if(get.status === "success"){
            setParentCategory(get.data);
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


    // function to close the form modal
    const onFormCancel = () => {
        setView({ edit: false, add: false, details: false });
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            categoryId: "",
        });
        reset({});
    };

    const onFormSubmit = async () => {
        const { title, categoryId } = formData;
        let submittedData = {
            productCategoryId: categoryId,
            userId: cookies.get('user').id,
            name: title,
        };

        const createApi = await createProductSubCategory(submittedData);
        if(createApi.status === "success"){
            setView({ open: false });
            resetForm();
            await getAllCategorys();
        }else{

        }
    };

    const onEditSubmit = async () => {
        let id = editId;
        let {name,categoryId } = formData;

        let submitData = {
            productCategoryId: categoryId,
            subCategoryId: id,
            userId: cookies.get('user').id,
            name: name,
        }

        const edit = await editProductSubCategory(submitData);
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
                    categoryId: item.categoryId.id
                });
            }
        });
        setEditedId(id);
        setFiles([]);
        setView({ add: false, edit: true });
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


    // toggle function to view product details
    const toggle = (type) => {
        setView({
            edit: type === "edit" ? true : false,
            add: type === "add" ? true : false,
            details: type === "details" ? true : false,
        });
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
                            <BlockTitle>Product Sub Categories</BlockTitle>
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
                                                <span>Add Sub Category</span>
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
                                        <DataTableRow size="sm">
                                            <span>Parent Category Name</span>
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
                                                    <DataTableRow size="sm">
                                                      <span className="tb-product">
                                                        <span className="title">{item?.categoryId.name}</span>
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
                                                                                    <span>Edit Sub Category</span>
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
                                                                                    <span>Remove Sub Category</span>
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
                            <h5 className="title">Update Sub Category</h5>
                            <div className="mt-4">
                                <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                                    <Row className="g-3">
                                        <Col size="12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="product-title">
                                                    Category
                                                </label>
                                                <div className="form-control-wrap">
                                                    <select name="categoryId" className="form-select" onChange={(e) => onInputChange(e)} defaultValue={formData.categoryId}>
                                                        <option value="">Select...</option>
                                                        {
                                                            parentCategory.map((cat) =>
                                                                <option value={cat.id} selected={formData.categoryId === cat.id}>{cat.name}</option>
                                                            )
                                                        }
                                                    </select>
                                                    {errors.categoryId && <span className="invalid">{errors.categoryId.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
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
                                                <span>Save Sub Category</span>
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
                                            Category
                                        </label>
                                        <div className="form-control-wrap">
                                            <select name="categoryId" className="form-select" onChange={(e) => onInputChange(e)}>
                                                <option value="">Select...</option>
                                                {
                                                    parentCategory.map((cat) =>
                                                        <option value={cat.id}>{cat.name}</option>
                                                    )
                                                }
                                            </select>
                                            {errors.categoryId && <span className="invalid">{errors.categoryId.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="12">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="product-title">
                                            Sub Category Name
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

export default ProductSubCategory;
