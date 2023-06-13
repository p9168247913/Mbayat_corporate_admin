import React, {useEffect, useState} from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
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
    PaginationComponent,
    PreviewAltCard,
    DataTableBody,
    DataTable,
    Button,
} from "../../../components/Component";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";
import {getAllRatingLists} from "../../../services/ratingServices/ratingService";
import moment from "moment";

const Rating = () => {
    const [data, setData] = useState([]);
    const [onSearch, setonSearch] = useState(false);

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
        await getRatings();
    });

    const getRatings = async () => {
        const get = await getAllRatingLists();
        if(get.status === "success"){
            setData(get.data);
        }
    }

    // Changing state value when searching name
    useEffect(async () => {
        if (onSearchText !== "") {
            const filteredObject = data.filter((item) => {
                return item.productId.name.includes(onSearchText);
            });
            setData([...filteredObject]);
        } else {
            setData([...data]);
            await getRatings();
        }
    }, [onSearchText]);

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <Head title="Rating"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Products Reviews</BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <DataTable className="card-stretch">
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">All Products Reviews</h5>
                                </div>
                                <div className="card-tools me-n1">
                                    <ul className="btn-toolbar gx-1">
                                        <li>
                                            <Button
                                                href="#search"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    setonSearch(true);
                                                }}
                                                className="btn-icon search-toggle toggle-search"
                                            >
                                                <Icon name="search"></Icon>
                                            </Button>
                                        </li>
                                        <li className="btn-toolbar-sep"></li>

                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag="a"
                                                                className="btn btn-trigger btn-icon dropdown-toggle">
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
                                <div className={`card-search search-wrap ${onSearch && "active"}`}>
                                    <div className="search-content">
                                        <Button
                                            onClick={() => {
                                                setSearchText("");
                                                setonSearch(false);
                                            }}
                                            className="search-back btn-icon toggle-search"
                                        >
                                            <Icon name="arrow-left"></Icon>
                                        </Button>
                                        <input
                                            type="text"
                                            className="border-transparent form-focus-none form-control"
                                            placeholder="Search by Product Name"
                                            value={onSearchText}
                                            onChange={(e) => onFilterChange(e)}
                                        />
                                        <Button className="search-submit btn-icon">
                                            <Icon name="search"></Icon>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DataTableBody bodyclass="nk-tb-tnx">
                            <DataTableHead className="nk-tb-item">
                                <DataTableRow size="md">
                                    <span className="sub-text">Product Name</span>
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">Customer Name</span>
                                </DataTableRow>
                                <DataTableRow size="sm">
                                    <span className="sub-text">Total Star</span>
                                </DataTableRow>
                                <DataTableRow size="md">
                                    <span className="sub-text">Review</span>
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">Review Date</span>
                                </DataTableRow>

                            </DataTableHead>

                            {currentItems.length > 0
                                ? currentItems.map((item) => (
                                    <DataTableItem key={item.id}>
                                        <DataTableRow size="md">
                                            <span>{item.productId?.name}</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>{item.userId?.first_name + " " + item.userId?.last_name }</span>
                                        </DataTableRow>
                                        <DataTableRow size="sm">
                                            <span className="tb-sub">{item.rating}</span>
                                        </DataTableRow>
                                        <DataTableRow size="md">
                                            <span className="tb-sub text-primary">{item.review}</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span className="">{ moment(item.createdAt).format("DD-MM-Y") }</span>
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
                                    <span className="text-silent">No Reviews found</span>
                                </div>
                            )}
                        </PreviewAltCard>
                    </DataTable>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default Rating;
