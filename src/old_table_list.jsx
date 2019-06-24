import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Tabs from "components/CustomTabs/CustomTabs.jsx";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// import { HelloHari } from '../../Ethereum';
// var data = require('../../articles.json');
// var data1 = require('../../properties.json');
// var data2 = require('../../fabaum.json');

var data = require('../../wo_planned.json');
var data1 = require('../../wo_started.json');
var data2 = require('../../wo_finishd.json');

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArr: [],
      dataArr1: [],
      dataArr2: []
    }
    this.queryServer = this.queryServer.bind(this);
  }

  async queryServer() {
    console.log("Tab Properties clicked");
    var constArr1 = [];
    var constArr1 = [];
    var constArr2 = [];
    fetch('http://localhost:8080/api/properties/',
      {
        //mode: 'no-cors',
        method: 'GET'
      }
    ).then(resp => resp.json()).then(myJson => {
      console.log("got Valuee!!");
      console.log(myJson);
      for (var i = 0; i < myJson.length; i++) {
        var obj1 = myJson[i];
        constArr1.push([obj1.ppId, obj1.ppName, obj1.ppValue, obj1.ppUsercreated, obj1.ppUserchanged]);
        //fullArr.push(constArr);
        //console.log("Article Name: " + obj.artNr + ", " + "Article Description: " + obj.artBeschreibung);
      }
      this.setState({ dataArr1: constArr1 });
      //console.log(JSON.stringify(myJson));
    });
  }
  
  componentWillMount() {
    //var fullArr = []
    // fetch('http://localhost:8080/api/properties/',
    //   {
    //     //mode: 'no-cors',
    //     method: 'GET'
    //   }
    // ).then(resp => resp.json()).then(myJson => {
    //   console.log("got Valuee!!");
    //   console.log(myJson);
    //   for (var i = 0; i < myJson.length; i++) {
    //     var obj1 = myJson[i];
    //     constArr1.push([obj1.ppId, obj1.ppName, obj1.ppValue, obj1.ppUsercreated, obj1.ppUserchanged]);
    //   }
    //   this.setState({ dataArr1: constArr1 });
    //   //console.log(JSON.stringify(myJson));
    // });
    var constArr = []
    var constArr1 = []
    var constArr2 = []
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      //constArr.push([obj.artId, obj.artNr, obj.artBeschreibung, obj.artBeschreibung2, obj.artUsercreated]);
      constArr.push([obj.chId, obj.chFbId, obj.chStartdate, obj.chUsercreated, obj.chPpIdLosstatus]);
    }
    for (var i = 0; i < data1.length; i++) {
      var obj1 = data1[i];
      //constArr1.push([obj1.ppId, obj1.ppName, obj1.ppValue, obj1.ppUsercreated, obj1.ppUserchanged]);
      constArr1.push([obj.chId, obj.chFbId, obj.chStartdate, obj.chUsercreated, obj.chPpIdLosstatus]);
    }
    for (var i = 0; i < data2.length; i++) {
      var obj2 = data2[i];
      //constArr2.push([obj2.fbId, obj2.fbEinsteuerdat, obj2.fbLevel, obj2.fbXFaktor, obj2.fbXFaktorBer]);
      constArr2.push([obj.chId, obj.chFbId, obj.chStartdate, obj.chUsercreated, obj.chPpIdLosstatus]);
    }
    this.setState({ dataArr: constArr, dataArr1: constArr1, dataArr2: constArr2 });
    //this.setState({ dataArr: constArr, dataArr2: constArr2 });
  }
  render() {
    const { classes } = this.props;
    return (
      <Tabs
        title="Fischer Technik WorkOrder"
        headerColor="rose"
        onChange={this.queryServer}
        tabs={[
          {
            tabName: "Planned",
            value: "Articles",
            tabIcon: BugReport,
            tabContent: (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Articles Table</h4>
                      <p className={classes.cardCategoryWhite}>
                        Obtained from the REST API of Articles Table
            </p>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Article Id", "Article Name", "Article Description", "Article Description", "Created By"]}
                        tableData={
                          this.state.dataArr
                        }
                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            )
          },
          {
            tabName: "Started",
            value: "Properties",
            tabIcon: Code,
            tabContent: (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Properties Table</h4>
                      <p className={classes.cardCategoryWhite}>
                        Obtained from the REST API of Properties Table
            </p>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Id", "Name", "Value", "User Created", "User Changed"]}
                        tableData={
                          this.state.dataArr1
                        }
                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            )
          },
          {
            tabName: "Completed",
            value: "Fabaum",
            tabIcon: Cloud,
            tabContent: (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Fabaum Table</h4>
                      <p className={classes.cardCategoryWhite}>
                        Obtained from the REST API of Fabaum Table
            </p>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Id", "Einsteuerdat", "Level", "Faktor", "FaktorBer"]}
                        tableData={
                          this.state.dataArr2
                        }
                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            )
          }
        ]
        }
      />
    );
  };
}

export default withStyles(styles)(TableList);
