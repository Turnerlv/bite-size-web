import Hero from '@/components/sections/HomeHero';
import ValueProp from '@/components/sections/HomeValue';
import HomeDifferentiator from '@/components/sections/HomeDifferentiator';
import HomeFeaturedBites from '@/components/sections/HomeFeaturedBites';

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProp />
      <HomeDifferentiator />
      <HomeFeaturedBites />
    </div>
  );
}
