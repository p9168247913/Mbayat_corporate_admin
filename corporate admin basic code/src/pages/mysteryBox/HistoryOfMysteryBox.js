import React, { useEffect, useState} from 'react'
import Cookies from "universal-cookie";
import moment from "moment/moment";
import {getAllProductsByVendor} from "../../services/productServices/productService";
import {getUserByInterest} from "../../services/interestServices/interestService";
import {createMysteryBox, getHistoryOfMysteryBox} from "../../services/orderServices/orderService";
import Swal from "sweetalert2";
import {Block} from "../../components/block/Block";
import {Badge, Card} from "reactstrap";
import {DataTableBody, DataTableHead, DataTableItem, DataTableRow} from "../../components/table/DataTable";
import {Icon, PaginationComponent} from "../../components/Component";
import {Link} from "react-router-dom";

const HistoryOfMysteryBox = () => {
    const cookies = new Cookies();

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const nextMonth = moment().add(1, 'months');
    const fifthDay = nextMonth.date(5);

    useEffect(async () => {
        await fetchMysteryBoxHistory();
    }, []);


    const fetchMysteryBoxHistory = async () => {
        const get = await getHistoryOfMysteryBox(cookies.get('user').id);
        if(get.status === "success"){
            setData(get.data);
        }else{
            setData([]);
        }

    }


    const onChangeProduct = (e, userId) => {
        const value = e.target.value;

        const index = selectedProduct.findIndex(item => item.userId === userId);

        if (index === -1) {
            // If the user ID is not in the array, push a new object with the userId and value
            setSelectedProduct([...selectedProduct, { userId, value }]);
        } else {
            // If the user ID is already in the array, update the value
            const updatedSelectedProduct = [...selectedProduct];
            updatedSelectedProduct[index].value = value;
            setSelectedProduct(updatedSelectedProduct);
        }
    }


    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <Block>
                <Card>
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <DataTableBody>
                                <DataTableHead>
                                    <DataTableRow size="sm">
                                        <span>Month</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Status</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Quantity</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Details</span>
                                    </DataTableRow>
                                </DataTableHead>
                                {currentItems.length > 0
                                    ? currentItems.map((item, index) => {
                                        return (
                                            <DataTableItem key={index}>
                                                <DataTableRow size="sm">
                                                      <span className="tb-product">
                                                        <span className="title">{ moment(item.date).format("D-MMM") }</span>
                                                      </span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                     <span
                                                         className={`dot bg-${item.status === "completed" ? "success" : "warning"} d-sm-none`}
                                                     ></span>
                                                    <Badge
                                                        className="badge-sm badge-dot has-bg d-none d-sm-inline-flex text-capitalize"
                                                        color={
                                                            item.status === "completed" ? "success" : "warning"
                                                        }
                                                    >
                                                        {item.status}
                                                    </Badge>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <span className="tb-sub">{item.count }</span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                        <span className="tb-sub">
                                                            <Link to={`${process.env.PUBLIC_URL}/mystery-box-details/` + item.date }>
                                                                <button className="btn btn-outline-secondary">
                                                                    <Icon name="eye"></Icon>
                                                                </button>
                                                            </Link>
                                                        </span>
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
                                        <span className="text-silent">No Users found</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </Block>
        </React.Fragment>
    );

}

export default HistoryOfMysteryBox;