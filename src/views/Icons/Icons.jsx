import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
import CustomerData from "./CustomerDeta";
import ConsigneeData from "./ConsignData";
import ShipperData from "./ShiperData";

function Icons(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Customer Data</h4>
            <p className={classes.cardCategoryWhite}>Detail for customers</p>
          </CardHeader>
          <CardBody>
            <CustomerData />
            {/* <Hidden only={["lg", "md"]}> */}
            <GridItem xs={12} sm={12} md={6}>
              <h5>
                The icons are visible on Desktop mode inside an iframe. Since
                the iframe is not working on Mobile and Tablets please visit the
                icons on their original page on Google. Check the
                <a
                  href="https://design.google.com/icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Material Icons
                </a>
              </h5>
            </GridItem>
            {/* </Hidden> */}
          </CardBody>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Consignee Data</h4>
            <p className={classes.cardCategoryWhite}>Detail for Consignee</p>
          </CardHeader>
          <CardBody>
            <ConsigneeData />
            <GridItem xs={12} sm={12} md={6}>
              <h5> this is Shipper Data</h5>
            </GridItem>
          </CardBody>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Shipper Data</h4>
            <p className={classes.cardCategoryWhite}>Detail for Shipper</p>
          </CardHeader>
          <CardBody>
            <ShipperData />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Icons);
