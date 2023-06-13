import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
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
} from "../../../components/Component";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";

import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";

import {
  createProduct, editProduct,
  fetchSubCategoryByCategory,
  getAllCategoryByVendor,
  getAllProductsByVendor, removeProduct
} from "../../../services/productServices/productService";
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";
const ProductList = () => {

  const cookies = new Cookies();

  const [data, setData] = useState([]);
  const [sm, updateSm] = useState(false);

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
  const [categories, setCategories] = useState(cookies.get('user').interests);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  useEffect(async () => {
    await getAllProducts();
    if(categories.length > 0){
      const [getFirst] = categories;
      setSelectedCategories(getFirst.id);
      setFormData({
        ...formData,
        ...{
          category: getFirst.id,
        }
      })
      await getSubCategoryByCategory(getFirst.id);
    }
  },[]);

  const [formData, setFormData] = useState({
    userId: cookies.get('user').id,
    name: "",
    img: null,
    description: "",
    barcode: "",
    sellingPrice: 0,
    corporatePrice: 0,
    totalQuantity: 0,
    minB2BOrder: 0,
    category: selectedCategories,
    subCategory: "",
  });

  const getAllProducts = async () => {
    const get = await getAllProductsByVendor();
    if(get.status === "success"){
      setData(get.data);
    }
  }

  // const fetchCategory = async () => {
  //   const get = await getAllCategoryByVendor();
  //   if(get.status === "success"){
  //     setCategories(get.data);
  //   }
  // }

  const getSubCategoryByCategory = async (cateId) => {
    const get = await fetchSubCategoryByCategory(cateId);
    if(get.status === "success"){
      setSubCategories(get.data);
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
      await getAllProducts();
    }
  }, [onSearchText]);

  // OnChange function to get the input data
  const onInputChange = async (e) => {
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
      img: null,
      description: "",
      barcode: "",
      sellingPrice: 0,
      corporatePrice: 0,
      totalQuantity: 0,
      minB2BOrder: 0,
      category: selectedCategories,
      subCategory: "",
      userId: cookies.get('user').id,
    });
    reset({});
  };

  const onFormSubmit = async () => {

    const submitData = new FormData();
    submitData.append('barcode', "");
    submitData.append('category', formData.category);
    submitData.append('corporatePrice', formData.corporatePrice);
    submitData.append('description', formData.description);
    submitData.append('minB2BOrder', formData.minB2BOrder);
    submitData.append('name', formData.name);
    submitData.append('sellingPrice', formData.sellingPrice);
    submitData.append('subCategory', formData.subCategory !== "" ? formData.subCategory : null);
    submitData.append('totalQuantity', formData.totalQuantity);
    submitData.append('userId', formData.userId);

    files.forEach((file) => {
      submitData.append('images', file);
    });

    const create = await createProduct(submitData);
    if(create.status === "success"){
      setView({ open: false });
      setFiles([]);
      resetForm();
      await getAllProducts();
    }else{
      Swal.fire({
        icon:"error",
        title: "Error!",
        text: create.message,
      });
    }
  };

  const onEditSubmit = async () => {
    let id = editId;

    // let submitData = {
    //   ...formData,
    //   productId: id,
    // }
    const submitData = new FormData();
    submitData.append('barcode', "");
    submitData.append('productId', id);
    submitData.append('category', formData.category);
    submitData.append('corporatePrice', formData.corporatePrice);
    submitData.append('description', formData.description);
    submitData.append('minB2BOrder', formData.minB2BOrder);
    submitData.append('name', formData.name);
    submitData.append('sellingPrice', formData.sellingPrice);
    submitData.append('subCategory', formData.subCategory !== "" ? formData.subCategory : null);
    submitData.append('totalQuantity', formData.totalQuantity);
    submitData.append('userId', formData.userId);
    submitData.append('status', "active");

    files.forEach((file) => {
      submitData.append('images', file);
    });
    const update = await editProduct(submitData);
    if(update.status === "success"){
      resetForm();
      setView({ edit: false, add: false });
      await getAllProducts();
    }else{
      Swal.fire({
        icon:"error",
        title: "Error!",
        text: update.message,
      });
    }

  };

  // function that loads the want to editted data
  const onEditClick = async (id) => {
    let cateId = "";
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          userId: cookies.get('user').id,
          name: item.name,
          img: null,
          description: item.description,
          barcode: item.barcode,
          sellingPrice: item.sellingPrice,
          corporatePrice: item.corporatePrice,
          totalQuantity: item.totalQuantity,
          minB2BOrder: item.minB2BOrder,
          category: item.category.id,
          subCategory: item.subCategory,
        });
        cateId = item.category.id;
      }
    });
    await getSubCategoryByCategory(cateId);
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
    // let defaultData = data;
    // defaultData = defaultData.filter((item) => item.id !== id);
    // setData([...defaultData]);

    const submitData = {
      userId: cookies.get('user').id,
      productId: id,
    }

    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure want to remove this product?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes"
    }).then(async (res) => {
      if(res.isConfirmed){

        const remove = await removeProduct(submitData);
        if(remove.status === "success"){
          Swal.fire({
            icon:"success",
            title: "Success!",
            text: "Product removed successfully",
          });
          await getAllProducts();
        }else{
          Swal.fire({
            icon:"error",
            title: "Error!",
            text: remove.message,
          });
        }

      }
    })
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
              <BlockTitle>Products</BlockTitle>
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
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
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
                        <span>Add Product</span>
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
                    <DataTableRow size="sm">
                      <span>Name</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span>Price</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span>Barcode</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span>Status</span>
                    </DataTableRow>
                    <DataTableRow className="text-right">
                      <span>Actions</span>
                    </DataTableRow>
                  </DataTableHead>
                  {currentItems.length > 0
                    ? currentItems.map((item) => {
                        return (
                          <DataTableItem key={item.id}>
                            <DataTableRow size="sm">
                              <span className="tb-product">
                                {
                                  item.productImages[0] && (
                                        <img src={item.productImages[0] ? item.productImages[0] : ""} alt="product" className="thumb" />
                                    )
                                }
                                <span className="title">{item.name}</span>
                              </span>
                            </DataTableRow>

                            <DataTableRow>
                              <span className="tb-sub">$ {item.sellingPrice}</span>
                            </DataTableRow>

                            <DataTableRow>
                              <span className="tb-sub">-</span>
                            </DataTableRow>

                            <DataTableRow>
                              <span
                                  className={`dot bg-${item.status === "active" ? "success" : "warning"} d-sm-none`}
                              ></span>
                              <Badge
                                  className="badge-sm badge-dot has-bg d-none d-sm-inline-flex text-capitalize"
                                  color={
                                    item.status === "active" ? "success" : "warning"
                                  }
                              >
                                {item.status}
                              </Badge>
                            </DataTableRow>

                            <DataTableRow className="nk-tb-col-tools">
                              <ul className="">
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
                                    <DropdownMenu>
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
                                            <span>Edit Product</span>
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
                                            <span>Remove Product</span>
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
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Product Name
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
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Product Description
                        </label>
                        <div className="form-control-wrap">
                      <textarea
                          className="form-control"
                          name="description"
                          onChange={(e) => onInputChange(e)}
                          ref={register({
                            required: "This field is required",
                          })}
                      >
                        {formData.description}
                      </textarea>
                          {errors.description && <span className="invalid">{errors.description.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="regular-price">
                          Selling Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            name="sellingPrice"
                            onChange={(e) => onInputChange(e)}
                            ref={register({ required: "This is required" })}
                            className="form-control"
                            defaultValue={formData.sellingPrice}
                          />
                          {errors.sellingPrice && <span className="invalid">{errors.sellingPrice.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="sale-price">
                          Corporate Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="corporatePrice"
                            onChange={(e) => onInputChange(e)}
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.corporatePrice}
                          />
                          {errors.corporatePrice && <span className="invalid">{errors.corporatePrice.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="stock">
                          Total Quantity
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="totalQuantity"
                            onChange={(e) => onInputChange(e)}
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.totalQuantity}
                          />
                          {errors.totalQuantity && <span className="invalid">{errors.totalQuantity.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="SKU">
                          Min B2B Order
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="minB2BOrder"
                            ref={register({ required: "This is required" })}
                            onChange={(e) => onInputChange(e)}
                            defaultValue={formData.minB2BOrder}
                          />
                          {errors.minB2BOrder && <span className="invalid">{errors.minB2BOrder.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="category">
                          Category
                        </label>
                        <div className="form-control-wrap">
                          <select className="form-select"
                                  name="category"
                                  onChange={(e) => onInputChange(e)}
                                  value={formData.category}>
                            <option>Select...</option>
                            {
                              categories.map((category) =>
                                  <option value={category.id} >{ category.name }</option>
                              )
                            }
                          </select>
                          {errors.category && <span className="invalid">{errors.category.message}</span>}
                      </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="category">
                          Sub Category
                        </label>
                        <div className="form-control-wrap">
                          <select className="form-select"
                                  name="subCategory"
                                  onChange={(e) => onInputChange(e)}
                                  value={formData.subCategory}>
                            <option>Select...</option>
                            {
                              subCategories.map((category) =>
                                  <option value={category.id}>{ category.name }</option>
                              )
                            }
                          </select>
                          {errors.subCategory && <span className="invalid">{errors.subCategory.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="category">
                          Product Image
                        </label>
                        <div className="form-control-wrap">
                          <img src={formData.img} alt=""></img>
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                              {files.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Update Product</span>
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
              <BlockTitle tag="h5">Add Product</BlockTitle>
              <BlockDes>
                <p>Add information or update product.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Product Name
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
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Product Description
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                          className="form-control"
                          name="description"
                          onChange={(e) => onInputChange(e)}
                          ref={register({
                            required: "This field is required",
                          })}
                          defaultValue={formData.description}
                      >

                      </textarea>
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Selling Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        name="sellingPrice"
                        ref={register({ required: "This is required" })}
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        defaultValue={formData.sellingPrice}
                      />
                      {errors.sellingPrice && <span className="invalid">{errors.sellingPrice.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Corporate Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        name="corporatePrice"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.corporatePrice}
                      />
                      {errors.corporatePrice && <span className="invalid">{errors.corporatePrice.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock">
                      Total Quantity
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        name="totalQuantity"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.totalQuantity}
                      />
                      {errors.totalQuantity && <span className="invalid">{errors.totalQuantity.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      Min B2B Order
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="minB2BOrder"
                        onChange={(e) => onInputChange(e)}
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.minB2BOrder}
                      />
                      {errors.minB2BOrder && <span className="invalid">{errors.minB2BOrder.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                      Interest
                    </label>
                    <div className="form-control-wrap">
                      <select className="form-select"
                              name="category"
                              onChange={(e) => onInputChange(e)}
                              value={ selectedCategories }
                              disabled>
                        <option>Select...</option>
                        {
                          categories.map((category) =>
                              <option value={category.id}>{ category.name }</option>
                          )
                        }
                      </select>
                      {errors.category && <span className="invalid">{errors.category.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                      Sub Interest
                    </label>
                    <div className="form-control-wrap">
                      <select className="form-select"
                              name="subCategory"
                              onChange={(e) => onInputChange(e)}>
                        <option>Select...</option>
                        {
                          subCategories.map((category) =>
                              <option value={category.id}>{ category.name }</option>
                          )
                        }
                      </select>
                      {errors.subCategory && <span className="invalid">{errors.subCategory.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                          <input {...getInputProps()} />
                          {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                              <div className="dz-image">
                                <img src={file.preview} alt="preview" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Product</span>
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

export default ProductList;
