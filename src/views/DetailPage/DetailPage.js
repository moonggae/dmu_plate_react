import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import { SERVER_URL } from "config.js";
import API_Headers from "API_Headers.js";
import axios from "axios";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { OfflineBoltSharp } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function DetailPage({ match }) {
  // let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
  // useEffect(() => {
  //   console.log('seq', match.params.seq);
  //   const get = async () => {
  //     const result = await axios.get(`${SERVER_URL}/restaurants/${match.params.seq}`, API_Headers()).catch(error => {
  //       if (error.response.status === 401)
  //         localStorage.removeItem('auth');
  //     })
  //     if (!completed && (result != undefined)) {
  //       if (result !== null) { }
  //       console.log(result)
  //       console.log(result.data);
  //       setStoreInfo(result.data);
  //       const { headers } = result;
  //       const { authorization } = headers;
  //       localStorage.setItem('auth', authorization);
  //     }
  //   }

  //   get();
    
  //   return () => {
  //     completed = true;
  //   };
  // }, {});
  let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
  useEffect(() => {
    const get = async () => {
      const result = await axios.get(`${SERVER_URL}/restaurants/${match.params.seq}`, API_Headers()).catch(error => {
        if(error.response.status === 401)
          localStorage.removeItem('auth');
      })
      if(!completed && (result != undefined)) {
        if(result !== null){}
        console.log(result)
        setStoreList(result.data);
        setImgList(result.data.imgList);
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
  },[]);

  const [storeList, setStoreList] = useState([]);
  const [imgList, setImgList] = useState([]);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const style = {
    width: '25%',
    height: '15rem',
    padding: '0px 2px 0px 2px'
  }
  return (
    <div>


      <Parallax filter small>

      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
          {imgList.map(obj => {
            return <img src={obj.imgUrl} style={style}/>
          })}
          </GridItem>
        </GridContainer>



        <div className={classes.container}>

          <GridContainer justify="left">
            <GridItem xs={12} sm={12} md={12} >

              <div className={classes.title}>
              {storeList.name}

              </div>
              <div className={classes.description}>

                <span>위치      : {storeList.address}</span><br />
                <span>전화번호  : {storeList.phone}</span><br />
                <span>음식 종류 : {storeList.category}</span><br />
                <span>영업시간  : {storeList.businessHours}</span><br />
              </div>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>


            </GridItem>
          </GridContainer>
        </div>

        
        {/* 


            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                

              <img src="https://mp-seoul-image-production-s3.mangoplate.com/195109/64f3op5s5cdf-i.jpg" style={style}/>
              <img src="https://mp-seoul-image-production-s3.mangoplate.com/195109/64f3op5s5cdf-i.jpg" style={style}/>
              <img src="https://mp-seoul-image-production-s3.mangoplate.com/195109/64f3op5s5cdf-i.jpg" style={style}/>
              <img src="https://mp-seoul-image-production-s3.mangoplate.com/195109/64f3op5s5cdf-i.jpg" style={style}/>

              </GridItem>
            </GridContainer>

  
       
          <div className={classes.container}>

            <GridContainer justify="left">
              <GridItem xs={12} sm={12} md={12} >

              <div className={classes.title}>

              Fried Chicken

                </div>
                <div className={classes.description}>

                  <span>위치 : </span><br/>
                  <span>전화번호 : </span><br/>
                  <span>음식 종류 : </span><br/>
                  <span>영업시간 : </span><br/>
                  <span>123123</span><br/>
                  address: "신림동 치킨"
businessHours: "오전 9시 ~ 오후 6시"
category: "치킨"
imgList: []
latitude: 0
longitude: 0
name: "테스트"
phone: "010-2684-8464"
restaurantSeq: 28
                </div>
     
                </GridItem>
                </GridContainer>
                </div>

 */}

      </div>
    </div>
  );
}
