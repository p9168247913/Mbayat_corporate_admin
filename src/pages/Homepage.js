import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import DataCard from "../components/partials/default/DataCard";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Container } from "reactstrap";
import { projectData } from "./pre-built/projects/ProjectData";
import { FaCaretDown } from "react-icons/fa";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  const [list, setLists] = useState([])
  const fetchVendorData = async () => {
    try {
      const response = await fetch('http://15.185.57.60:3000/v1/interest/interest-lists?fetchType=all');
      const jsonData = await response.json();
      setLists(jsonData.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log(value);
  };

  // new code :-

  const [data, setData] = useState(projectData)

  const containerStyle = {
    margin: "auto",
    display: 'grid',
    gridTemplateColumns: "repeat(4, 1fr)",
    marginTop: "30px",
    padding: "25px 0px",
    alignItems: "center",
    width: "100%",
    gap: '20px',
  };

  const mediaQueryStyle = {
    '@media (maxWidth: 768px)': {
      gridTemplateColumns: "repeat(2, 1fr)", 
    },
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    console.log("option", option.name)
    setSelectedOption(option);
  };

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      {/* <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                    </li>
                    <li className="nk-block-tools-opt">
                      
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="4" sm="8"  >
              <DataCard style={{ border:"1px solid red"}}
                title="Mystery Box Order"
                // percentChange={"4.63"}
                up={true}
                // chart={<DefaultOrderChart />}
                amount={"1975"}
              />
            </Col>
            <Col xxl="4" sm="8">
              <DataCard
                title="Subscriptions"
                // percentChange={"2.63"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={`${2284} KWD`}
              />
            </Col>
            <Col xxl="4" sm="8">
              <DataCard
                title="Orders"
                // percentChange={"4.63"}
                up={true}
                // chart={<DefaultCustomerChart />}
                amount={"847"}
              />
            </Col>
            {/* <Col xxl="3" sm="6">
              <DataCard
                title="Today's Visitors"
                percentChange={"2.63"}
                up={false}
                chart={<DefaultVisitorChart />}
                amount={"23,485"}
              />
            </Col> */}
            {/* <Col xxl="6">
              <SalesStatistics />
            </Col>
            <Col xxl="3" md="6">
              <OrderStatistics />
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics />
            </Col>
            <Col xxl="8">
              <RecentOrders />
            </Col>
            <Col xxl="4" md="8" lg="6">
              <TopProducts />
            </Col> */}
          </Row>

          <div style={{ border: '0.5px solid rgb(199,205,215)', marginTop: "30px", marginBottom: '30px' }}></div>

          {/* filter by intrests */}

          <div style={{
            marginLeft: "-30px",
            width: 'calc(100% + 60px)',
            height: "90px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            position: 'sticky',
            top: "64px",
            backgroundColor: "white",
            alignItems: "center",         
            zIndex: "2",
            paddingRight:"150px",
            paddingLeft:'30px'
          }}>
            <BlockTitle page tag="h3" style={{marginLeft:"-200px", border:'1px solid red'}}>
              Vendors
            </BlockTitle>
            <div style={{ width: "12%" , marginLeft:"-180px"}}>
              <p style={{width:"100px"}}>Filter By</p>
              <Container style={{ paddingLeft:"0px", marginTop:"-15px", width:"100%"}}>
                <UncontrolledDropdown style={{width:"110px"}}>
                  <DropdownToggle caret style={{ width: "110px", display: 'flex', justifyContent: "space-between" }} >
                    {selectedOption ? selectedOption.name : "Interest"}<FaCaretDown />
                  </DropdownToggle>

                  <DropdownMenu onChange={handleSelectChange} style={{ maxHeight: "200px", overflow: "auto",  }}>

                    <DropdownItem onClick={() => handleOptionSelect({ name: "ALL" })}>ALL</DropdownItem>
                    {
                      list.map((item, index) => (
                        <DropdownItem onClick={() => handleOptionSelect(item)} value={item.name} key={index} >{item.name}</DropdownItem>
                      ))
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Container>
            </div>
          </div>
            <Container fluid className="mt-4">
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
              {data &&
                data.map((item, index) => (
                  <Col key={index} >
                    <div
                      className="p-3 bg-white rounded shadow-sm d-flex flex-column justify-content-between h-100"
                      style={{
                        margin: 'auto',
                        paddingBottom: '10px',
                        textAlign: 'center',
                        padding: '15px 10px',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                        borderRadius: '10px',
                        backgroundColor: 'rgb(255, 255, 255)',
                        minHeight: '230px'
                      }}
                    >

                      <div className="text-center">
                      <img src="App_Icon.png" fluid className="mb-3" style={{ maxHeight: '100px' }} alt="App Icon" />
                      <p 
                      style={{
                        fontWeight: 'bold',
                        marginTop: '12px',
                        maxHeight: '24%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      className="mb-2 text-center">{item.title}</p>
                      </div>
                      <Button
                        variant="primary"
                        className="w-75 align-self-center"
                        style={{
                          border: '1px solid black',
                          width: '90%',
                          backgroundColor: 'rgb(73, 197, 182)',
                          margin: 'auto',
                          display: 'block',
                          height: '30px',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          border: 'none',
                          outline: 'none',
                          marginTop: '40px',
                          color: 'rgb(64, 15, 59)',
                          zIndex:"1"
                        }}
                        onClick={() => { 
                          
                        }}
                      >
                        <Link to="/ecommerce/products">Visit store</Link>
                      </Button>
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
