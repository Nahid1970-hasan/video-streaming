import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import { useDispatch, useSelector } from "react-redux"; 
import { Label } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { useOutsideClicker } from "../utils/helper";
import { AlertButton, PrimaryButton } from "../components/Button";
import { InfoCard } from "../components/style/Card_styled";
import styled from 'styled-components';
import { Toast } from '../components/Toast';
import { loadPage } from '../features/page/page_slice';
import { Loading } from '../components/Loading';
import { initLoader, saveSubsUserConfig } from '../features/umSubsUser/um_subs_user_slice';

const LoginArea = styled.div`
  height: 300px;
  width: 400px;
  display: flex;  
`;

export const PubRegPage = () => {
    const user = useSelector((state) => state.user);
    const userConfigData = useSelector((state) => state.umsubsuser);
    const dispatch = useDispatch();
    const wraperRef = useRef(null);
    const [open, setOpen] = useState(false);
    useOutsideClicker(wraperRef, () => { setOpen(false) });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [user_name, set_user_name] = useState("");
    const [fullname, set_fullname] = useState("");
    const [user_pass, set_user_pass] = useState("");
    const [user_conpass, set_user_conpass] = useState("");
    const [pass_matched, set_pass_matched] = useState(false);
    useEffect(() => {
        if (user.login) {
            if (localStorage.user_type == "ADM") {
                navigate("/app");
            } else {
                navigate("/pub");
            }
        }
    }, [user]);

    const handleClick = async (event) => {
        event.preventDefault();
        if(user_name, user_conpass){
            var loginData = {
                "fullname":fullname,
                "username": user_name,
                "password": user_conpass
            } 
            dispatch(saveSubsUserConfig(loginData))
        } 
    };

    useEffect(() => {
        if (userConfigData.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (userConfigData.addUpdateLoading == "succeeded") { 
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); navigate("/login"); }, 5000);
        } else if (userConfigData.addUpdateLoading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
        }
    }, [userConfigData.addUpdateLoading]);


    return (
        <>
            {(userConfigData.addUpdateLoading == "idle" || userConfigData.addUpdateLoading == "pending") ? <></> : (
                userConfigData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={userConfigData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={userConfigData.msg} />
                )
            )}
            <Suspense fallback={<Loader />}>
                <div style={{ display: "flex", width: "100%", height: "80vh", justifyContent: "center", alignItems: "center" }}>
                    <LoginArea>
                        <Flex row>
                            <Flex padding="0 !important" md={12}>
                                <InfoCard>
                                    <FormStyled>
                                        <Typography textAlign="center" fontSize="bodyTitleFontSize" margin="20px 0 0 0" fontWeight="bold">
                                            Join with US
                                        </Typography>
                                        <Flex row>
                                            <Flex padding="10px 0 0 0 !important" md="12">
                                                <form>
                                                    <Label color="font" htmlFor="fullname">Fullname</Label>
                                                    <Input
                                                        type="text"
                                                        value={fullname}
                                                        placeholder="type fullname"
                                                        name="fullname" 
                                                        onChange={(e) => {
                                                            set_fullname(e.target.value)
                                                        }}
                                                    />
                                                    <Label color="font" htmlFor="user_name">Email</Label>
                                                    <Input
                                                        type="email"
                                                        value={user_name}
                                                        placeholder="type email"
                                                        name="user_name"
                                                        color={!user_name ? "error" : null}
                                                        onChange={(e) => {
                                                            set_user_name(e.target.value)
                                                        }}
                                                    />
                                                    <Label color="font" htmlFor="password">{"Password"}</Label>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        placeholder={"type password"}
                                                        value={user_pass}
                                                        onChange={(e) => {
                                                            set_user_pass(e.target.value); 
                                                        }}
                                                        color={!user_pass? "error" : null}
                                                    />
                                                    <Label color="font" htmlFor="con_password">{"Confirm Password"}</Label>
                                                    <Input
                                                        type="password"
                                                        id="con_password"
                                                        name="con_password"
                                                        placeholder={"type confirm password"}
                                                        value={user_conpass}
                                                        onChange={(e) => {
                                                            set_user_conpass(e.target.value); 
                                                        }}
                                                        color={!user_conpass && !(user_conpass===user_pass) ? "error" : null}
                                                    />
                                                    <AlertButton
                                                        full
                                                        color="primaryButton"
                                                        type="submit"
                                                        onClick={handleClick}
                                                        disabled={!(user_name && user_conpass && (user_conpass===user_pass))}
                                                    >
                                                        Sign Up
                                                    </AlertButton>

                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div ref={wraperRef}>
                                                            <Typography fontSize="bodyContentFontSize" textAlign="end">
                                                                Already user? <Link to="/login">Login</Link>
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                </form>
                                            </Flex>
                                        </Flex>
                                    </FormStyled>
                                </InfoCard>
                            </Flex>
                        </Flex>
                    </LoginArea>
                </div>
            </Suspense>
            <Loading open={isLoading} />
        </>
    );
};
