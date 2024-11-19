import React from 'react';
import { Church } from 'lucide-react';
import ChurchFinder from '../components/ChurchFinder';

export default function ChurchFinderPage() {
  return (
    <main className="flex-1">
      <section className="py-16 bg-gradient-to-br from-patriot-cream to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Church className="w-12 h-12 text-patriot-red" />
            <h1 className="text-4xl md:text-5xl font-bold text-patriot-navy">
              Find Your Church
            </h1>
          </div>
          <p className="text-xl text-patriot-blue mb-8 max-w-3xl">
            Discover churches in your area and connect with a community of faith.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <ChurchFinder />
        </div>
      </section>
    </main>
  );
}