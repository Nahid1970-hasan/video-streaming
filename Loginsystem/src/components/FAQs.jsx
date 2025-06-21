 
import { useState } from "react"; 
import { Answer, ArrowButton, Question, QuestionWrapper} from "../components/style/FAQ_Style"; 
import { Flex } from "./style/Flex_styled";
import { Typography } from "./style/Typography_styled";
 
export const FAQ = ({data}) => {   
        return (         
         <Flex row>
                <Flex padding={'10px 0 0 0'} md={12}>
                  <Typography textAlign={'left'} fontWeight={"bold"}>{"Q: What is streaming"} </Typography> 
                </Flex>
                <Flex padding={'0'}  md={12}>
                <Typography textAlign={'left'} margin={'5px 0 8px 0'}>{"A:  Streaming refers to any media content – live or recorded – delivered to computers and mobile devices via the internet and played back in real time"}</Typography> 
                </Flex>
         </Flex>
    
        )
    }
   