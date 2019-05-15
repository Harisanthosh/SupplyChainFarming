import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { HelloHari } from '../../Ethereum';
import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tempNew: 0,
      tempNew1: 0,
      tempNew2: 0,
      tempNew3: 0,
      value: 0,
      bValue: '',
      currentOwner: 'Food Producer',
      status: 'On Transit',
      cInt: function () { },
      enableTemp: false
    };
    this.getTempFromServer = this.getTempFromServer.bind(this);
    this.setTempFromServer = this.setTempFromServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.executeToChain = this.executeToChain.bind(this);
    this.transferOwnership = this.transferOwnership.bind(this);
  }
  async getTempFromServer() {
    console.log("Button click worked");
    fetch('http://localhost:3809/',
      {
        //mode: 'no-cors',
        method: 'GET'
      }
    ).then(resp => resp.json()).then(myJson => {
      console.log("Resolved!!");
      this.setState({ tempNew: myJson.Temp });
      //console.log(JSON.stringify(myJson));
    });
    fetch('http://localhost:3809/Rpi',
      {
        //mode: 'no-cors',
        method: 'GET'
      }
    ).then(resp => resp.json()).then(myJson => {
      console.log("Resolved!!");
      this.setState({ tempNew1: myJson.Temp });
      //console.log(JSON.stringify(myJson));
    }).catch(function (error) {
      console.log(error);
    });

  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }

  async executeToChain(parVal) {
    const handl = this;
    HelloHari.methods.setTemp(parVal.toString()).send({ from: "0x71412a50bb47f74d513ce42ace3567407ac30176", gas: "220000" }, (error, transactionHash) => {
      if (error) console.log(error);
      else {
        console.log(transactionHash);
        HelloHari.methods.getTemp().call().then(function (val) {
          handl.setState({ bValue: val, enableTemp: true });
          console.log("\n"); console.log(val);
        });
      }
    });
  }

  async setTempFromServer() {
    console.log("submit temp worked");
    const pVal = this.state.tempNew;
    console.log(`Temp sent to blockchain is ${pVal}`);
    this.executeToChain(pVal);
  }

  async transferOwnership() {
    console.log("Transferring ownership of goods!");
    const handl = this;
    const newVal = this.state.value + 1;
    console.log("Value is : " + newVal);
    clearInterval(this.state.cInt);

    this.setState({ value: newVal });
    this.state.cInt = setInterval(function () {
      console.log("Executing every 2 secs");
      fetch('http://localhost:3809/',
        {
          //mode: 'no-cors',
          method: 'GET'
        }
      ).then(resp => resp.json()).then(myJson => {
        console.log("Resolved!!");
        console.log(myJson);
        console.log(myJson.Temp);
        if (handl.state.value == 1) {
          handl.setState({ tempNew1: myJson.Temp, currentOwner: 'Food Processor' });
        } else if (handl.state.value == 2) {
          handl.setState({ tempNew2: myJson.Temp, currentOwner: 'Distributor' });
        } else if (handl.state.value == 3) {
          handl.setState({ tempNew3: myJson.Temp, currentOwner: 'Consumer' });
        } else {
          console.log("Supply chain completed and delivered to Costumer!");
          handl.setState({ status: 'Delivered!', currentOwner: 'Consumer' });
          clearInterval(handl.state.cInt);
        }

        handl.executeToChain(myJson.Temp);
        //console.log(JSON.stringify(myJson));
      });

    }, 2000)

  }
  componentWillMount() {
    const handl = this;
    fetch('http://localhost:3809/',
      {
        //mode: 'no-cors',
        method: 'GET'
      }
    ).then(resp => resp.json()).then(myJson => {
      console.log("Resolved!!");
      console.log(myJson);
      console.log(myJson.Temp);
      this.setState({ tempNew: myJson.Temp });
      //console.log(JSON.stringify(myJson));
    });

    console.log(HelloHari.methods);

    //web3.eth.getBlock('latest').then(console.log);
    HelloHari.methods.sayHello().call().then(val => console.log(val));

    this.state.cInt = setInterval(function () {
      console.log("Executing every 2 secs");
      fetch('http://localhost:3809/',
        {
          //mode: 'no-cors',
          method: 'GET'
        }
      ).then(resp => resp.json()).then(myJson => {
        console.log("Resolved!!");
        console.log(myJson);
        console.log(myJson.Temp);
        handl.setState({ tempNew: myJson.Temp });
        //handl.executeToChain(myJson.Temp);
        //console.log(JSON.stringify(myJson));
      });

    }, 2000)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <p className={classes.cardCategory}>Status - {this.state.status}</p>
        <h3 className={classes.cardTitle}>
          Current Owner - {this.state.currentOwner}
        </h3>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Food Producer</p>
                <h3 className={classes.cardTitle}>
                  {this.state.tempNew} <small>Degrees</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Ready for dispatch!
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Food Processor</p>
                <h3 className={classes.cardTitle}>
                  {this.state.tempNew1} <small>Degrees</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Process and sort the food supplies
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Distributors</p>
                <h3 className={classes.cardTitle}>
                  {this.state.tempNew2} <small>Degrees</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Provide Logistics connectivity
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Retailers / Consumers</p>
                <h3 className={classes.cardTitle}>
                  {this.state.tempNew3} <small>Degrees</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  buyers who have placed the orders
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary"
              onClick={this.getTempFromServer}
            >
              Get Temperature of Shipment!
                  </Button>
            <Snackbar
              place="tc"
              color="info"
              icon={AddAlert}
              message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
              open={this.state.tc}
              closeNotification={() => this.setState({ tc: false })}
              close
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary"
              onClick={this.transferOwnership}
            >
              Transfer Ownership!
                  </Button>
            <Snackbar
              place="tr"
              color="info"
              icon={AddAlert}
              message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              fullWidth
              color="primary"
              onClick={this.setTempFromServer}
            >
              Send data to Blockchain!
                  </Button>
            <Snackbar
              place="tr"
              color="info"
              icon={AddAlert}
              message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Items in Transit</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is the list of items which are being transported!
            </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Itemname", "Temperature", "Freshness", "Owner"]}
                  tableData={[
                    ["Rice", "Niger", "Oud-Turnhout", "Lydl"],
                    ["Wheat", "Curaçao", "Sinaai-Waas", "Mr. Wermann"],
                    ["Bananas", "Netherlands", "Baileux", "Ms. Scheinder"],
                    ["Carrot", "Korea, South", "Overland Park", "Kaufland"],
                    ["Raddish", "Malawi", "Feldkirchen in Kärnten", "Edeka"],
                    ["Bio-milk", "Chile", "Gloucester", "Mr. Santhosh"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}></h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
