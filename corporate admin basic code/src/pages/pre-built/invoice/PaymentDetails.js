import React, { useEffect, useState} from 'react'
import Cookies from "universal-cookie";
import moment from "moment/moment";
import {getAllProductsByVendor} from "../../../services/productServices/productService";
import {getUserByInterest} from "../../../services/interestServices/interestService";
import {createMysteryBox, getHistoryOfMysteryBox, historyBoxByDate} from "../../../services/orderServices/orderService";
import Swal from "sweetalert2";
import {Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle} from "../../../components/block/Block";
import {Badge, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {DataTableBody, DataTableHead, DataTableItem, DataTableRow} from "../../../components/table/DataTable";
import {Icon, PaginationComponent} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";

const PaymentDetails = (props) => {
    const cookies = new Cookies();

    const [data, setData] = useState([]);
    const [status,setStatus] = useState("UnPaid");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);

    const nextMonth = moment().add(1, 'months');
    const fifthDay = nextMonth.date(5);

    useEffect(async () => {
        await fetchMysteryBoxHistory();
    }, []);


    const fetchMysteryBoxHistory = async () => {
        const date = props.match.params.date;
        const get = await historyBoxByDate(cookies.get('user').id,date);
        if(get.status === "success"){
            get.data.map((data) => {
                if(data.status){
                    setStatus(data.status);
                }
                return data;
            });
            setData(get.data);
        }else{
            setData([]);
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
                            <BlockTitle>History Mystery Box Details</BlockTitle>

                        </BlockHeadContent>
                        <BlockHeadContent>

                        </BlockHeadContent>
                    </BlockBetween>
                    <div className="row mt-4">
                        <div className="col-md-10">
                            <p>{ moment(props.match.params.date).format("DD MMM Y") }</p>
                        </div>
                        <div className="col-md-2">
                            <div className="">
                            <span
                                className={`dot bg-${status === "paid" ? "success" : "warning"} d-sm-none`}
                            ></span>
                                <Badge
                                    className="badge-sm badge-dot has-bg d-none d-sm-inline-flex text-capitalize float-end"
                                    color={
                                        status === "paid" ? "success" : "warning"
                                    }
                                >
                                    {status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </BlockHead>
                <Block>
                    <Card>
                        <div className="card-inner-group">
                            <div className="card-inner p-0">
                                <DataTableBody>
                                    <DataTableHead>
                                        <DataTableRow size="sm">
                                            <span>Product Name</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>Order Date</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>Customer Info</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span>Price</span>
                                        </DataTableRow>
                                    </DataTableHead>
                                    <DataTableItem>
                                        <DataTableRow size="sm">
                                                          <span className="tb-product">
                                                            <span className="title">Test Product</span>
                                                          </span>
                                        </DataTableRow>
                                        <DataTableRow>
                                                         <span className="tb-product">
                                                            <span className="title">12 Feb 2022</span>
                                                          </span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span className="tb-sub"> Abhishek Panchal </span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span className="tb-sub"> 100 KWD </span>
                                        </DataTableRow>
                                    </DataTableItem>
                                    <DataTableItem>
                                        <DataTableRow>
                                            <span className="tb-sub"> Total Payment: </span>
                                        </DataTableRow>
                                        <DataTableRow>

                                        </DataTableRow>
                                        <DataTableRow>

                                        </DataTableRow>
                                        <DataTableRow>
                                            <span className="tb-sub"> 100 KWD </span>
                                        </DataTableRow>
                                    </DataTableItem>
                                    {/*{currentItems.length > 0*/}
                                    {/*    ? currentItems.map((item, index) => {*/}
                                    {/*        return (*/}
                                    {/*            <DataTableItem key={index}>*/}
                                    {/*                <DataTableRow size="sm">*/}
                                    {/*                  <span className="tb-product">*/}
                                    {/*                    <span className="title">{ item?.productId?.name }</span>*/}
                                    {/*                  </span>*/}
                                    {/*                </DataTableRow>*/}
                                    {/*                <DataTableRow>*/}
                                    {/*                 <span className="tb-product">*/}
                                    {/*                    <span className="title">{ item?.userId?.first_name + ' ' + item?.userId?.last_name }</span>*/}
                                    {/*                  </span>*/}
                                    {/*                </DataTableRow>*/}
                                    {/*                <DataTableRow>*/}
                                    {/*                    <span className="tb-sub"> 22 </span>*/}
                                    {/*                </DataTableRow>*/}
                                    {/*                <DataTableRow>*/}
                                    {/*                    <span className="tb-sub"> { item.gender ?? "-" } </span>*/}
                                    {/*                </DataTableRow>*/}
                                    {/*            </DataTableItem>*/}
                                    {/*        );*/}
                                    {/*    })*/}
                                    {/*    : null}*/}
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
            </Content>
        </React.Fragment>
    );

}

export default PaymentDetails;