import React, { useState } from 'react';
import { Building2, CreditCard, Mail, Phone, Globe, MapPin } from 'lucide-react';

interface BusinessSponsorshipFormProps {
  onClose: () => void;
}

export default function BusinessSponsorshipForm({ onClose }: BusinessSponsorshipFormProps) {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    mission: '',
    logo: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  const sponsorshipTiers = [
    {
      id: 'seed',
      name: 'Seed Sponsor',
      price: 99,
      benefits: [
        'Logo on website',
        'Monthly social media mention',
        'Newsletter recognition',
        'Tax deduction receipt'
      ]
    },
    {
      id: 'harvest',
      name: 'Harvest Partner',
      price: 299,
      benefits: [
        'All Seed Sponsor benefits',
        'Featured sponsor story',
        'Quarterly impact report',
        'Youth event invitations',
        'Custom thank you plaque'
      ]
    },
    {
      id: 'legacy',
      name: 'Legacy Builder',
      price: 499,
      benefits: [
        'All Harvest Partner benefits',
        'Premium logo placement',
        'Annual recognition event',
        'Custom impact video',
        'Youth mentorship opportunities',
        'VIP ministry events access'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-patriot-navy">Business Sponsorship</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-4xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          {[1, 2].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`h-2 flex-1 mx-1 rounded-full ${
                stepNumber <= step ? 'bg-patriot-red' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-patriot-navy mb-6">Select Your Sponsorship Tier</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sponsorshipTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedTier === tier.id
                      ? 'bg-patriot-red text-white scale-105 shadow-lg'
                      : 'bg-white border-2 border-gray-200 hover:border-patriot-red'
                  }`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                  <p className={`text-2xl font-bold mb-4 ${
                    selectedTier === tier.id ? 'text-white' : 'text-patriot-red'
                  }`}>
                    ${tier.price}/mo
                  </p>
                  <ul className={`space-y-2 text-sm ${
                    selectedTier === tier.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {tier.benefits.map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {selectedTier && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="bg-patriot-red text-white px-8 py-3 rounded-full font-semibold hover:bg-patriot-crimson transition-colors"
                >
                  Continue with {sponsorshipTiers.find(t => t.id === selectedTier)?.name}
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline-block mr-2" />
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline-block mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline-block mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline-block mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-2" />
                  Business Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Mission
              </label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
                placeholder="Tell us about your business mission and why you want to support youth ministry..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full"
                required
              />
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-patriot-red text-white font-semibold hover:bg-patriot-crimson transition-colors"
              >
                Complete Sponsorship
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}