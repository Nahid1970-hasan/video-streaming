import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "../components/Button";
import DataGrid from "../components/DataGrid";
import { Card, CardBody } from "../components/style/Card_styled";
import { Flex } from "../components/style/Flex_styled";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import Flatpickr from "react-flatpickr";
import { Typography } from "../components/style/Typography_styled";
import { loadPage } from "../features/page/page_slice";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import { DateTime } from "luxon";
import { Modal } from "../components/Modal";
import { loadAuditLogData } from "../features/Auditlogs/audit_log_slice";

const CustDiv = styled.div`
  display: flex;
  margin: 0 0 0 0;
  align-items: center;
  & input {
    height: 35px;
    width: auto;
    margin: 0;
  }
  & :first-child {
    margin-right: 8px;
  }
  & :last-child {
    margin-left: 8px;
  }
`;

export const AuditLog = () => {
    const dispatch = useDispatch();
    const auditLogsData = useSelector((state) => state.logData);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const [date, setDate] = useState("");
    const [viewOpen, setViewOpen] = useState(false);
    const [rows, set_rows] = useState([]);
    const [viewData, setViewData] = useState("");
    useEffect(() => {
        dispatch(loadPage({ title: ("Audit Logs"), button: false }));
        var today = DateTime.now().toFormat("yyyy-MM-dd");
        setDate(today);
        loadAuditData(today);
    }, []);

    const auditLogsColums = [
        {
            headerName: "Id",
            field: "audit_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: "Serial",
            field: "serial",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            description: "Serial Number",
            sortable: true,
            smhide: true,
            width: "50px",
        },
        {
            headerName: "Source",
            field: "request_source",
            fontFamily: "var(--dashboard-font)",
            description: "Request Source",
            type: "string",
            width: "110px"
        },
        {
            headerName: "Type",
            description: "Request Type",
            field: "request_type",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "100px",
        },

        {
            headerName: "Request Description",
            description: "Request Description",
            field: "req_desc",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "180px"
        },
        {
            headerName: "Ip Address",
            description: "Ip Address",
            field: "ip_address",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "120px"
        },
        {
            headerName: "Time",
            field: "timestamp",
            description: "Time",
            type: "timestamp",
            fontFamily: "var(--dashboard-font)",
            width: "160px"
        },
        {
            headerName: "Action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["preview"],
            colors: ["info"],
            descriptions: ["View Details"],
            callBacks: [
                (id) => {
                    var data = auditLogsData?.dataList.find((d) => d.audit_id == id);
                    setViewData(data);
                    setViewOpen(data ?? true);
                },
            ],
        },
    ];

    function loadAuditData(date) {
        var data = {
            date: date,
        };
        dispatch(loadAuditLogData(data));
    }

    function handleSubmit() {
        loadAuditData(date);
    }


    // useEffect(() => {
    //     let rwData = auditLogsData?.dataList?.map((d, i) => ({ ...d, "serial": i + 1 }))
    //     set_rows(rwData);
    // }, [auditLogsData?.dataList]);

    let rwData=[{}]

    return (
        <>
            <Flex row>
                <Flex padding={"0 0 0 0 !important"} md={12}>
                    <Suspense fallback={<Loader />}>
                        <CardBody>
                            <form>
                                <Flex row>
                                    <Flex padding="0 !important" md={4} sm={12} xs={12}>
                                        <CustDiv>
                                            <Typography
                                                textAlign="left"
                                            >
                                                {("Date")}
                                            </Typography>
                                            <Flatpickr
                                                readOnly
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={date || ""}
                                                onChange={(e, str) => {
                                                    setDate(str);
                                                }}
                                                render={({ value, ...props }, ref) => {
                                                    return (
                                                        <Input
                                                            {...props}
                                                            type="text"
                                                            name="date"
                                                            minWidth="auto"
                                                            placeholder={("Pick Date")}
                                                            value={date || ""}
                                                            ref={ref}
                                                        />
                                                    );
                                                }}
                                            />
                                            <PrimaryButton
                                                margin="10px"
                                                type="button"
                                                onClick={() => handleSubmit()}
                                            >
                                                {("Submit")}
                                            </PrimaryButton>
                                        </CustDiv>
                                    </Flex>
                                </Flex>
                            </form>
                        </CardBody>
                        <CardBody>
                            <Flex row>
                                <Flex padding={"10px 0 0 0!important"} md={12}>
                                    {/* {auditLogsData.loading == "succeeded" ? (
                  <DataGrid
                    colums={auditLogsColums}
                    rows={rows||[]}
                  />
                ) : (
                  <></>
                )} */}
                                    <DataGrid
                                        colums={auditLogsColums}
                                        rows={rwData || []}
                                    />
                                </Flex>
                            </Flex>

                        </CardBody>
                    </Suspense>
                </Flex>
            </Flex>

            <Modal
                title={("Audit Detail")}
                open={viewOpen}
                md={6}
                sm={8}
                xs={11}
                onClose={() => {
                    setViewOpen(false);
                }}
                outsideclick
            >
                <div style={{ padding: '10px 5px' }}>
                    <Flex row>
                        <Flex padding="0 0 0px 0 !important" md={12}>
                            <Card>
                                <JSONPretty style={{ height: "auto", maxHeight: '450px', background: '#272822', padding: "10px" }} id="json-pretty" data={viewData?.detail ?? {}} theme={JSONPrettyMon}></JSONPretty>
                            </Card>
                        </Flex>
                    </Flex>
                </div>
            </Modal>
        </>
    );
};
