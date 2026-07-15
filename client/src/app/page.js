import Hero from './_components/HomeHero';
import ValueProp from './_components/HomeValue';
import HomeDifferentiator from './_components/HomeDifferentiator';
import HomeFeaturedBites from './_components/HomeFeaturedBites';
import HomeContact from './_components/Contact';

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
