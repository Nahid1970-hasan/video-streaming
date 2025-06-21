import {
    createHashRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import { LayoutHome } from "../layouts/Layout_home";
import { Dashboard } from "../pages/Dashboard";
import { Registration } from "../pages/Registration";
import { ResetPass } from "../pages/Reset";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Contact } from "../pages/Contact";
import { LayoutLogin } from "../layouts/Layout_login";
import NotFound from "../pages/NotFound";
import { AdminDashboard } from "../pages/AdminDashboard";
import { Layout } from "../layouts/Layout";
import { AdminMasterDataPage } from "../pages/AdmMasterData";
import { AdminSettingsPage } from "../pages/AdmSettings";
import { AdminUserPage } from "../pages/AdmUMAdmUser";
import { AdminPromoterUserPage } from "../pages/AdmUMPrmUser";
import { AdmChangePasswordPage } from "../pages/AdmChangePass";
import { AdminProfilePage } from "../pages/AdminProfile";
import { AdminChannelPage } from "../pages/AdminChannel";
import { AdminSubscriberUserPage } from "../pages/AdmUMSubsUser";
import { LayoutPromoter } from "../layouts/LayoutPromoter";
import { PubRegPage } from "../pages/PubReg";
import { PubCredPage } from "../pages/PubCredPage";
import UnAuthorized from "../pages/UnAuthorized";
import { AdminEventPage } from "../pages/AdminEvent";
import { SubsEventsPage } from "../pages/SubscribeChannels";
import { PromtDashboardPage } from "../pages/PromtDashboard";
import { AdminUpdateEventPage } from "../pages/AdminUpdateEvent";
import { EventWidgetPage } from "../pages/EventWidget";
import ErrorWidget from "../pages/ErrorWidget";
import { LayoutWidget } from "../layouts/LayoutWidget";
import { SubReg } from "../pages/SubReg";
import { SubLogIn } from "../pages/SubLogIn";
import { CheckWidgetPage } from "../pages/CheckWidget";
import { AuditLog } from "../pages/AuditLog";
import { PubAuditlog } from "../pages/PubAuditlog";

export const WebRouter = createHashRouter(
    createRoutesFromElements(
        <>
            <Route element={<LayoutHome />}>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reset" element={<ResetPass />} />
                <Route path="/unauth" element={<UnAuthorized />} />
            </Route>
            <Route element={<LayoutLogin />}>
                <Route path="/login" element={<Login />} />
                <Route path="/pub-reg" element={<PubRegPage />} />
                <Route path="/sub-reg" element={<SubReg />} />
                <Route path="/sub-login" element={<SubLogIn />} />
                <Route path="/pub-cred" element={<PubCredPage />} />
                <Route path="/reg" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/pub" element={<LayoutPromoter />} errorElement={<NotFound />}>
                <Route index element={<Dashboard />} />
                <Route path="phome" element={<PromtDashboardPage />} />
                <Route path="sub-chnl" element={<SubsEventsPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/event" element={<LayoutWidget />} errorElement={<NotFound />}>
                <Route index element={<ErrorWidget />} />
                <Route path="widget/:data" element={<EventWidgetPage />} errorElement={<ErrorWidget />} />
                <Route path="sub-request/:data" element={<CheckWidgetPage />} errorElement={<ErrorWidget />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/app" element={<Layout />} errorElement={<NotFound />}>
                <Route index element={<AdminDashboard />} />
                <Route path="adm-catg" element={<AdminMasterDataPage />} />
                <Route path="adm-email" element={<AdminSettingsPage />} />
                <Route path="adm-user" element={<AdminUserPage />} />
                <Route path="pro-user" element={<AdminPromoterUserPage />} />
                <Route path="pub-user" element={<AdminSubscriberUserPage />} />
                <Route path="adm-chnl" element={<AdminChannelPage />} />
                <Route path="adm-evnt" element={<AdminEventPage />} />
                <Route path="adm-evnt-mda" element={<AdminUpdateEventPage />} />
                <Route path="change-pass" element={<AdmChangePasswordPage />} />
                <Route path="audit-logs" element={<AuditLog/>}/> 
                <Route path="pub-audit-logs" element={<PubAuditlog/>}/> 
                <Route path="profile" element={<AdminProfilePage />} />
            </Route>
            {/* 
          <Route path="/app" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/dashboard"  element={<Dashboard />} />    
      </Route> */}
        </>
    ),
    {
        basename: import.meta.env.BASE_URL
    }
);


