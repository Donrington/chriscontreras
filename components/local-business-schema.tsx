export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Christina Contreras Cleaning",
    "image": "https://chriscontrerascleaning.com/logos/trans2_dark.png",
    "description": "Professional residential and commercial sanitation services. Experience precision cleaning with advanced protocols and eco-friendly solutions.",
    "@id": "https://chriscontrerascleaning.com",
    "url": "https://chriscontrerascleaning.com",
    "telephone": "+1-XXX-XXX-XXXX", // Replace with actual phone number
    "email": "christinacontrerascleaning@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "YOUR-STREET-ADDRESS", // Replace with actual address
      "addressLocality": "YOUR-CITY", // Replace with city
      "addressRegion": "YOUR-STATE", // Replace with state abbreviation
      "postalCode": "YOUR-ZIP", // Replace with ZIP code
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 0.0, // Replace with actual latitude
      "longitude": 0.0 // Replace with actual longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "sameAs": [
      // Add your social media URLs here
      // "https://www.facebook.com/christinacontrerascleaning",
      // "https://www.instagram.com/christinacontrerascleaning"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 0.0, // Replace with actual latitude
        "longitude": 0.0 // Replace with actual longitude
      },
      "geoRadius": "50" // Service radius in miles
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Cleaning",
            "description": "Professional home cleaning services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Cleaning",
            "description": "Office and commercial space cleaning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Deep Cleaning",
            "description": "Thorough deep cleaning services"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
