import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import ErrorWidget from "./ErrorWidget";
import { config } from "../config/config";
import { Center } from "../components/style/Center_styled";
import { Typography } from "../components/style/Typography_styled";
import { Loader } from "../components/style/Loader_styled";
import { getLogin, getLogout } from "../features/user/user_slice";
import styled from "styled-components";
import { CardHeaderButton, InfoCard } from "../components/style/Card_styled";
import { FormStyled } from "../components/style/From_style";
import { Label } from "../components/style/Label";
import { Input } from "../components/style/Input_styled";
import { AlertButton, PrimaryButton, ReactButton } from "../components/Button";
import { Flex } from "../components/style/Flex_styled";
import { saveSubsUserConfig } from "../features/umSubsUser/um_subs_user_slice";
import { initLoader, validateSubsEvent, validSubsEvent } from "../features/subsEvent/subs_event_valid_slice";
import { Img } from "../components/style/Img_Styled";
import { SubPaymentStatusModal } from "../features/subsEvent/SubPaymentStatus";
import UnAuthorized from "./UnAuthorized";
import { Toast } from "../components/Toast";


const LoginArea = styled.div`
  height: 300px;
  width: 400px;
  display: flex;  
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #0c47b7;
    transform: scale(1.1);
    text-decoration: underline;
  }
`;


export const CustStyleButton = styled(PrimaryButton)`
    padding: 8px 0;
    margin: 0;
    height: auto;
    font-size: ${({ fontSize, notResize, theme }) => !!notResize ? theme.fontSize[fontSize ? fontSize : 'bodyContentFontSize'] : theme.fontSize[fontSize ? fontSize : 'bodyContentFontSize']};
    font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
    border-radius: ${({ left }) => left ? "5px 0 0 5px" : "0 5px 5px 0"};
    border-left: ${({ left }) => left ? "2px solid" : "1px solid"}; 
    border-bottom: 2px solid;
    border-right: ${({ left }) => left ? "1px solid" : "2px solid"}; 
    border-top: 2px solid;
    color: ${({ theme, fontColor, disabled }) =>
        disabled
            ? "rgba(0, 0, 0, 0.26)"
            : !!fontColor
                ? theme.colors[fontColor]
                : theme.colors.font};
   background: ${({ theme, isActive, disabled }) =>
        disabled
            ? "rgba(0, 0, 0, 0.12)"
            : isActive
                ? theme.colors.primaryActive
                : theme.colors.primaryButton};
`;


