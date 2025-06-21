 
import { useState } from "react"; 
import { Answer, ArrowButton, Question, QuestionWrapper} from "../components/style/FAQ_Style"; 
import { Flex } from "./style/Flex_styled";
import { Typography } from "./style/Typography_styled";
import { useTranslation } from "react-i18next";
 
export const FAQ = ({data}) => {   
  const [t, i18n] = useTranslation();
        return (         
         <Flex row>
                <Flex padding={'10px 0 0 0'} md={12}>
                  <Typography textAlign={'left'} fontWeight={"bold"}>{"Q: "}{data.question_en.length==0?"---": t(i18n.resolvedLanguage == 'en' ? data.question_en : data.question_bn)} </Typography> 
                </Flex>
                <Flex padding={'0'}  md={12}>
                <Typography textAlign={'left'} margin={'5px 0 8px 0'}>{"A: "}{data.answer_en.length==0?"---": t(i18n.resolvedLanguage == 'en' ? data.answer_en : data.answer_bn)}</Typography> 
                </Flex>
         </Flex>
    
        )
    }
   