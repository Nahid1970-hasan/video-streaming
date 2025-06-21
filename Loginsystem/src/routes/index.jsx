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
import { Promoter } from "../pages/Promoter";
import { Layout } from "../layouts/Layout";
import NotFound from "../pages/NotFound";
import { AdminDashboard } from "../pages/AdminDashboard";
import { Faq } from "../pages/Faq";
import { EmailConfig } from "../pages/EmailConfig";
import { ChangePass } from "../pages/ChangePass";
import { Profile } from "../pages/Profile";
import { AdmUser } from "../pages/AdmUser";
import { AuditLog } from "../pages/AuditLog";
import { AdmPromoter } from "../pages/AdmPromoter";
import { SubscribersUser } from "../pages/SubscribersUser";
import { PromoterHome } from "../pages/PromoterHome";
import { EventSetup } from "../pages/EventSetup";
import { DemoPage } from "../pages/DemoPage";
import { DemoHome } from "../pages/DemoHome";




export const WebRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<LayoutHome />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<DemoHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/promoter" element={<Promoter />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/reset" element={<ResetPass />} />

      </Route>

      <Route path="/app" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/app" element={<AdminDashboard />} />
        <Route path="adm-users" element={<AdmUser />} />
        <Route path="faq" element={<Faq/>}/> 
        <Route path="change-pass" element={<ChangePass />} />
        <Route path="profile" element={<Profile />} />
        <Route path="email" element={<EmailConfig/>}/> 
        <Route path="user" element={<AdmUser/>}/> 
        <Route path="auditlog" element={<AuditLog/>}/> 
        <Route path="adm-promoter" element={<AdmPromoter/>}/> 
        <Route path="adm-scriber" element={<SubscribersUser/>}/> 
        <Route path="pro-home" element={<PromoterHome/>}/> 
        <Route path="event-setup" element={<EventSetup/>}/> 
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/pro" element={<Layout />} errorElement={<NotFound />}>
   
        <Route path="/pro" element={<PromoterHome/>}/> 
        <Route path="demo" element={<DemoPage/>}/>  
        <Route path="*" element={<NotFound />} />
      </Route>
      
    </>
  ),
  {
    basename: import.meta.env.BASE_URL
  }
);


