import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { VotingBooth } from './components/VotingBooth';
import { ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [voterId, setVoterId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleAuthenticated = (newVoterId: string) => {
    setVoterId(newVoterId);
    toast.success('Identity verified successfully!');
  };

  const handleVoteSubmitted = (encryptedVote: string) => {
    // In a real app, we would send this to a secure server
    console.log('Encrypted vote:', encryptedVote);
    setHasVoted(true);
    toast.success('Vote submitted securely!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secure E-Voting Platform
          </h1>
          <p className="text-lg text-gray-600">
            Powered by ECC & AES-256 Encryption
          </p>
        </div>

        {hasVoted ? (
          <div className="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
            <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Vote Successfully Recorded
            </h2>
            <p className="text-gray-600">
              Your encrypted vote has been securely submitted. Thank you for participating in the democratic process.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">
                Voter ID: {voterId}
              </p>
            </div>
          </div>
        ) : voterId ? (
          <VotingBooth
            voterId={voterId}
            onVoteSubmitted={handleVoteSubmitted}
          />
        ) : (
          <AuthForm onAuthenticated={handleAuthenticated} />
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;