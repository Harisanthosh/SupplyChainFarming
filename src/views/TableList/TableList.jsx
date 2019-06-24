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

import FTImage from 'images/ft.png';
import ReactTable from "react-table";
import "react-table/react-table.css";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
      dataArr2: [],
      dataArr3: [],
      open: false,
      chargen: ''
    }
    this.queryServer = this.queryServer.bind(this);
    this.callArbeitSchritteAPI = this.callArbeitSchritteAPI.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  async handleClickOpen(pVal) {
    this.setState({ open: true, chargen: pVal });
    var handl = this;
    var constArr3 = [];
    //console.log("Handling click open"+ pVal);
    fetch('http://localhost:8080/api/arbeitsschritte?chargen=' + pVal,
      {
        //mode: 'no-cors',
        method: 'GET'
      }
    ).then(resp => resp.json()).then(myJson => {
      console.log("got Valuee!!");
      console.log(myJson);
      for (var i = 0; i < myJson.length; i++) {
        var obj1 = myJson[i];
        constArr3.push(obj1);
        //constArr3.push([obj1.asId, obj1.asPosition, obj1.asAnweisung, obj1.asUsercreated, obj1.asUserchanged]);
        //console.log("Article Name: " + obj.artNr + ", " + "Article Description: " + obj.artBeschreibung);
      }
      //console.log(constArr3);      
      handl.setState({ dataArr3: constArr3 });
    });
  }

  async handleClickClose() {
    this.setState({ open: false });
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

  async callArbeitSchritteAPI() {
    console.log("Arbeit Schritte API called");
    var constArr1 = [];
    var chargeID = '';
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
      //constArr.push([obj.chId, obj.chFbId, obj.chStartdate, obj.chUsercreated, obj.chPpIdLosstatus]);
      constArr.push(obj);
    }
    for (var i = 0; i < data1.length; i++) {
      var obj1 = data1[i];
      //constArr1.push([obj1.ppId, obj1.ppName, obj1.ppValue, obj1.ppUsercreated, obj1.ppUserchanged]);
      //constArr1.push([obj1.chId, obj1.chFbId, obj1.chStartdate, obj1.chUsercreated, obj1.chPpIdLosstatus]);
      constArr1.push(obj1);
    }
    for (var i = 0; i < data2.length; i++) {
      var obj2 = data2[i];
      //constArr2.push([obj2.fbId, obj2.fbEinsteuerdat, obj2.fbLevel, obj2.fbXFaktor, obj2.fbXFaktorBer]);
      //constArr2.push([obj2.chId, obj2.chFbId, obj2.chStartdate, obj2.chUsercreated, obj2.chPpIdLosstatus]);
      constArr2.push(obj2);
    }
    this.setState({ dataArr: constArr, dataArr1: constArr1, dataArr2: constArr2 });
    //this.setState({ dataArr: constArr, dataArr2: constArr2 });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <img
          alt="50%x50"
          style={{ height: "330px", width: "60%", display: "block", marginLeft: "auto", marginRight: "auto" }}
          src={FTImage} />

        <Tabs
          title="Fischer Technik WorkOrders"
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
                        <h4 className={classes.cardTitleWhite}>Planned Articles</h4>
                        <p className={classes.cardCategoryWhite}>
                          Obtained from the REST API of Chargen Table
            </p>
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                          data={this.state.dataArr}
                          columns={[
                            {
                              Header: "Article Id",
                              accessor: 'chId',
                              Cell: e => <a onClick={this.handleClickOpen.bind(this, e.value)}> {e.value} </a>
                            },
                            {
                              Header: "Article Name",
                              accessor: 'artName'
                            },
                            {
                              Header: 'Article Number',
                              accessor: 'artNr'
                            },
                            {
                              Header: 'Created By',
                              accessor: 'chUsercreated'
                            },
                            {
                              Header: 'Lot Status',
                              accessor: 'chPpIdLosstatus'
                            }
                          ]}
                          defaultPageSize={10}
                          className="-striped -highlight"
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
                        <h4 className={classes.cardTitleWhite}>Started Articles</h4>
                        <p className={classes.cardCategoryWhite}>
                          Obtained from the REST API of Chargen Table
            </p>
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                          data={this.state.dataArr1}
                          columns={[
                            {
                              Header: "Article Id",
                              accessor: 'chId',
                              Cell: e => <a onClick={this.handleClickOpen.bind(this, e.value)}> {e.value} </a>
                            },
                            {
                              Header: "Article Name",
                              accessor: 'chFbId'
                            },
                            {
                              Header: 'Created At',
                              accessor: 'chStartdate'
                            },
                            {
                              Header: 'Created By',
                              accessor: 'chUsercreated'
                            },
                            {
                              Header: 'Lot Status',
                              accessor: 'chPpIdLosstatus'
                            }
                          ]}
                          defaultPageSize={10}
                          className="-striped -highlight"
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
                        <h4 className={classes.cardTitleWhite}>Finished / Processed Articles</h4>
                        <p className={classes.cardCategoryWhite}>
                          Obtained from the REST API of Chargen Table
            </p>
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                          data={this.state.dataArr2}
                          columns={[
                            {
                              Header: "Article Id",
                              accessor: 'chId',
                              Cell: e => <a onClick={this.handleClickOpen.bind(this, e.value)}> {e.value} </a>
                            },
                            {
                              Header: "Article Name",
                              accessor: 'artName'
                            },
                            {
                              Header: 'Article Number',
                              accessor: 'artNr'
                            },
                            {
                              Header: 'Created By',
                              accessor: 'chUsercreated'
                            },
                            {
                              Header: 'Lot Status',
                              accessor: 'chPpIdLosstatus'
                            }
                          ]}
                          defaultPageSize={10}
                          className="-striped -highlight"
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
        <Dialog fullWidth="xl" maxWidth="xl" open={this.state.open} onClose={this.handleClickClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Working Steps for Chargen - {this.state.chargen} </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Working Order (WO) for the Article - {this.state.chargen}
          </DialogContentText>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
            <ReactTable
              data={this.state.dataArr3}
              columns={[
                {
                  Header: "Article Id",
                  accessor: 'asId'
                },
                {
                  Header: 'Article Position',
                  accessor: 'asPosition'
                },
                {
                  Header: 'Changed By',
                  accessor: 'asUserchanged'
                },
                {
                  Header: 'Working Steps',
                  accessor: 'asAnweisung'
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClickClose} color="primary">
              Proceed
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}

export default withStyles(styles)(TableList);
