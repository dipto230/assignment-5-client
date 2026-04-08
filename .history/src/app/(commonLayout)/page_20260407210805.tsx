import CorporateSection from "@/components/home/CorporateSection";
import HeroFooter from "@/components/home/HeroFooter";
import HeroSection from "@/components/home/HeroSection";
import LawyerHighlight from "@/components/home/LawyerHighlight";
import LegalBlogSection from "@/components/home/LegalBlogSection";
import LogoSlider from "@/components/home/LogoSlider";
import PracticeAreaHighlight from "@/components/home/PracticeAreaHighlight";
import PremiumContactSection from "@/components/home/PremiumContactSection";
import PremiumStatsSection from "@/components/home/PremiumStatsSection";




export default function Home() {
  return (
    <>
      <HeroSection />
      <CorporateSection />
      <PracticeAreaHighlight />
      <LawyerHighlight />
      <PremiumStatsSection />
      <PremiumContactSection />
      <LegalBlogSection
      <LogoSlider />
      <HeroFooter/>
    </>
  );
}