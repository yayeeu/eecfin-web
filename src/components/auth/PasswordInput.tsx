
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

interface PasswordInputProps {
  name: string;
  label?: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const PasswordInput = ({
  name,
  label = 'Password',
  showPassword,
  setShowPassword
}: PasswordInputProps) => {
  const { control } = useFormContext();
  
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...control.register(name)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PasswordInput;
