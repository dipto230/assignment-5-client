import CorporateSection from "@/components/home/CorporateSection";
import HeroSection from "@/components/home/HeroSection";
import LawyerHighlight from "@/components/home/LawyerHighlight";
import PracticeAreaHighlight from "@/components/home/PracticeAreaHighlight";




export default function Home() {
  return (
    <>
      <HeroSection />
      <CorporateSection />
      <PracticeAreaHighlight />
      <LawyerHighlight/>
    </>
  );
}