import React, { useState } from 'react';
import { Building2, Mail, MapPin, Phone, Globe, Heart, ArrowRight, X, Star, Users } from 'lucide-react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import BusinessQuestionnaire from './BusinessQuestionnaire';
import PlacesAutocomplete from '../PlacesAutocomplete';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  placeId: string;
  website: string;
  googlePlaceId: string;
}

export default function BusinessIntakeForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const { getPlaceDetails } = useGoogleMaps();
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    placeId: '',
    website: '',
    googlePlaceId: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleQuestionnaireComplete = (answers: Record<string, string[]>) => {
    setStep(3); // Move to enrollment form after questionnaire
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true); // Show success message after form submission
  };

  if (showSuccess) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-patriot-navy mb-6">
          Congratulations! 🎉
        </h3>
        <p className="text-patriot-blue mb-4">
          You are officially part of The Mustard Seed Movement—a growing community of believers committed to planting seeds of faith, hope, and opportunity.
        </p>
        <p className="text-patriot-blue mb-4">
          By saying 'yes,' you've joined a mission rooted in Christ's love and action. Together, we'll move mountains, one small act of faith at a time.
        </p>
        <p className="text-patriot-blue mb-6">
          Thank you for stepping forward as a leader. Whether you're sharing the message, planting seeds, or both, you are making an eternal impact.
        </p>
        <p className="text-xl font-semibold text-patriot-navy mb-4">
          Welcome to the family—let's grow this movement together!
        </p>
        <p className="text-lg italic text-patriot-red">
          "Faith in Action: Changing Lives, One Seed at a Time."
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-patriot-cream rounded-2xl max-w-4xl w-full mx-auto p-8 mt-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-patriot-navy">Business Partnership</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-patriot-navy mb-6">What Are You Signing Up For?</h3>
              <p className="text-patriot-blue mb-8">
                This is more than just an app—it's a community of like-minded Jesus followers coming together to make a difference.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-patriot-cream rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-patriot-red" />
                    <h4 className="text-lg font-semibold text-patriot-navy">Connecting with Local Christians</h4>
                  </div>
                  <p className="text-patriot-gray">Share your profile and connect with fellow believers who share your faith and values.</p>
                </div>

                <div className="bg-patriot-cream rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-8 h-8 text-patriot-red" />
                    <h4 className="text-lg font-semibold text-patriot-navy">Sharing the Message</h4>
                  </div>
                  <p className="text-patriot-gray">Spread hope and faith as a leader and teacher in your community.</p>
                </div>

                <div className="bg-patriot-cream rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-patriot-red" />
                    <h4 className="text-lg font-semibold text-patriot-navy">Leading by Example</h4>
                  </div>
                  <p className="text-patriot-gray">Show others how to elevate themselves through God's love and practical opportunities.</p>
                </div>

                <div className="bg-patriot-cream rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-8 h-8 text-patriot-red" />
                    <h4 className="text-lg font-semibold text-patriot-navy">Building Faith and Opportunity</h4>
                  </div>
                  <p className="text-patriot-gray">Create a stronger community of believers ready to make an impact.</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-patriot-red text-white px-8 py-3 rounded-full hover:bg-patriot-crimson transition-colors"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <BusinessQuestionnaire
            onComplete={handleQuestionnaireComplete}
            onBack={handleBack}
            onClose={onClose}
          />
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-patriot-navy mb-6">Business Information</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Find Your Business
                </label>
                <div className="relative">
                  <div className="mb-2">
                    <PlacesAutocomplete onSelect={(placeId) => {
                      setFormData(prev => ({ ...prev, googlePlaceId: placeId }));
                    }} />
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span>?</span>
                    <span>Find your Google Place ID by searching for your business</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-patriot-red text-white px-8 py-3 rounded-full hover:bg-patriot-crimson transition-colors"
                >
                  Complete Registration <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}