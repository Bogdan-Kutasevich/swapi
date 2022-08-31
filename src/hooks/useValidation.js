import {useState} from "react";

export const useValidation = ()=>{

    const [errorInput, setErrorInput] = useState('field must be not empty')
    const [isInputClicked, setInputClicked] = useState(false)

    const clickedInput = ()=>{
        setInputClicked(true)
    }

    const doValidation = (inputValue, type)=>{
        switch (type){
            case 'email':
                if(inputValue.length === 0) {
                    setErrorInput('field must be not empty')
                }else if(
                    !(String(inputValue)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ))
                ){

                    setErrorInput('incorrect email')
                }else{
                    setErrorInput('')
                }
                break
            case 'password':

                if(inputValue.length === 0) {
                    setErrorInput('field must be not empty')
                }else if((inputValue.length < 6)){
                    setErrorInput('at least six symbols')
                }else{
                    setErrorInput('')
                }
                break


            default:break
        }

    }


    return {
        errorInput,
        doValidation,
        isInputClicked,
        clickedInput

    }
}