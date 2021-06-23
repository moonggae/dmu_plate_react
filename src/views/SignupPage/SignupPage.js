import React, { useState } from "react";
import axios from 'axios';
import config from '../../config.js'
import API_Headers from "API_Headers.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function SignupPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [verifyNum, setVerifyNum] = useState('');
  const [userVerifyNum, setUserVerifyNum] = useState('');
  const [isCertified, setIsCertified] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeCertification = (e) =>{
    setUserVerifyNum(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }

  const getCertification = async (e) => {
    const data = {
      email : email
    }
    try{
      const response = await axios.post(`${config.SERVER_URL}/accounts/email`, data, API_Headers());
      const { data } = response;
      setVerifyNum(data.verifyNum);
      //console.log(response);
      //console.log(verifyNum);
    } catch(e){
      alert('오류발생');
    }
  }

  const validateVerifyNum = (e) => {
    if (userVerifyNum === verifyNum){
      alert('인증완료');
      setIsCertified(true);
    } else{
      alert('인증번호를 확인 해주세요.');
      setIsCertified(false);
    }
  }


  const onSubmit = async (e) => {
    if(!isCertified){
      alert('이메을 인증을 해주세요.');
      return false;
    }

    if(password !== passwordConfirm){
      alert('비밀번호가 다릅니다.');
      return false;
    }


    console.log(`ID : ${email}, PASSWORD : ${password}, passwordConfirm : ${passwordConfirm}`);

    const data = {
      email: email,
      accountType: "user",
      password: password
    }

    try{
      const response = await axios.post(`${config.SERVER_URL}/accounts`, data, API_Headers());
      const { status } = response;

      if(status === 201){
        alert('회원가입 완료');
      }
    } catch(e){
      alert('오류 발생');
    }
  }


  const wrapperCss = {
    "display": "flex",
    "alignItems": "center"
  }

  const btnCss = {
    "height": "fit-content",
    "padding": "10px",
    "marginLeft": "10px"
  }

  setTimeout(function () {
    setCardAnimation("");
  }, 500);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Sign Up</h4>
                  </CardHeader>``
                  <CardBody>
                    <div style={wrapperCss}>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          onChange: (e) => onChangeEmail(e)
                        }
                        }
                      />
                      <Button size="sm" style={btnCss} onClick={getCertification}>인증번호 발송</Button>
                    </div>

                    <div style={wrapperCss}>
                      <CustomInput
                        labelText="Certification..."
                        id="certification"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          onChange: (e) => onChangeCertification(e)
                        }
                        }
                      />
                      <Button size="sm" style={btnCss} onClick={validateVerifyNum}>인증번호 확인</Button>
                    </div>

                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        onChange: (e) => onChangePassword(e)
                      }}
                    />
                    <CustomInput
                      labelText="Password Confirm"
                      id="passConfirm"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        onChange: (e) => onChangePasswordConfirm(e)
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" onClick={onSubmit}>
                      CREATE ACCOUNT
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