export const CheckWidgetPage = () => {
    const proEventDData = useSelector((state) => state.proevents);
    const subValidEvt = useSelector((state) => state.subsvalidevents);
    const userConfig = useSelector((state) => state.umsubsuser);
    const user = useSelector((state) => state.user);
    const { WIDURL } = config;
    const { data } = useParams();
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [tokenstr] = useState(data.split("promt")[1]);
    const [isLoading, setIsLoading] = useState(false);
    const [usrType, setUsrType] = useState("");
    const [activeBtn, setActivBtn] = useState("login");
    const [user_name, set_user_name] = useState("");
    const [user_pass, set_user_pass] = useState("");

    const [user_rname, set_user_rname] = useState("");
    const [fullname, set_fullname] = useState("");
    const [user_rpass, set_user_rpass] = useState("");
    const [user_conpass, set_user_conpass] = useState("");
    const [evtRData, setEvtRData] = useState({});
    const [event_type, set_event_type] = useState("");
    const [success_modal, set_success_modal] = useState(false);

    useEffect(() => {
        if (user.login) {
            setUsrType(user.user_type != "SUB" ? "failed" : "success")
        } else {
            setUsrType("invalid")
        }
    }, [user]);

    // useEffect(() => {
    //     setDetailData(proEventDData?.eventDetails || {})
    //     console.log(proEventDData.eventDetails);
    //     var durl = WIDURL+'/#/event/sub-request/promt='+proEventDData.eventDetails.promoter_code+"&evnt"+proEventDData.eventDetails.event_code;
    //     setReqUrl(durl);
    // }, [proEventDData.eventDetails]);

    useEffect(() => {
        subValidEvt.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [subValidEvt.loading]);

    useEffect(() => {
        if (subValidEvt.loading == "pending") {
            setIsLoading(true);
        } else if (subValidEvt.loading == "paid") { 
            setTimeout(() => { setIsLoading(false); nevigate("/"); }, 1000);
        } else {
            setTimeout(() => { setIsLoading(false); }, 2000);
        }
    }, [subValidEvt.loading]);

    useEffect(() => {
        if (user.lgoutloading == "pending") {
            setIsLoading(true);
        } else if (user.lgoutloading == "succeeded") {
            setUsrType("invalid");

            setTimeout(() => { setIsLoading(false) }, 5000);
        } else if (user.lgoutloading == "failed" || user.lgoutloading == "unauthorized") {
            setTimeout(() => { setIsLoading(false) }, 5000);
        }
    }, [user.lgoutloading]);

    useEffect(() => {
        if (user.loading == "pending") {
            setIsLoading(true);
        } else if (user.loading == "succeeded") {
            set_user_name("")
            set_user_pass("")
            setUsrType(user.user_type != "SUB" ? "failed" : "success")
            setTimeout(() => { setIsLoading(false) }, 5000);
        } else if (user.loading == "failed" || user.loading == "unauthorized") {
            set_user_pass("")
            setTimeout(() => { setIsLoading(false) }, 5000);
        }
    }, [user.loading]);

    useEffect(() => {
        if (usrType == "success") {
            var dt = tokenstr.split("&evnt");
            var reqdata = {
                "promoter_code": dt[0],
                "event_code": dt[1],
                "usercode": user.usercode
            }
            dispatch(validSubsEvent(reqdata));
        }
    }, [usrType]);

    useEffect(() => {
        if (Object.keys(subValidEvt?.evtDetails || '{}').length > 0) {
            setEvtRData(subValidEvt?.evtDetails);
        }
    }, [subValidEvt.evtDetails]);

    const handleClick = async (event) => {
        event.preventDefault();
        var loginData = {
            "username": user_name,
            "password": user_pass
        }
        if (user_name && user_pass) {
            dispatch(getLogin(loginData));
        }
    };

    const handleRClick = async (event) => {
        event.preventDefault();
        if (user_rname && user_conpass) {
            const regData = {
                fullname: fullname,
                username: user_rname,
                password: user_conpass,
            };
            dispatch(saveSubsUserConfig(regData));
        }
    };

    useEffect(() => {
        if (userConfig.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (userConfig.addUpdateLoading == "succeeded") {
            set_user_rname("");
            set_fullname("");
            set_user_rpass("");
            setActivBtn("login");
            set_user_conpass("");
            setTimeout(() => { setIsLoading(false) }, 2000);
        } else if (userConfig.addUpdateLoading != "idle") {
            set_user_rpass("");
            set_user_conpass("");
            setTimeout(() => { setIsLoading(false) }, 5000);
        }
    }, [userConfig.addUpdateLoading]);

    useEffect(() => {
        if (subValidEvt.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (subValidEvt.addUpdateLoading == "succeeded") {
            set_success_modal(true);
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (subValidEvt.addUpdateLoading == "failed" || subValidEvt.addUpdateLoading != "idle") {
            setTimeout(() => { setIsLoading(false); }, 5000);
        }
    }, [subValidEvt.addUpdateLoading]);

    return subValidEvt.loading === "unauthorized" ? (<UnAuthorized />) : (<>
    {(user.loading == "idle" || user.loading == "pending") ? <></> : (
        user.loading != "succeeded" && (
          <Toast color="error" msg={user.msg} />
        )
      )}
        <div>{usrType == "failed" ?
            <Center>
                <Typography margin={"10px 0"} fontWeight={100} lineHeight="3rem" fontSize="headingLargeFontSize" color="font">
                    You logged as {user.user_type == "ADM" ? "Admin" : user.user_type == "PRO" ? "Promoter" : ""} User
                </Typography>
                <Typography fontSize="titleLargeFontSize" lineHeight="3rem" color="font">
                    Please Switched to Public User
                </Typography>
                <Link to="#" margin={"10px 0"} replace>
                    <Typography onClick={() => dispatch(getLogout())} lineHeight="3rem" fontSize="titleLargeFontSize" color="font">
                        Logout
                    </Typography>
                </Link>
            </Center> : <div style={{ display: "flex", width: "100%", paddingTop: '20px', height: "80vh", justifyContent: "center", alignItems: "center" }}>
                <LoginArea>
                    {usrType == "success" ?
                        subValidEvt.loading === "succeeded" ? <Center>
                            <Flex row>
                                <Flex md={12}>
                                    <Center><Img height={"130px"} margin={"0"} src={evtRData.event_logo || ""} alt="Preview"></Img></Center>
                                    <Typography margin="10px 0 0 0" fontSize="bodySubTitleFontSize" textAlign="left" color="font">
                                        Event Title : {evtRData.event_name}
                                    </Typography>
                                    <Typography fontSize="bodySubTitleFontSize" textAlign="left" color="font">
                                        Event Desc : {evtRData.event_desc}
                                    </Typography>
                                    <div style={{ marginTop: "8px" }}>
                                        <Label
                                            color="font"
                                            inmr="10px"
                                            inbox="18px"
                                            fontSize="bodySubTitleFontSize"
                                            htmlFor="trial_p"
                                        >
                                            <Input
                                                type="radio"
                                                name="trial_p"
                                                checked={event_type === "trial"}
                                                value={"trial"}
                                                onChange={(e) => {
                                                    set_event_type("trial")
                                                }}
                                            />
                                            {"Trial (3 days)"}
                                        </Label>
                                        <Label
                                            color="font"
                                            inmr="10px"
                                            inbox="18px"
                                            fontSize="bodySubTitleFontSize"
                                            htmlFor="monthly_p"
                                        >
                                            <Input
                                                type="radio"
                                                name="monthly_p"
                                                checked={event_type === "monthly"}
                                                value={"monthly"}
                                                onChange={(e) => {
                                                    set_event_type("monthly")
                                                }}
                                            />
                                            {"Monthly (30 days)"}
                                        </Label>
                                    </div>
                                    <CardHeaderButton top="10px" start="5px">
                                        <PrimaryButton
                                            full
                                            color="primaryButton"
                                            type="button"
                                            onClick={() => { nevigate("/") }}
                                        >
                                            Cancel
                                        </PrimaryButton>
                                        <PrimaryButton
                                            full
                                            color="primaryButton"
                                            type="button"
                                            onClick={() => {
                                                var dt = tokenstr.split("&evnt");
                                                var rqdata = {
                                                    "promoter_code": dt[0],
                                                    "event_code": dt[1],
                                                    "usercode": user.usercode,
                                                    "subscription_type": event_type
                                                }
                                                dispatch(validateSubsEvent(rqdata));
                                            }}
                                            disabled={!event_type}
                                        >
                                            Submit
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </Flex>
                            </Flex>
                        </Center> :subValidEvt.loading === "idle" || subValidEvt.loading === "pending" || subValidEvt.loading === "paid" ? <Center>
                            <Typography fontSize="headingLargeFontSize" lineHeight="3rem" fontWeight="bold" color="font">
                                { "Please wait..."}
                            </Typography>
                        </Center> : <Center>
                            <Typography fontSize="bodySubTitleFontSize" lineHeight="3rem" fontWeight="bold" color="font">
                                {subValidEvt.msg || "Unable to subscribe event, please try again"}
                            </Typography>
                        </Center>: <Flex row>
                            <Flex md={12} padding="0 !important">
                                <InfoCard>
                                    <FormStyled>
                                        <Flex row>
                                            <Flex md={6} padding="0 !important">
                                                <CustStyleButton left full fontSize="bodySubTitleFontSize" type="button" isActive={activeBtn === "login"} onClick={() => setActivBtn("login")}>
                                                    Login
                                                </CustStyleButton>
                                            </Flex>
                                            <Flex md={6} padding="0 !important">
                                                <CustStyleButton full fontSize="bodySubTitleFontSize" type="button" isActive={activeBtn === "signup"} onClick={() => setActivBtn("signup")}>
                                                    Sign Up
                                                </CustStyleButton>
                                            </Flex>
                                        </Flex>
                                        <Flex row>
                                            <Flex padding="10px 0 0 0 !important" md="12">
                                                {activeBtn === "login" ? <form>
                                                    <Label color="font" htmlFor="user_name">Username</Label>
                                                    <Input
                                                        type="text"
                                                        value={user_name}
                                                        placeholder="username"
                                                        name="user_name"
                                                        color={!user_name ? "error" : null}
                                                        onChange={(e) => {
                                                            set_user_name(e.target.value)
                                                        }}
                                                    />
                                                    <Label color="font" htmlFor="user_pass">Password</Label>
                                                    <Input
                                                        type="password"
                                                        name="user_pass"
                                                        value={user_pass}
                                                        placeholder="password"
                                                        color={!user_pass ? "error" : null}
                                                        onChange={(e) => {
                                                            set_user_pass(e.target.value)
                                                        }}
                                                    />
                                                    <Flex row>
                                                        <Flex md={12} padding={"0 !important"}>
                                                            <section>
                                                                <div>
                                                                    <Input type="checkbox" value="login" id="rememverMe" name="login" />
                                                                    <Label margin="10px 0 10px 0" color="font" htmlFor="rememverMe">Remember Me</Label>
                                                                </div>
                                                                <div>
                                                                    <Typography fontSize="bodyContentFontSize" textAlign="left">
                                                                        <Link to="/reset">Forget Password</Link>
                                                                    </Typography>
                                                                </div>
                                                            </section>
                                                        </Flex>
                                                        <Flex row>
                                                            <Flex md={12} padding={"0 !important"}>
                                                                <CardHeaderButton top="10px" start="5px">
                                                                    <PrimaryButton
                                                                        full
                                                                        color="primaryButton"
                                                                        type="button"
                                                                        onClick={() => { nevigate("/") }}
                                                                    >
                                                                        Cancel
                                                                    </PrimaryButton>
                                                                    <PrimaryButton
                                                                        full
                                                                        color="primaryButton"
                                                                        type="submit"
                                                                        onClick={handleClick}
                                                                        disabled={!(user_name && user_pass)}
                                                                    >
                                                                        Login
                                                                    </PrimaryButton>
                                                                </CardHeaderButton>

                                                            </Flex>

                                                        </Flex>
                                                    </Flex>
                                                </form> : <form>
                                                    <Label color="font" htmlFor="fullname">Fullname</Label>
                                                    <Input
                                                        type="text"
                                                        value={fullname}
                                                        placeholder="type fullname"
                                                        name="fullname"
                                                        onChange={(e) => set_fullname(e.target.value)}
                                                    />
                                                    <Label color="font" htmlFor="user_name">Email</Label>
                                                    <Input
                                                        type="email"
                                                        value={user_rname}
                                                        placeholder="type email"
                                                        name="user_rname"
                                                        color={!user_rname ? "error" : null}
                                                        onChange={(e) => set_user_rname(e.target.value)}
                                                    />
                                                    <Label color="font" htmlFor="password">Password</Label>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="user_rpass"
                                                        placeholder="type password"
                                                        value={user_rpass}
                                                        onChange={(e) => set_user_rpass(e.target.value)}
                                                        color={!user_rpass ? "error" : null}
                                                    />
                                                    <Label color="font" htmlFor="con_password">Confirm Password</Label>
                                                    <Input
                                                        type="password"
                                                        id="con_password"
                                                        name="con_password"
                                                        placeholder="type confirm password"
                                                        value={user_conpass}
                                                        onChange={(e) => set_user_conpass(e.target.value)}
                                                        color={!user_conpass && !(user_conpass === user_rpass) ? "error" : null}
                                                    />
                                                    <CardHeaderButton top="10px" start="5px">
                                                        <PrimaryButton
                                                            full
                                                            color="primaryButton"
                                                            type="button"
                                                            onClick={() => { nevigate("/") }}
                                                        >
                                                            Cancel
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            full
                                                            color="primaryButton"
                                                            type="button"
                                                            onClick={handleRClick}
                                                            disabled={!(user_rname && user_conpass && (user_conpass === user_rpass))}
                                                        >
                                                            Sign Up
                                                        </PrimaryButton>
                                                    </CardHeaderButton>
                                                </form>}
                                            </Flex>
                                        </Flex>
                                    </FormStyled>
                                </InfoCard>
                            </Flex>
                        </Flex>}
                </LoginArea>
            </div>}
        </div>
        <SubPaymentStatusModal open={success_modal} setOpen={set_success_modal} />
        <Loading open={isLoading} />
    </>
    );
};
