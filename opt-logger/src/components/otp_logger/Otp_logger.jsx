import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import './optlogger.css'
const Otp_logger = ({length=4 ,onOtpsubmit=()=>{console.log("otpsubmitted")}}) => {
    const [otp,setOtp] =useState(new Array(length).fill(""));
    const otp_ref =useRef([]);
    useEffect(()=>{
otp_ref.current[0].focus();
    },[])
    const handleChange =(index,e)=>{
  const newotp = [...otp];
     const value =e.target.value;
     if(isNaN(value)) return;
     newotp[index]=value.substring(value.length-1);
     setOtp(newotp)
     let otp_str =newotp.join("");
     console.log(otp_str)
     if(otp_str.length===4){
        onOtpsubmit();
     }
     if(value&&index<length-1&&otp_ref.current[index+1]){
        otp_ref.current[index+1].focus();
     }
    }
    const handleKeyDown =(e,index)=>{
        if (
            e.key === "Backspace" &&
            otp[index]==="" &&
            index > 0 &&
            otp_ref.current[index - 1]
          ) {
            e.preventDefault();
         otp_ref.current[index - 1].focus();
          }
     
    }
    const handleClick=(index)=>{
           otp_ref.current[index].setSelectionRange(1,1); //Select text from a specfic range
          if(otp[index]!=""){
            while(otp[index-1]==""&&otp_ref.current[index-1]&&index>0){
                otp_ref.current[index-1].focus();
                index--;
            }
          }
    }
  return (
    <div className="opt_logger">
        {
            otp&&otp.map((value,index)=>(
                <input type="text" 
                key={index}
                ref={(input)=>otp_ref.current[index]=input}
                value={value}
                onChange={(e)=>handleChange(index,e)}
                onKeyDown={(e)=>handleKeyDown (e,index)}
                onClick={(e)=>handleClick(index)}
                />
            ))
        }
    </div>
  )
}

export default Otp_logger