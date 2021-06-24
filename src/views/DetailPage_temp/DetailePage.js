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
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";


import styles from "assets/jss/material-kit-react/views/components.js";
import { SERVER_URL } from "config.js";
import API_Headers from "API_Headers.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Components(props) {
  let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
  const [restaurant, setRestaurant] = useState({
      imgList: []
  });
  const classes = useStyles();
  const { ...rest } = props;
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const { params } = props.match;
  useEffect(() => {
    const get = async () => {
      const result = await axios.get(`${SERVER_URL}/restaurants/${params.restaurantSeq}`, API_Headers());
      if(!completed) {
        
        console.log(result.data);
        setRestaurant(result.data);
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
        <h2>디테일 페이지 {restaurant.restaurantSeq}</h2>
        가게이름 : {restaurant.name} <br></br>
        영업시간 : {restaurant.businessHours}<br></br>
        전화번호 : {restaurant.phone}<br></br>
        위치 : {restaurant.address}<br></br>
        
        분류 : {restaurant.category}
        
        {
            restaurant.imgList.map(item => {
                return (
                    <Card className={classes.storeCard}>
                        <CardBody className={classes.storeCardbody}>
                        <img className={classes.storeImage} src={item.imgUrl} />
                        </CardBody>
                    </Card>
                )
            })
        }

        <div>
            <input type="text"></input> <button>댓글작성</button>
        </div>
        <div>
            댓글리스트
        </div>
      </div>

      
    </div>
  );
}
