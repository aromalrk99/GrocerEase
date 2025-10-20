export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container py-16">
        <h1 className="text-4xl font-bold mb-8">About Grocerease</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At Grocerease, we believe that shopping for groceries should be convenient, affordable, and accessible to
              everyone. Our mission is to revolutionize the way people shop for groceries by providing a seamless online
              platform that connects customers with fresh, quality products.
            </p>
            <p className="text-muted-foreground">
              We partner with local farmers and suppliers to ensure that every product meets our high standards of
              quality and freshness.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground mb-4">
              We envision a world where grocery shopping is effortless, where customers can access fresh products with
              just a few clicks, and where delivery is fast and reliable.
            </p>
            <p className="text-muted-foreground">
              Our goal is to become the most trusted and convenient grocery delivery service in the region.
            </p>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Quality</h3>
              <p className="text-muted-foreground">We never compromise on the quality of our products.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Reliability</h3>
              <p className="text-muted-foreground">Fast, on-time delivery is our promise to you.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Sustainability</h3>
              <p className="text-muted-foreground">We care about the environment and our community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
