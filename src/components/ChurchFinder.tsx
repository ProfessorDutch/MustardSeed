import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, MapPin, Church, Phone, Globe } from 'lucide-react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { GOOGLE_MAPS_CONFIG } from '../config/google-maps';

interface Church {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  location: google.maps.LatLngLiteral;
}

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795
};

export default function ChurchFinder() {
  const [churches, setChurches] = useState<Church[]>([]);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['church'],
      componentRestrictions: { country: 'us' }
    },
    debounce: 300,
    cache: 24 * 60 * 60,
  });

  useEffect(() => {
    // Verify API key is present
    if (!GOOGLE_MAPS_CONFIG.apiKey) {
      setError('Google Maps API key is missing. Please check your configuration.');
      return;
    }

    // Initialize Places service when map is ready
    if (map) {
      const service = new google.maps.places.PlacesService(map);
      if (!service) {
        setError('Failed to initialize Places service. Please try again.');
      }
    }
  }, [map]);

  const searchNearbyChurches = useCallback((location: google.maps.LatLngLiteral) => {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location,
      radius: 50000,
      type: 'church'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const churchResults = results.map(place => ({
          id: place.place_id!,
          name: place.name!,
          address: place.vicinity!,
          location: {
            lat: place.geometry!.location!.lat(),
            lng: place.geometry!.location!.lng()
          }
        }));
        setChurches(churchResults);
      } else {
        setError('Failed to find churches in this area. Please try another location.');
      }
    });
  }, [map]);

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      map?.panTo({ lat, lng });
      map?.setZoom(12);
      searchNearbyChurches({ lat, lng });
    } catch (error) {
      setError('Error finding location. Please try again.');
    }
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-patriot-red">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-patriot-navy mb-6">Find Your Church</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search for churches..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent"
          />
        </div>

        {status === 'OK' && (
          <ul className="absolute z-10 bg-white mt-1 w-full rounded-lg shadow-lg max-h-60 overflow-auto">
            {data.map(suggestion => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelect(suggestion.description)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Church className="w-5 h-5 text-patriot-red" />
                  <span>{suggestion.description}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
        <div className="p-4 overflow-auto border-r border-gray-200">
          {churches.map(church => (
            <div
              key={church.id}
              onClick={() => setSelectedChurch(church)}
              className="p-4 hover:bg-gray-50 cursor-pointer rounded-lg mb-2"
            >
              <h3 className="font-semibold text-patriot-navy">{church.name}</h3>
              <div className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>{church.address}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2 relative">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={defaultCenter}
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {churches.map(church => (
              <Marker
                key={church.id}
                position={church.location}
                onClick={() => setSelectedChurch(church)}
              />
            ))}

            {selectedChurch && (
              <InfoWindow
                position={selectedChurch.location}
                onCloseClick={() => setSelectedChurch(null)}
              >
                <div className="p-2">
                  <h3 className="font-semibold mb-2">{selectedChurch.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedChurch.address}</p>
                  {selectedChurch.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${selectedChurch.phone}`} className="text-patriot-blue hover:text-patriot-red">
                        {selectedChurch.phone}
                      </a>
                    </div>
                  )}
                  {selectedChurch.website && (
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Globe className="w-4 h-4" />
                      <a href={selectedChurch.website} target="_blank" rel="noopener noreferrer" className="text-patriot-blue hover:text-patriot-red">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}