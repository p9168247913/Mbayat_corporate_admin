import React, {Component} from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import DataCard from "../components/partials/default/DataCard";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";
import {
  DefaultOrderChart,
  DefaultRevenueChart,
} from "../components/partials/charts/default/DefaultCharts";
import {getDashboardData} from "../services/dashboardServices/dasboardService";
import Interest from "./interest/interest";
import InvoiceList from "./pre-built/invoice/InvoiceList";

class Homepage extends Component{

  constructor(props) {
    super(props);

    this.state = {
      individualOrder:{},
      b2bOrder:{},
      paymentDetails:{},
    }
  }

  async componentDidMount() {
    await this.loadDashboardData();
  }

  loadDashboardData = async () => {
    const get = await getDashboardData();
    if(get.status === "success"){
      this.setState({
        individualOrder: get.individualOrder,
        b2bOrder: get.b2bOrder,
        paymentDetails: get.paymentDetails,
      })
    }
  }

  render(){
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
                {/*<BlockHeadContent>*/}
                {/*  <div className="toggle-wrap nk-block-tools-toggle">*/}
                {/*    <Button*/}
                {/*      className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}*/}
                {/*      onClick={() => updateSm(!sm)}*/}
                {/*    >*/}
                {/*      <Icon name="more-v" />*/}
                {/*    </Button>*/}
                {/*    <div className="toggle-expand-content" style={{ display: "none" }}>*/}
                {/*      <ul className="nk-block-tools g-3" style={{ display: "none" }}>*/}
                {/*        <li>*/}
                {/*          <UncontrolledDropdown>*/}
                {/*            <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">*/}
                {/*              <Icon className="d-none d-sm-inline" name="calender-date" />*/}
                {/*              <span>*/}
                {/*                <span className="d-none d-md-inline">Last</span> 30 Days*/}
                {/*              </span>*/}
                {/*              <Icon className="dd-indc" name="chevron-right" />*/}
                {/*            </DropdownToggle>*/}
                {/*            <DropdownMenu end>*/}
                {/*              <ul className="link-list-opt no-bdr">*/}
                {/*                <li>*/}
                {/*                  <DropdownItem*/}
                {/*                    tag="a"*/}
                {/*                    onClick={(ev) => {*/}
                {/*                      ev.preventDefault();*/}
                {/*                    }}*/}
                {/*                    href="#!"*/}
                {/*                  >*/}
                {/*                    <span>Last 30 days</span>*/}
                {/*                  </DropdownItem>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                  <DropdownItem*/}
                {/*                    tag="a"*/}
                {/*                    onClick={(ev) => {*/}
                {/*                      ev.preventDefault();*/}
                {/*                    }}*/}
                {/*                    href="#dropdownitem"*/}
                {/*                  >*/}
                {/*                    <span>Last 6 months</span>*/}
                {/*                  </DropdownItem>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                  <DropdownItem*/}
                {/*                    tag="a"*/}
                {/*                    onClick={(ev) => {*/}
                {/*                      ev.preventDefault();*/}
                {/*                    }}*/}
                {/*                    href="#dropdownitem"*/}
                {/*                  >*/}
                {/*                    <span>Last 3 weeks</span>*/}
                {/*                  </DropdownItem>*/}
                {/*                </li>*/}
                {/*              </ul>*/}
                {/*            </DropdownMenu>*/}
                {/*          </UncontrolledDropdown>*/}
                {/*        </li>*/}
                {/*        <li className="nk-block-tools-opt">*/}
                {/*          <Button color="primary">*/}
                {/*            <Icon name="reports" />*/}
                {/*            <span>Reports</span>*/}
                {/*          </Button>*/}
                {/*        </li>*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</BlockHeadContent>*/}
              </BlockBetween>
            </BlockHead>
            <Block>
              <Row className="g-gs">
                <Col xxl="3" sm="6">
                  <DataCard
                      title="Individual Orders"
                      up={false}
                      chart={<DefaultOrderChart />}
                      amount={this.state.individualOrder.totalIndividualOrder}
                  />
                </Col>
                <Col xxl="3" sm="6">
                  <DataCard
                      title="B2B Orders"
                      up={false}
                      chart={<DefaultRevenueChart />}
                      amount={this.state.paymentDetails.totalPendingBalance}
                  />
                </Col>
              </Row>
              <Row className="g-gs">
                <Col sm={12}>
                    <Interest />
                </Col>
                <Col sm={12}>
                  <InvoiceList />
                </Col>
              </Row>
            </Block>
          </Content>
        </React.Fragment>
    );
  }

};
export default Homepage;
