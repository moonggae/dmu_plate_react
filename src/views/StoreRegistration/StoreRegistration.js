// nodejs library that concatenates classes
import React, { useState } from 'react';
import { SERVER_URL } from 'config.js';
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

// @material-ui/icons

// core components

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles_ladnding from "assets/jss/material-kit-react/views/landingPage.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";


// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import axios from 'axios';
import API_Headers from 'API_Headers.js';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useStyles_landing = makeStyles(styles_ladnding);

export default function StoreRegistration(props) {
  const classes = useStyles();
  const classes_landing = useStyles_landing();
  const { ...rest } = props;

  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [file, setFile] = useState(null);
  const [label, setLabel] = useState('images...');

  const onChangeStoreName = (e) => {
    setStoreName(e.target.value);
    console.log(e.target.value);
  }
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  }
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  }
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  }
  const onChangeBusinessHours = (e) => {
    setBusinessHours(e.target.value);
  }
  const onChangeFile = (e) => {
    const {files} = e.target

    setFile(files);
    console.log(files);
    var imagetxt = document.getElementById('imagetxt');

    let fileText = '';
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if(index + 1 === files.length)
        fileText += file.name
      else
        fileText += file.name + ', ';
    }

    console.log(fileText);
    imagetxt.value = fileText;
    setLabel('');
  }

  // const getLocation = async (address) =>{

  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  //   const URL = `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${address}&refine=true&simple=true&format=json&type=PARCEL&key=ECEA15F0-2B55-3A5C-80BF-B28ACDD098A1`;
  //   const response = await axios.post(URL, { withCredentials: true });
  //   console.log(response);
  // }

  const onSubmit = async (e) => {
    const formData = new FormData();
    for (let index = 0; index < file.length; index++) {
      console.log(index, file[index]);
      let Cfile = file[index];
      formData.append('imgList',Cfile);
    }

    formData.append('name', storeName)
    formData.append('category', category)
    formData.append('address', address)
    formData.append('phone', phone)
    formData.append('businessHours', businessHours)
    formData.append('imgList', formData)
    formData.append('latitude', 0)
    formData.append('longitude', 0);

    console.log(formData);

    let currentHeader = API_Headers();
    currentHeader.headers['Content-Type'] = 'multipart/form-data';

    await axios.post(`${SERVER_URL}/restaurants`,formData,currentHeader).then(response => {
      alert('상점 등록 성공');
      const {headers} = response;
      const {authorization} = headers;
      localStorage.setItem('auth', authorization);
      document.location.href = "/";
    }).catch(error => {
      console.log(error);
      alert('올바른 정보를 입력하세요.');
    });
  }
  


  return (
    <div>
      <Parallax filter  small>

      </Parallax>
      <div className={classNames(classes_landing.main, classes_landing.mainRaised)}>
        <div className={classes_landing.container}>

        <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Store Registration</h2>

          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Store Name"
                  id="storeName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => onChangeStoreName(e)
                  }}
                
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Category"
                  id="category"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => onChangeCategory(e)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Address"
                  id="address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => onChangeAddress(e)
                  }}
                />
              </GridItem>
              
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Phone"
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => onChangePhone(e)
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="BusinessHours"
                  id="businessHours"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => onChangeBusinessHours(e)
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={12} >
              <CustomInput
                  labelText={label}
                  id="imagetxt"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  disabled
                  inputProps={{
                    disabled:true
                  }}
                />
                <Button variant="contained" component="label" style={{'float':'right'}}>Upload Image
                  <input type="file" hidden multiple accept="image/*" onChange={onChangeFile}/>
                </Button>
              </GridItem>
              
              <GridItem xs={12} sm={12} md={12} style={{"display": "flex", "justifyContent": "center"}}>
                <Button color="primary" onClick={onSubmit}>Registration</Button>
              </GridItem>
                            
              
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
        </div>
      </div>

    </div>
  );
}
