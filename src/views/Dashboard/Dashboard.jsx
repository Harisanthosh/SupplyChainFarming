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

//core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    window.count = 0;
    this.state = {
      tempNew: 0,
      tempNew1: 0,
      tempNew2: 0,
      tempNew3: 0,
      value: 0,
      bValue: '',
      pState: {},
      pState1: {},
      pState2: {
        tempNew: 0,
        tempNew1: 0,
        tempNew2: 0,
        tempNew3: 0,
        value: 0,
        bValue: '',
        currentOwner: 'Food Producer',
        currentFleet: 'fleet2',
        status: 'On Transit',
        urlT: 'http://localhost:3809/esp2',
        cInt: function () { },
        enableTemp: false,
        triggerAlarm: false
      },
      currentOwner: 'Food Producer',
      currentFleet: 'fleet1',
      status: 'On Transit',
      urlT: 'http://localhost:3809/',
      cInt: function () { },
      enableTemp: false,
      triggerAlarm: false
    };
    this.getTempFromServer = this.getTempFromServer.bind(this);
    this.setTempFromServer = this.setTempFromServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.executeToChain = this.executeToChain.bind(this);
    this.transferOwnership = this.transferOwnership.bind(this);
    this.handleFleetChange = this.handleFleetChange.bind(this);
  }
  async getTempFromServer() {
    console.log("Button click worked");
    fetch(this.state.urlT,
      {
        //mode: 'no-cors',
        method: 'GET'
      }
    ).then(resp => resp.json()).then(myJson => {
      console.log("Resolved!!");
      this.setState({ tempNew: myJson.Temp });
      //console.log(JSON.stringify(myJson));
    });
    // fetch('http://localhost:3809/Rpi',
    //   {
    //     //mode: 'no-cors',
    //     method: 'GET'
    //   }
    // ).then(resp => resp.json()).then(myJson => {
    //   console.log("Resolved!!");
    //   this.setState({ tempNew1: myJson.Temp });
    //   //console.log(JSON.stringify(myJson));
    // }).catch(function (error) {
    //   console.log(error);
    // });

  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }

  handleFleetChange(event) {
    var handl = this;
    //this.setState({ currentFleet: event.target.value });
    if (event.target.value === 'fleet2') {
      //this.setState({ urlT: 'http://localhost:3809/esp2' });
      this.setState({ pState: this.state });
      if (this.state.pState2.currentOwner === 'Food Producer' && window.count == 0) {
        window.count += 1;
        this.setState(this.state.pState2);
      }
      else {
        this.setState(window.fleet2Str);
      }
    }
    else {
      window.fleet2Str = this.state;
      this.setState({
        pState2: {
          currentOwner: handl.state.currentOwner
        }
      });
      // this.setState({
      //   pState1: this.state
      // });
      this.setState(this.state.pState);
      //this.setState({ currentFleet: event.target.value, urlT: 'http://localhost:3809/esp1' });
    }
  }

  async executeToChain(parVal) {

    const handl = this;
    if (parVal < 24) {
      this.setState({ triggerAlarm: false });
    }
    HelloHari.methods.setTemp(parVal).send({ from: "0x63692a3BEAB935cB5fA3f5636047E3B0470Ed115", gas: "220000" }, (error, transactionHash) => {
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
      fetch(handl.state.urlT,
        {
          //mode: 'no-cors',
          method: 'GET'
        }
      ).then(resp => resp.json()).then(myJson => {
        console.log("Resolved!!");
        console.log(myJson);
        console.log(myJson.Temp);
        if (handl.state.value == 0) {
          handl.setState({ tempNew: myJson.Temp, currentOwner: 'Food Producer' });
        } else if (handl.state.value == 1) {
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
    // var event = HelloHari.events.TempAlarm();

    // event.watch(function (error, result) {
    //   // result contains non-indexed arguments and topics
    //   // given to the `Deposit` call.
    //   if (!error)
    //     console.log(result);
    // });

    HelloHari.events.TempAlarm({
      //filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0
    }, (error, event) => { this.setState({ triggerAlarm: true }); console.log(event); })
      .on('data', (event) => {
        console.log("Event Value is " + event); // same results as the optional callback above
      })
      .on('changed', (event) => {
        // remove event from local database
        console.log(event);
      })
      .on('error', console.error);

    //fetch('http://localhost:3809/',
    fetch(this.state.urlT,
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
      fetch(handl.state.urlT,
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
        <h3>
          Select your fleet to track the Status:
          <select value={this.state.currentFleet} onChange={this.handleFleetChange} style={{ width: '150px', height: '30px' }}>
            <option value="fleet1">Fleet1</option>
            <option value="fleet2">Fleet2</option>
          </select>
        </h3>
        <h4 className={classes.cardTitle}>Status - {this.state.status} for {this.state.currentFleet}</h4>
        <h3 className={classes.cardTitle}>
          Current Owner - {this.state.currentOwner}
        </h3>
        {this.state.triggerAlarm ? <div>
          <SnackbarContent
            message={"The contract temperature limit (24 Degree) is breached, hence the money settlement will not be processed!."}
            close
            color="danger"
            icon={AddAlert}
          />
        </div> : null}
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

            {this.state.currentFleet === "fleet1" ? <Card>
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
            </Card> : null}

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
