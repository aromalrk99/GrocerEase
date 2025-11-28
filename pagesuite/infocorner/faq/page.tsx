"use client"

import { useState } from "react"
import Header from "@/components/navigation/header"
import Footer from "@/components/navigation/footer"
import { ChevronDown } from "lucide-react"

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I search for hospitals?",
      answer:
        "Use the search bar on the home page or navigate to the Hospitals section to browse and filter by specialty, area, accreditation, and bed capacity.",
    },
    {
      question: "Can I compare multiple hospitals?",
      answer:
        "Yes! Visit the Compare Hospitals page, enter hospital IDs, and you can compare up to 3 hospitals side-by-side.",
    },
    {
      question: "How are doctor fees determined?",
      answer:
        "Doctor fees vary based on experience, specialization, and reputation. You can view individual fees on each doctor's profile.",
    },
    {
      question: "What are treatment costs based on?",
      answer:
        "Treatment costs are based on current market rates in Bangalore. Actual costs may vary depending on hospital, doctor, and specific case complexity.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "We strive to keep our data current. Hospital and doctor information is updated regularly to ensure accuracy.",
    },
    {
      question: "Can I book appointments through MediReach?",
      answer:
        "Currently, MediReach provides information and comparisons. You can contact hospitals and doctors directly for appointments.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data privacy seriously. Any information you provide is encrypted and never shared with third parties.",
    },
    {
      question: "How do I report incorrect information?",
      answer:
        "Please use the Contact Us page to report any inaccuracies. We appreciate your help in keeping our data accurate.",
    },
  ]

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mb-12">Find answers to common questions about MediReach</p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card border border-border rounded-lg">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition"
              >
                <span className="font-bold text-left">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition ${activeIndex === index ? "rotate-180" : ""}`} />
              </button>

              {activeIndex === index && (
                <div className="px-6 py-4 border-t border-border bg-muted">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}
