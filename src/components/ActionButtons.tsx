import React, { useState } from 'react';
import { Users, Building2, Heart, Church } from 'lucide-react';
import BusinessSponsorshipForm from './BusinessSponsorshipForm';
import CreateBlessingRequest from './CreateBlessingRequest';
import MemoryShare from './MemoryShare';

interface ActionButtonsProps {
  onFindChurch: () => void;
  onShareMemory: () => void;
  onJoinMission: () => void;
}

export default function ActionButtons({ 
  onFindChurch, 
  onShareMemory, 
  onJoinMission 
}: ActionButtonsProps) {
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  return (
    <div className="bg-gradient-to-br from-patriot-cream to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={onFindChurch}
            className="group relative overflow-hidden bg-patriot-navy text-white p-6 rounded-xl text-senior hover:bg-patriot-blue transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-patriot-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-3">
              <Church className="w-8 h-8" />
              <span className="font-semibold">Find Your Church</span>
            </div>
          </button>

          <button 
            onClick={() => setShowBusinessForm(true)}
            className="group relative overflow-hidden bg-patriot-red text-white p-6 rounded-xl text-senior hover:bg-patriot-crimson transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-patriot-crimson/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-3">
              <Building2 className="w-8 h-8" />
              <span className="font-semibold">Support as a Business</span>
            </div>
          </button>

          <button 
            onClick={onShareMemory}
            className="group relative overflow-hidden bg-patriot-navy text-white p-6 rounded-xl text-senior hover:bg-patriot-blue transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-patriot-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-3">
              <Heart className="w-8 h-8" />
              <span className="font-semibold">Share Memory</span>
            </div>
          </button>
        </div>
      </div>

      {showBusinessForm && (
        <BusinessSponsorshipForm onClose={() => setShowBusinessForm(false)} />
      )}
    </div>
  );
}