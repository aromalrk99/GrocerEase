interface Feedback {
  id: string
  customer: string
  rating: number
  message: string
  date: string
}

const MOCK_FEEDBACK: Feedback[] = [
  { id: "1", customer: "John Doe", rating: 5, message: "Great service and fresh products!", date: "2024-01-15" },
  { id: "2", customer: "Jane Smith", rating: 4, message: "Good quality but delivery was late.", date: "2024-01-14" },
  { id: "3", customer: "Bob Johnson", rating: 5, message: "Excellent experience overall!", date: "2024-01-13" },
]

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Customer Feedback</h1>

        <div className="space-y-4">
          {MOCK_FEEDBACK.map((feedback) => (
            <div key={feedback.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{feedback.customer}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(feedback.date).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < feedback.rating ? "text-primary" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{feedback.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
