import Link from "next/link"
import { GitCompare } from "lucide-react"

export default function ComparePanel() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-primary-light rounded-lg">
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/compare/hospitals" className="bg-white p-8 rounded-lg hover:shadow-lg transition text-center">
          <GitCompare className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Compare Hospitals</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Side-by-side comparison of facilities, costs, and services
          </p>
          <span className="text-primary font-semibold">Start Comparing →</span>
        </Link>

        <Link href="/compare/doctors" className="bg-white p-8 rounded-lg hover:shadow-lg transition text-center">
          <GitCompare className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Compare Doctors</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Find the best doctor for your needs based on experience and fees
          </p>
          <span className="text-primary font-semibold">Start Comparing →</span>
        </Link>

        <Link href="/compare/treatments" className="bg-white p-8 rounded-lg hover:shadow-lg transition text-center">
          <GitCompare className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Compare Treatments</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Analyze treatment costs, risks, and hospital availability
          </p>
          <span className="text-primary font-semibold">Start Comparing →</span>
        </Link>
      </div>
    </section>
  )
}
