import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import { Heart, Users, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">About MediReach</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Empowering patients with information to make informed healthcare decisions
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <Heart className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide transparent, accessible healthcare information that helps patients find the right providers
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Our Vision</h3>
            <p className="text-muted-foreground">
              A healthcare ecosystem where patients have complete information to make confident decisions
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Our Values</h3>
            <p className="text-muted-foreground">
              Transparency, accuracy, patient-centric approach, and continuous improvement
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why MediReach?</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Comprehensive database of hospitals, doctors, and treatments in Bangalore</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Real-time cost comparisons to help you budget for healthcare</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Detailed doctor profiles with experience and specializations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Advanced search and filtering capabilities</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Side-by-side comparison tools for informed decision making</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>Location-based discovery with interactive mapping</span>
            </li>
          </ul>
        </div>

        <div className="bg-primary-light rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-4">Have questions or feedback? We'd love to hear from you!</p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}
