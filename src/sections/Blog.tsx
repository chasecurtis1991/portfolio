import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';

export const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="My Blog"
        eyebrow="Thoughts & Insights"
        description="Coming soon - Stay tuned for my thoughts on web development, design, and technology."
      />
      <div className="mt-12">
        <Card className="p-8 text-center">
          <p className="text-white/80 text-lg">
            Blog content will be available soon. Check back later for updates!
          </p>
        </Card>
      </div>
    </div>
  );
};
