import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (needValidation)=>{
    const [inputValue, setInputValue] = useState('')
    const validation = useValidation()
    const handleInput = (e)=>{
        if (needValidation){
            validation.doValidation(e.target.value, e.target.name)
        }
        setInputValue(e.target.value)
    }


    return {
        inputValue,
        handleInput,
        errorMessage:validation.errorInput,
        isClicked:validation.isInputClicked,
        setClicked:validation.clickedInput

    }

}