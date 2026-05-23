import Hero from './about/_components/HomeHero';
import ValueProp from './about/_components/HomeValue';
import HomeDifferentiator from './about/_components/HomeDifferentiator';
import HomeFeaturedBites from './about/_components/HomeFeaturedBites';
import HomeContact from './about/_components/Contact';

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProp />
      <HomeDifferentiator />
      <HomeFeaturedBites />
      <HomeContact />
    </div>
  );
}
