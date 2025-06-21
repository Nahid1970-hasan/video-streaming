import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { PrimaryButton} from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Modal } from "../../components/Modal"
import {  CardHeader, CardHeaderButton, InfoCard } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";
import { initLoader, selectAllModule, selectModule, selectReadOnly, updatePromtUserRole  } from "./um_subs_user_role_slice";
import { Loading } from "../../components/Loading";
import { Toast } from "../../components/Toast";

export const SubsUserRole = ({ open, setOpen, data }) => {

    const UserRole = useSelector(state => state.umsubsuserrole);
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
         UserRole.loading == "pending" ? setIsLoading(true): setTimeout(() =>  setIsLoading(false), 2000);
      }, [UserRole.loading]);

    useEffect(() => {
        if ( UserRole.updateLoading == "pending") {
            setIsLoading(true);
        } else if ( UserRole.updateLoading == "succeeded") {
            setIsLoading(false);
            setTimeout(() => { dispatch(initLoader());}, 5000);
        }else if (UserRole.updateLoading !=  "idle"){
            setIsLoading(false);
            setTimeout(() => { dispatch(initLoader());}, 5000);
        }
      }, [UserRole.updateLoading]);


    useEffect(() => { 
        setSelectAll(UserRole?.list?.every((d)=>d.sub_module?.every((b)=>b.selected)))
    }, [UserRole.list]);

    return <> 
     {(UserRole.updateLoading == "idle" || UserRole.updateLoading == "pending") ? <></> : (
          UserRole.updateLoading == "succeeded" ? (
            <Toast msg={UserRole.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={UserRole.msg} />
          )
        )}
        <Modal md={6} sm={6} xs={10} open={open} setOpen={setOpen} onClose={() => { setOpen(false); }} title={("User Role Setup")} outsideclick>
            <CardHeaderButton>
                <div>
                    <label htmlFor="readonly">{"Read Only"}</label>
                    <Checkbox id="readonly" hoverColor={'gridRowOdd'} size="md" checked={UserRole.read_only} onClick={(e) => dispatch(selectReadOnly(+e.target.checked))} />
                </div>
                <div>
                    <label htmlFor="readonly">{"Select All"}</label>
                    <Checkbox id="readonly" size="md"  hoverColor={'gridRowOdd'}  checked={selectAll} onClick={(e) => (dispatch(selectAllModule(+e.target.checked)), setSelectAll(!selectAll))} />
                </div>
             
                <PrimaryButton 
                    onClick={() => { console.log(data), dispatch(updatePromtUserRole(data)) }}  >
                    { ("Submit")}
                </PrimaryButton>

            </CardHeaderButton>
            <form>
                <Flex row>
                    {
                        UserRole?.list?.map((module, i) => (<Flex key={i} padding={"5px !important"} md={4} xs={12}>
                            <InfoCard >
                                <CardHeader bottom="10px">{( module.module_name)}</CardHeader>
                                
                                    {module.sub_module.map((sub, i) => (
                                        <div key={i} style={{display:"flex"}}>
                                            <Checkbox size="sm" hoverColor={'primarySecendaryBorder'} onClick={(e) => dispatch(selectModule(e.target.id))} id={"select_" + module.module_id + "_" + sub.sub_module_id} checked={sub.selected} />
                                            <label htmlFor={"select_" + module.module_id + "_" + sub.sub_module_id}>{(sub.sub_module_name )}</label>
                                        </div>
                                    ))}

                             
                            </InfoCard>
                        </Flex>))
                    }

                </Flex>
            </form>
        </Modal >
        <Loading open={isLoading}/>
    </>
}