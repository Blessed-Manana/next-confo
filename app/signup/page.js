"use client"
import { createContext, useState, useEffect } from 'react';
import styles from "../components/loginForm/LoginForm.module.css";
import {
  StyledContainer,
  StyledTextInput,
  StyledFormArea,
  StyledFromButton,
  StyledLabel,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink
} from "../components/Styles";

import { Formik, Form } from 'formik';
import { TextInput } from "../components/loginForm/LoginForm";
import * as Yup from "yup"
import { FiMail, FiLock, FiUser, FiCalendar } from 'react-icons/fi'
import { Dna } from 'react-loader-spinner'
import axios from "axios"


const Signup = () => {
  const [signup, setSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);

    const userData = {
      email: values.email,
      password: values.password,
      name: values.name,
      dateOfBirth: values.dateOfBirth,
    };

    const configuration = {
      method: 'post',
      url: 'https://blessed-server-fb134c82a307.herokuapp.com/signup',
      data: userData,
    };

    axios(configuration)
      .then((res) => {
        console.log('Registration successful:', res.data);
        window.location.href = '/welcomePage';
        setSignup(true)
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        if (error.response && error.response.status !== 404) {
          setErrorMessage("Email has been already signed in");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <StyledContainer className={styles.StyledContainer}>
      <StyledFormArea className={styles.formArea}>
        <img className={styles.logo} src="FcLogo.png" alt="FcLogo.png" />
        <StyledTitle colors={colors.theme} size={30}>Memeber Signup</StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: "",
            name: "",
          }}
          validationSchema={
            Yup.object({
              email: Yup.string().email('Invalid email adress').required("Required"),
              password: Yup.string().min(8, "Password is too short").max(15, "Password is too long").required("Required"),
              name: Yup.string().required("Required"),
              dateOfBirth: Yup.date().required("Required"),
              confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match"),
            })
          }
          onSubmit={handleSubmit}

        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                className={styles.input}
                name="name"
                type="text"
                label="User Name"
                placeholder="Enter UserName"
                icon={<FiUser />}
              />

              <TextInput
                className={styles.input}
                name="email"
                type="text"
                label="Email Address"
                placeholder="Enter Em@il"
                icon={<FiMail />}
              />

              <TextInput
                className={styles.input}
                name="dateOfBirth"
                type="date"
                label="Date Of Birth"
                icon={<FiCalendar />}
              />

              <TextInput
                className={styles.input}
                name="password"
                type="password"
                label="Password"
                placeholder="Enter Pa**word"
                icon={<FiLock />}
              />

              <TextInput
                className={styles.input}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Pa**word"
                icon={<FiLock />}
              />
              {errorMessage && (
                <p className={styles.textDanger}>{errorMessage}</p>
              )}
              <ButtonGroup>
                {!isSubmitting && <StyledFromButton type="sumbit">Sign Up</StyledFromButton>}

                {isSubmitting && (
                  <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Already have an Account? <a className={styles.TextLink} href="/login">Login</a>
        </ExtraText>
      </StyledFormArea>
    </StyledContainer>
  );
}

export default Signup;
