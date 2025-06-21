import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/page_slice";
import userReducer from "../features/user/user_slice";
import catitemReducer from "../features/admCategory/adm_category_slice"
import admChangePasswordReducer from "../features/changePassword/adm_change_pass_slice";
import admProfileReducer from "../features/profile/adm_profile_slice";
import emailConfigReducer from "../features/emailConfig/email_config_slice";
import channelConfigReducer from "../features/channels/adm_channel_slice";
import umAdminUserReducer from "../features/umAdminUser/um_admin_user_slice";
import umAdminUserRoleReducer from "../features/umAdminUser/um_admin_user_role_slice";
import umPromtUserReducer from "../features/umPromoterUser/um_promoter_user_slice";
import umPromtUserRoleReducer from "../features/umPromoterUser/um_promoter_user_role_slice"; 
import umSubsUserReducer from "../features/umSubsUser/um_subs_user_slice";
import umSubsUserRoleReducer from "../features/umSubsUser/um_subs_user_role_slice";
import admEventsReducer from "../features/admEvents/adm_events_slice";
import proEventsReducer from "../features/proEvent/pro_event_slice";
import subsEventsReducer from "../features/subsEvent/subs_event_slice";
import subsValidEventsReducer from "../features/subsEvent/subs_event_valid_slice";
import subsUsersReducer from "../features/subsUser/subs_user_slice";
import auditlogData from "../features/Auditlogs/audit_log_slice";
import pubAuditlogData from "../features/Auditlogs/pub_audit_log_slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    admchangepassword: admChangePasswordReducer,
    catitem: catitemReducer,
    admprofile: admProfileReducer,
    emailconfig: emailConfigReducer,
    channelconfig: channelConfigReducer,
    umadmuser: umAdminUserReducer,
    umadmuserrole: umAdminUserRoleReducer,
    umpromtuser: umPromtUserReducer,
    umpromtuserrole: umPromtUserRoleReducer,
    umsubsuser: umSubsUserReducer,
    umsubsuserrole: umSubsUserRoleReducer,
    admevents: admEventsReducer,
    proevents: proEventsReducer,
    subsevents: subsEventsReducer,
    subsvalidevents: subsValidEventsReducer,
    subsusers: subsUsersReducer,
    auditlog: auditlogData,
    pubAuditlog: pubAuditlogData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
