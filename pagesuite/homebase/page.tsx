import HomeHero from "./sections/hero-zone"
import HospitalShowcase from "./sections/hospital-showcase"
import DoctorFeatures from "./sections/doctor-features"
import TreatmentHighlights from "./sections/treatment-highlights"
import ComparePanel from "./sections/compare-panel"
import MapCTA from "./sections/map-cta"
import Footer from "@/components/navigation/footer"

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HospitalShowcase />
      <DoctorFeatures />
      <TreatmentHighlights />
      <ComparePanel />
      <MapCTA />
      <Footer />
    </main>
  )
}
