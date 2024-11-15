import React, { useState } from 'react';
import { Shield, Fingerprint, UserCheck } from 'lucide-react';
import { generateVoterId } from '../utils/crypto';

interface AuthFormProps {
  onAuthenticated: (voterId: string) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthenticated }) => {
  const [step, setStep] = useState(1);
  const [nin, setNin] = useState('');
  const [vin, setVin] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // In a real app, we would validate these with an API
    if (nin && vin && otp) {
      const voterId = generateVoterId(nin, vin);
      onAuthenticated(voterId);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          {step === 1 && <Fingerprint className="w-16 h-16 text-blue-600" />}
          {step === 2 && <UserCheck className="w-16 h-16 text-blue-600" />}
          {step === 3 && <Shield className="w-16 h-16 text-blue-600" />}
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {step === 1 && 'NIN Verification'}
          {step === 2 && 'VIN Verification'}
          {step === 3 && 'OTP Verification'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              National Identity Number (NIN)
            </label>
            <input
              type="text"
              required
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your NIN"
              pattern="[0-9]{11}"
              maxLength={11}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Voter Identification Number (VIN)
            </label>
            <input
              type="text"
              required
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your VIN"
              pattern="[0-9]{19}"
              maxLength={19}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              One-Time Password (OTP)
            </label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter OTP sent to your phone"
              pattern="[0-9]{6}"
              maxLength={6}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {step === 3 ? 'Verify & Continue' : 'Next'}
        </button>
      </form>
    </div>
  );
};