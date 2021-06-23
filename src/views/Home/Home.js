import React, {useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { SERVER_URL } from "config.js";
import API_Headers from "API_Headers.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Components(props) {
  let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
  useEffect(() => {
    const get = async () => {
      const result = await axios.get(`${SERVER_URL}/restaurants/list`, API_Headers());
      if(!completed) {
        setStoreList(result.data);
        console.log(result.data);
        const { headers } = result;
        const { authorization } = headers;
        localStorage.setItem('auth', authorization);
      }
    }

    get();

    return () => {
      completed = true;
    };
  },[])

  const [storeList, setStoreList] = useState([]);
  const classes = useStyles();
  const { ...rest } = props;
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  return (

    

    <div>
      <Parallax image={require(`assets/img/main${getRandom(1, 4)}.jpg`).default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.subtitle}>솔직한 리뷰, 믿을 수 있는 평점!</h1>
                <h2 className={classes.title}>DMU Plate</h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      

      <div className={classNames(classes.main, classes.mainRaised)}>

      {storeList.map(obj => {
        return (
<Card className={classes.storeCard}>
        <CardBody className={classes.storeCardbody}>
          <img className={classes.storeImage} src={obj.imgList[0] ? obj.imgList[0].imgUrl : ""} />
          <h4 className={classes.storeTitle}>{obj.name}</h4>
          <h4 className={classes.storeDescription}>{obj.address} - {obj.category}</h4>
        </CardBody>
      </Card>

        )
        
      })}

      


      </div>
    </div>
  );
}
