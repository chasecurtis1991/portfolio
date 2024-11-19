import { Header } from '@/sections/Header';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="py-32 md:py-48">
        <div className="container mx-auto px-4">
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
      </div>
    </div>
  );
}
