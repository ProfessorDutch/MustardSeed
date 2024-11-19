import React from 'react';
import { Sprout, Heart, Users, Target, BookOpen, Star } from 'lucide-react';

export default function About() {
  return (
    <main className="flex-1">
      <section className="py-16 bg-gradient-to-br from-patriot-cream to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-patriot-navy mb-6">
            About The Mustard Seed Project
          </h1>
          <p className="text-xl text-patriot-blue mb-8 max-w-3xl">
            A movement rooted in faith, hope, and action—inspired by Jesus' words that even faith 
            the size of a mustard seed can move mountains.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-patriot-navy mb-6">Our Mission</h2>
              <p className="text-patriot-blue mb-6">
                We empower the next generation by providing life-changing resources, mentorship, 
                and opportunities. In a world where young people are losing direction, community, 
                and hope, we are committed to rebuilding the fabric of faith-centered leadership.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-patriot-red flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-patriot-navy">Faith-Centered Growth</h3>
                    <p className="text-patriot-blue">Nurturing spiritual foundations alongside practical skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-patriot-red flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-patriot-navy">Community Building</h3>
                    <p className="text-patriot-blue">Creating meaningful connections that last</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-patriot-red flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-patriot-navy">Purposeful Direction</h3>
                    <p className="text-patriot-blue">Guiding youth toward their God-given calling</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Youth Ministry"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-patriot-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-patriot-navy mb-4">How It Works</h2>
            <p className="text-xl text-patriot-blue">Building this movement from the ground up, starting with the Seed Stage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <Sprout className="w-12 h-12 text-patriot-red mb-4" />
              <h3 className="text-xl font-bold text-patriot-navy mb-4">Ambassadors</h3>
              <p className="text-patriot-blue mb-6">
                Share the message far and wide. Every like, post, and comment helps us reach more 
                people and grow the movement.
              </p>
              <button 
                onClick={() => window.location.href = '/join-movement'}
                className="bg-patriot-red text-white px-6 py-3 rounded-full hover:bg-patriot-crimson transition-colors"
              >
                Become an Ambassador
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <Star className="w-12 h-12 text-patriot-red mb-4" />
              <h3 className="text-xl font-bold text-patriot-navy mb-4">Foundation Members</h3>
              <p className="text-patriot-blue mb-6">
                Support the mission with a $33 monthly subscription to fund mentorships, training, 
                and life-changing resources.
              </p>
              <button 
                onClick={() => window.location.href = '/support'}
                className="bg-patriot-red text-white px-6 py-3 rounded-full hover:bg-patriot-crimson transition-colors"
              >
                Become a Member
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 text-patriot-red mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-patriot-navy mb-4">Our Vision</h2>
          <p className="text-xl text-patriot-blue max-w-3xl mx-auto mb-8">
            We see a future where no young person feels lost or without hope. A future where faith 
            is alive and thriving in communities across the nation.
          </p>
          <div className="max-w-xl mx-auto">
            <blockquote className="text-2xl italic text-patriot-navy mb-4">
              "Faith in Action: Changing Lives, One Seed at a Time."
            </blockquote>
            <button 
              onClick={() => window.location.href = '/support'}
              className="bg-patriot-red text-white px-8 py-3 rounded-full hover:bg-patriot-crimson transition-colors"
            >
              Join the Movement
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}