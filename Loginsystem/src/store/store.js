import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/page_slice";
import userReducer from "../features/user/user_slice";
import pageAdmUser from "../features/AdmUser/admUser_slice";
import admuserRoleReducer from "../features/AdmUser/user_role_slice";
import getAuditLogReducer from "../features/Auditlogs/audit_log_slice";
import getChangePassword from "../features/changePassword/ChangePassword_Slice";
import adminPromoter from "../features/admPromoter/admPromoter_slice";
import adminPromoterRole from "../features/admPromoter/promoter_role_slice";
import adminSubscriber from "../features/admSubscribers/adm_subscriber_slice";
import roleSubscriber from "../features/admSubscribers/subscriber_role_slice";
import getEventSetup from "../features/eventSetup/event_setup_slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    admuser: pageAdmUser,
    userRole: admuserRoleReducer,
    logData: getAuditLogReducer,
    changePassword: getChangePassword,
    admPromoter: adminPromoter,
    PromoterRole: adminPromoterRole,
    admSubscriber: adminSubscriber,
    rolesubscriber: roleSubscriber,
    eventSetup: getEventSetup,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
