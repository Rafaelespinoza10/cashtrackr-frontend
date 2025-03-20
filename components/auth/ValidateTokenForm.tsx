import { validateTokenAction } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";


type ValidateTokenProps = {
    setValidToken : Dispatch<SetStateAction<boolean>>;
    setToken : Dispatch<SetStateAction<string>>;
    token: string;
}

export default function ValidateTokenForm({setValidToken, setToken, token}: ValidateTokenProps) {

    const [isComplete, setIsComplete] = useState(false);
    const validTokenInput = validateTokenAction.bind(null, token);

    const [state, dispatch] = useFormState(validTokenInput, {
        errors: [],
        success: ''
    })


    useEffect(() => {
        if(isComplete){ 
            dispatch();
        }
    }, [ isComplete]);

    useEffect(() =>{
        if(state.errors){
            state.errors.forEach(error =>{
                toast.error(error);
            });
        }
        if(state.success){
            toast.success(state.success);
            setValidToken(true);
        }
    },[state])
    

const handleChange = (token: string) => {
        setIsComplete(false);
        setToken(token);
  }

  const handleComplete = () => {
    setIsComplete(true);
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-white shadow rounded-lg placeholder-white text-white bg-slate-950" />
        <PinInputField className="h-10 w-10 text-center border border-white shadow rounded-lg placeholder-white text-white bg-slate-950" />
        <PinInputField className="h-10 w-10 text-center border border-white shadow rounded-lg placeholder-white text-white bg-slate-950" />
        <PinInputField className="h-10 w-10 text-center border border-white shadow rounded-lg placeholder-white text-white bg-slate-950" />
        <PinInputField className="h-10 w-10 text-center border border-white shadow rounded-lg placeholder-white text-white bg-slate-950" />
        <PinInputField className="h-10 w-10 text-center border border-white shadow rounded-lg placeholder-white text-white bg-slate-950" />
      </PinInput>
    </div>
  )
}