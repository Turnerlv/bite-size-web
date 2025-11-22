import Hero from '@/components/sections/HomeHero';
import ValueProp from '@/components/sections/HomeValue';
import HomeDifferentiator from '@/components/sections/HomeDifferentiator';
import HomeFeaturedBites from '@/components/sections/HomeFeaturedBites';
import HomeContact from '@/components/sections/HomeContact';
import Footer from '@/components/navigation/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProp />
      <HomeDifferentiator />
      <HomeFeaturedBites />
      <HomeContact />
      <Footer />
    </div>
  );
}
