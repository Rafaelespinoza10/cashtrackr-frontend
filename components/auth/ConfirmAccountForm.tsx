"use client"

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { confirmAccount } from '@/actions/confirm-account-action';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

export const ConfirmAccountForm = () => {
    const router = useRouter();
    const [isComplete, setIsComplete] = useState(false);
    const [token, setToken] = useState("");
    const confirmAccountWithToken = confirmAccount.bind(null, token);
    const[state, dispatch] =  useFormState(confirmAccountWithToken, {
        errors: [],
        success: '', 
    });

    useEffect(() => {
        if(isComplete){
            dispatch();
        }
    }, [isComplete])

    useEffect(()=>{
        if(state.errors){
            state.errors.forEach(error => {
                toast.error(error);
            });
        }

        if(state.success){
            toast.success(state.success, {
                    onClose: () =>{
                        router.push('/auth/login');
                    }
            });
        }
    },[state])    
    const handleChange =(token: string) =>{
        setIsComplete(false);
        setToken(token);
    }

    const handleComplete = () => {
            //llamamos al action
            setIsComplete(true);
     }

  return (
      <>
            {/* {state.errors.map( error => <ErrorMesage>{error}</ErrorMesage> )} */}
            {/* {state.success && <SuccessMessage>{state.success}</SuccessMessage>} */}
        <div className="flex justify-center gap-5 my-10">

            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10  text-center  bg-black text-white  border border-gray-300 placeholder:white shadow rounded-lg " />
                <PinInputField className="h-10 w-10  text-center bg-black text-white   border border-gray-300 placeholder:white shadow rounded-lg " />
                <PinInputField className="h-10 w-10  text-center bg-black text-white   border border-gray-300 placeholder:white shadow rounded-lg " />
                <PinInputField className="h-10 w-10  text-center bg-black text-white  border border-gray-300 placeholder:white shadow rounded-lg " />
                <PinInputField className="h-10 w-10  text-center  bg-black text-white border border-gray-300 placeholder:white shadow rounded-lg " />
                <PinInputField className="h-10 w-10  text-center  bg-black text-white   border border-gray-300 placeholder:white shadow rounded-lg " />
            </PinInput>
        </div>
    </>
  )
}
