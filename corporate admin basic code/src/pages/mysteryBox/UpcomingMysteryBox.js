import React, { useEffect, useState} from 'react'
import Cookies from "universal-cookie";
import moment from "moment/moment";
import {getAllProductsByVendor} from "../../services/productServices/productService";
import {getUserByInterest} from "../../services/interestServices/interestService";
import {createMysteryBox} from "../../services/orderServices/orderService";
import Swal from "sweetalert2";
import {Block} from "../../components/block/Block";
import {Card} from "reactstrap";
import {DataTableBody, DataTableHead, DataTableItem, DataTableRow} from "../../components/table/DataTable";
import {Icon, PaginationComponent} from "../../components/Component";
import {skipThisMonthRequest} from "../../services/userServices/user.service";

const UpcomingMysteryBox = () => {
    const cookies = new Cookies();

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);

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

    const skipThisMonth = (e) => {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Are you sure want to skip this month?",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Yes"
        }).then(async (ok) => {

           if(ok.isConfirmed){
               const skip = await skipThisMonthRequest();
               if(skip.status === "success"){
                   Swal.fire({
                       icon: "success",
                       title: "Success!",
                       text: skip.message,
                   });
               }else{
                   Swal.fire({
                       icon: "error",
                       title: "Error!",
                       text: skip.message,
                   });
               }
           }
        });
    }

    return (
        <React.Fragment>
            <div className="row pb-4">
                <hr/>
                <div className="col-md-8">
                    <p>Choose any one customer to whom you want send your gift.</p>
                </div>
                <div className="col-md-4 pb-3">
                    <p
                        className="text-info float-end"
                        style={{'cursor': 'pointer'}}
                    onClick={ (e) => { skipThisMonth(); } }>Skip This Month</p>
                </div>
                <hr/>
            </div>
            <Block>
                <Card>
                    <div className="card-inner-group">
                        <div className="card-inner p-0">
                            <DataTableBody>
                                <DataTableHead>
                                    <DataTableRow size="sm">
                                        <span>Customer Name</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Age</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Gender</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Product</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Action</span>
                                    </DataTableRow>
                                </DataTableHead>
                                {currentItems.length > 0
                                    ? currentItems.map((item) => {
                                        return (
                                            <DataTableItem key={item.id}>

                                                <DataTableRow size="sm">
                                                      <span className="tb-product">
                                                        <span className="title">{item.first_name + ' ' + item.last_name }</span>
                                                      </span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <span className="tb-sub">22</span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <span className="tb-sub">{item.gender ?? "-"}</span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                        <span className="tb-sub">
                                                            <select className="form-select w-50" name="products" onChange={ (e) => { onChangeProduct(e, item.id) }  } >
                                                            <option value="">Select Product</option>
                                                                {
                                                                    products.map((product) =>
                                                                        <option value={product.id}>{product.name}</option>
                                                                    )
                                                                }
                                                        </select>
                                                        </span>
                                                </DataTableRow>
                                                <DataTableRow>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <button className="btn btn-outline-success" onClick={ () => { sendProductToUser(item.id) } }>
                                                                <Icon name="check"></Icon>
                                                            </button>
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-outline-danger">
                                                                <Icon name="cross"></Icon>
                                                            </button>
                                                        </div>
                                                    </div>
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

export default UpcomingMysteryBox;