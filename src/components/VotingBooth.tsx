import React, { useState } from 'react';
import { Vote, Lock } from 'lucide-react';
import { encryptVote, generateAESKey } from '../utils/crypto';

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
}

interface VotingBoothProps {
  voterId: string;
  onVoteSubmitted: (encryptedVote: string) => void;
}

const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    party: 'Progressive Party',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: '2',
    name: 'Michael Chen',
    party: 'Democratic Alliance',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: '3',
    name: 'Amara Okafor',
    party: 'People\'s Coalition',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const VotingBooth: React.FC<VotingBoothProps> = ({ voterId, onVoteSubmitted }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVoteSubmission = () => {
    if (!selectedCandidate) return;

    setIsSubmitting(true);
    const aesKey = generateAESKey();
    const encryptedVote = encryptVote(
      JSON.stringify({
        candidateId: selectedCandidate,
        voterId,
        timestamp: new Date().toISOString()
      }),
      aesKey
    );

    // In a real app, we would securely transmit the AES key using the ECC public key
    setTimeout(() => {
      onVoteSubmitted(encryptedVote);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Vote className="w-12 h-12 text-blue-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Cast Your Vote</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedCandidate === candidate.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{candidate.name}</h3>
            <p className="text-gray-600">{candidate.party}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleVoteSubmission}
          disabled={!selectedCandidate || isSubmitting}
          className={`flex items-center px-6 py-3 rounded-lg text-white font-medium ${
            !selectedCandidate || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Lock className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Encrypting Vote...' : 'Submit Secure Vote'}
        </button>
      </div>
    </div>
  );
};