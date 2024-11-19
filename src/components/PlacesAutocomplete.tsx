import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { MapPin } from 'lucide-react';

interface PlacesAutocompleteProps {
  onSelect: (placeId: string) => void;
}

export default function PlacesAutocomplete({ onSelect }: PlacesAutocompleteProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['establishment'],
      componentRestrictions: { country: 'us' }
    },
    debounce: 300,
    cache: 24 * 60 * 60,
  });

  const handleSelect = async (description: string, placeId: string) => {
    setValue(description, false);
    clearSuggestions();
    onSelect(placeId);
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search for your business..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
      />
      
      {status === 'OK' && (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
          {data.map(suggestion => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion.description, suggestion.place_id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-patriot-red" />
                <span>{suggestion.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}