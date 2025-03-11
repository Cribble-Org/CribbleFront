import React, { KeyboardEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cn } from '../../lib/utils';

interface PhoneNumberInputProps {
  defaultCountry?: string;
  value?: string;
  onPhoneChange: (value: string) => void;
  placeholder?: string;
  inputClass?: string;
  buttonClass?: string;
  dropdownClass?: string;
  error?: boolean;
  touched?: boolean;
  handleSubmit?: (event: KeyboardEvent<HTMLInputElement>) => void
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps & React.ComponentProps<typeof PhoneInput>> = ({
  defaultCountry = 'us',
  value = '',
  onPhoneChange,
  placeholder = 'Enter Phone No...',
  inputClass = '',
  buttonClass = '',
  dropdownClass = '',
  error = false,
  touched = false,
  handleSubmit,
  ...props
}) => {

  return (
    <div className={cn("cursor-default border border-[#ADA8C3] bg-[#15131D] rounded-xl h-[70px] w-4/5 px-5 pt-1 text-white",
      error && touched ? "error-border" : ""
    )}>
      <span className="font-jakartaSans text-[16px] text-[#CAC6DD]">Phone Number</span>
      <PhoneInput
        onEnterKeyPress={handleSubmit}
        country={defaultCountry}
        value={value}
        onChange={onPhoneChange}
        inputClass={`!w-full !bg-transparent !border-none !outline-none !ml-[12px] text-[14px] text-[#858DFF] font-jakartaSans text-[14px] font-light leading-normal ${inputClass}`}
        buttonClass={`!bg-transparent !border-none !text-white ${buttonClass}`}
        dropdownClass={`!bg-gray-700 !text-white ${dropdownClass}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default PhoneNumberInput;
