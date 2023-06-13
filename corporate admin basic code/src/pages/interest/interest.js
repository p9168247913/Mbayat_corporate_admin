import React, { useState, useEffect } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
    Block,
    BlockHead,
    BlockTitle,
    BlockBetween,
    BlockHeadContent,
    Icon,
    DataTableHead,
    DataTableBody,
    DataTableRow,
    DataTableItem,
    PaginationComponent,
} from "../../components/Component";
import { Card } from "reactstrap";
import {getUserByInterest} from "../../services/interestServices/interestService";
import {getAllProductsByVendor} from "../../services/productServices/productService";
import moment from "moment";
import {createMysteryBox} from "../../services/orderServices/orderService";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import UpcomingMysteryBox from "../mysteryBox/UpcomingMysteryBox";
import HistoryOfMysteryBox from "../mysteryBox/HistoryOfMysteryBox";
const Interest = () => {

    const cookies = new Cookies();

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);

    const [historyFilter, setHistoryFilter] = useState("upcoming");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const nextMonth = moment().add(1, 'months');
    const fifthDay = nextMonth.date(5);


    useEffect(async () => {
        await getUserListByInterest();
        await fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const get = await getAllProductsByVendor();
        if(get.status === "success"){
            setProducts(get.data);
        }else{
            setProducts([]);
        }
    }

    const getUserListByInterest = async () => {
        const getLists = await getUserByInterest();
        if(getLists.status === "success"){
            setData(getLists.data);
        }else{
            setData([]);
        }
    }

    const changeFilter = (e) => {
        setHistoryFilter(e.target.value);
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

    const sendProductToUser = async (userId) => {

        const findValue = selectedProduct.find(item => item.userId === userId);

        const submitData = {
            vendorId: cookies.get('user').id,
            userId,
            productId: findValue.value,
            orderDate: nextMonth.format("Y-MM-DD"),
        }

        const create = await createMysteryBox(submitData);
        if(create.status === "success"){
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Product added to mystery box successfully.",
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: create.message,
            });
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
            <Head title="Mystery Box"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle>Mystery Box Orders</BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div>
                                <select className="form-select" name="filter-dropdown" value={historyFilter} onChange={ (e) => { changeFilter(e) } }>
                                    <option value="">Select</option>
                                    <option value="history">History</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                {
                    historyFilter === "upcoming" && (
                        <BlockHead size="sm">
                            <BlockBetween>
                                <BlockHeadContent>
                                    <p>Upcoming Mystery Box Orders</p>
                                </BlockHeadContent>
                                <BlockHeadContent>
                                    <p>{ nextMonth.format("DD-MM-Y") }</p>
                                </BlockHeadContent>
                            </BlockBetween>
                        </BlockHead>
                    )
                }
                {
                    historyFilter === "upcoming" && (
                        <UpcomingMysteryBox />
                    )
                }
                {
                    historyFilter === "history" && (
                        <HistoryOfMysteryBox />
                    )
                }
            </Content>
        </React.Fragment>
    );
};

export default Interest;
