import React, { useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/admin-logo.png";
import LogoDark from "../../images/admin-logo.png";
import { Form,  Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {vendorLogin} from "../../services/userServices/user.service";
import Cookies from "universal-cookie";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const onFormSubmit = async () => {
    setLoading(true);

    if (loginDetails.email !== "" && loginDetails.password !== "") {
      const login = await vendorLogin(loginDetails);

      if(login.status === "success"){
        const cookies = new Cookies();
        cookies.set('user', login.data.user);
        cookies.set('accessToken', login.data.tokens.access.token);
        setLoading(false);
        window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
            "login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }else{
        setTimeout(() => {
          setError("Cannot login with credentials");
          setLoading(false);
        }, 2000);
      }

    } else {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 2000);
    }
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
            <h3 className="mt-3">Mbayat Vendor Admin</h3>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Mbayat Vendor Admin using your email and password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "This field is required" })}
                    value={loginDetails.email}
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        email: e.target.value
                      })
                    } }
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    value={loginDetails.password}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        password: e.target.value
                      })
                    } }
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary" disabled={loading}>
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </div>
            </Form>
            {/*<div className="form-note-s2 text-center pt-4">*/}
            {/*  {" "}*/}
            {/*  New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>*/}
            {/*</div>*/}
            {/*<div className="text-center pt-4 pb-3">*/}
            {/*  <h6 className="overline-title overline-title-sap">*/}
            {/*    <span>OR</span>*/}
            {/*  </h6>*/}
            {/*</div>*/}
            {/*<ul className="nav justify-center gx-4">*/}
            {/*  <li className="nav-item">*/}
            {/*    <a*/}
            {/*      className="nav-link"*/}
            {/*      href="#socials"*/}
            {/*      onClick={(ev) => {*/}
            {/*        ev.preventDefault();*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Facebook*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li className="nav-item">*/}
            {/*    <a*/}
            {/*      className="nav-link"*/}
            {/*      href="#socials"*/}
            {/*      onClick={(ev) => {*/}
            {/*        ev.preventDefault();*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Google*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </PreviewCard>
        </Block>
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
