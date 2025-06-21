import React, { Suspense, useEffect, useState } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Flex } from '../components/style/Flex_styled';
import { useDispatch, useSelector } from 'react-redux';
import UnAuthorized from './UnAuthorized';
import { Loading } from '../components/Loading';
import { loadEventList, loadEventListByCatg } from '../features/proEvent/pro_event_slice';
import { ProEventGridPage } from '../features/proEvent/ProEventGrid';
import { Select } from '../components/style/Select_styled';
import { Label } from '../components/style/Label';
import { ContainerBody } from '../components/style/Container_styled';
import { Typography } from '../components/style/Typography_styled';


export const PromtDashboardPage = () => {
    const proEventData = useSelector((state) => state.proevents);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [category_id, set_category_id] = useState(0);

    useEffect(() => {
        dispatch(loadEventList());
    }, []);

    useEffect(() => {
        proEventData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [proEventData.loading]);

    return proEventData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (<>
        <Suspense>
            <ContainerBody padding="15px">
                <Flex row>
                    <Flex md="2" padding="0 !important">
                        <Typography fontSize="bodySubTitleFontSize" textAlign="left" fontWeight="bold" >
                            Category Name
                        </Typography>
                    </Flex>
                    <Flex md="2" padding="0 !important">
                        <Select
                            name="division"
                            onChange={(e) => {
                                var catID = e.target.value;
                                set_category_id(catID);
                                dispatch(loadEventListByCatg({ category_id: catID }));
                            }}
                            value={category_id || 0}
                        >
                            <option disabled value={0}>{"--select value"}</option>
                            {proEventData?.catList?.map((d, i) => (
                                <option value={d.category_id} key={i}>
                                    {d.category_name}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                    <Flex padding="10px 0 !important" md={12} sm={12} xs={12}>
                        <ProEventGridPage />
                    </Flex>
                </Flex>
            </ContainerBody>
            <Loading open={isLoading} />
        </Suspense>

    </>
    );
};
