'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function OtpInput({ length = 4, onComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    // Take only the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    // If input is filled, move to the next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    
    // Check if OTP is complete
    const otpValue = newOtp.join('');
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, move to previous input
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Handle left arrow key
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Handle right arrow key
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length).split('');
    
    if (pasteData.some(char => !/^\d$/.test(char))) {
      return; // Don't paste if any character is not a digit
    }
    
    const newOtp = [...otp];
    
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pasteData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus on the next empty input or the last input
    const focusIndex = Math.min(pasteData.length, length - 1);
    inputRefs.current[focusIndex].focus();
    
    // Check if OTP is complete
    const otpValue = newOtp.join('');
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  return (
    <div className="flex justify-center space-x-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : null}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  );
}