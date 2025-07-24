const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Service packages data
const servicePackagesData = [
  {
    id: "premium-practice-launch",
    title: "Premium Practice Launch Package",
    category: "Practice Launch",
    price: "$499",
    description: "Everything you need to launch your NP practice, including comprehensive business planning, legal resources, and personalized 1:1 coaching sessions.",
    included: "<ul><li>Complete business plan template</li><li>6 months of 1:1 coaching sessions</li><li>Legal document templates</li><li>Marketing strategy guide</li><li>Financial planning worksheets</li></ul>",
    provider: "NP Clinical Hub",
    contactEmail: "info@npclinicalhub.com",
    duration: "6 months",
    imageUrl: "https://placehold.co/120x120/0A2540/FFD700?text=Launch",
    tags: ["Business", "Coaching", "Legal", "Marketing"],
    highlights: [
      "Step-by-step business planning guidance",
      "Personalized coaching sessions with industry experts",
      "Access to comprehensive legal templates",
      "Marketing strategy development",
      "Financial planning and budgeting tools"
    ],
    brochureUrl: "https://example.com/brochures/practice-launch.pdf",
    faqs: [
      { q: "Who is this package for?", a: "Nurse Practitioners looking to start their own independent practice." },
      { q: "Is coaching included?", a: "Yes, you get 6 months of personalized 1:1 coaching sessions." },
      { q: "What legal documents are included?", a: "Business formation documents, patient agreements, and compliance templates." }
    ],
    testimonials: [
      { text: "This package made my practice launch so much easier! The coaching was invaluable.", author: "Jane Smith, FNP" },
      { text: "I couldn't have done it without the comprehensive templates and guidance.", author: "Michael Johnson, AGNP" }
    ],
    providerProfile: {
      name: "Dr. Sarah Wilson",
      role: "Lead Practice Consultant"
    },
    lastUpdated: "2025-07-21"
  },
  {
    id: "telehealth-setup",
    title: "Telehealth Practice Setup",
    category: "Technology",
    price: "$299",
    description: "Complete telehealth platform setup and training for nurse practitioners entering virtual care.",
    included: "<ul><li>Platform selection guidance</li><li>Technical setup assistance</li><li>Compliance training</li><li>Patient onboarding templates</li></ul>",
    provider: "TeleHealth Solutions",
    contactEmail: "support@telehealthsolutions.com",
    duration: "3 months",
    imageUrl: "https://placehold.co/120x120/28a745/ffffff?text=Telehealth",
    tags: ["Technology", "Telehealth", "Training"],
    highlights: [
      "Platform selection and setup",
      "HIPAA compliance training",
      "Patient onboarding systems",
      "Technical support included"
    ],
    brochureUrl: "https://example.com/brochures/telehealth-setup.pdf",
    faqs: [
      { q: "Which platforms do you support?", a: "We work with all major telehealth platforms including Doxy.me, SimplePractice, and Zoom for Healthcare." },
      { q: "Is HIPAA compliance included?", a: "Yes, we provide comprehensive HIPAA compliance training and documentation." }
    ],
    testimonials: [
      { text: "The telehealth setup was seamless and professional.", author: "Lisa Chen, PMHNP" }
    ],
    providerProfile: {
      name: "Tech Team",
      role: "Technical Specialists"
    },
    lastUpdated: "2025-07-21"
  },
  {
    id: "billing-credentialing",
    title: "Billing & Credentialing Service",
    category: "Administrative",
    price: "$199/month",
    description: "Complete billing and insurance credentialing service for busy nurse practitioners.",
    included: "<ul><li>Insurance credentialing</li><li>Claims processing</li><li>Revenue cycle management</li><li>Monthly reporting</li></ul>",
    provider: "MedBilling Pro",
    contactEmail: "billing@medbillingpro.com",
    duration: "Ongoing",
    imageUrl: "https://placehold.co/120x120/dc3545/ffffff?text=Billing",
    tags: ["Billing", "Insurance", "Administrative"],
    highlights: [
      "Full insurance credentialing",
      "Automated claims processing",
      "Revenue optimization",
      "Detailed monthly reports"
    ],
    brochureUrl: "https://example.com/brochures/billing-service.pdf",
    faqs: [
      { q: "How long does credentialing take?", a: "Typically 90-120 days depending on the insurance provider." },
      { q: "What's your collection rate?", a: "We maintain a 95%+ collection rate for our clients." }
    ],
    testimonials: [
      { text: "My revenue increased 30% after switching to their billing service.", author: "Robert Davis, FNP" }
    ],
    providerProfile: {
      name: "Jennifer Martinez",
      role: "Billing Manager"
    },
    lastUpdated: "2025-07-21"
  },
  {
    id: "malpractice-insurance",
    title: "Malpractice Insurance Guide",
    category: "Insurance",
    price: "$99",
    description: "Comprehensive guide to selecting and obtaining malpractice insurance for nurse practitioners.",
    included: "<ul><li>Insurance comparison guide</li><li>Application assistance</li><li>Risk management training</li><li>Policy review checklist</li></ul>",
    provider: "Insurance Advisors",
    contactEmail: "info@insuranceadvisors.com",
    duration: "1 month",
    imageUrl: "https://placehold.co/120x120/6f42c1/ffffff?text=Insurance",
    tags: ["Insurance", "Risk Management", "Legal"],
    highlights: [
      "Compare top insurance providers",
      "Application guidance and support",
      "Risk management best practices",
      "Policy terms explanation"
    ],
    brochureUrl: "https://example.com/brochures/malpractice-guide.pdf",
    faqs: [
      { q: "Do I need malpractice insurance?", a: "Yes, malpractice insurance is essential for all practicing nurse practitioners." },
      { q: "How much coverage do I need?", a: "We recommend $1M per incident and $3M aggregate coverage minimum." }
    ],
    testimonials: [
      { text: "This guide helped me find the perfect insurance policy at a great rate.", author: "Amanda Wilson, WHNP" }
    ],
    providerProfile: {
      name: "Mark Thompson",
      role: "Insurance Specialist"
    },
    lastUpdated: "2025-07-21"
  }
];

async function updateServicePackages() {
  console.log('🚀 Starting to update service packages...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const packageData of servicePackagesData) {
    try {
      const { id, ...data } = packageData;
      await db.collection('servicePackages').doc(id).set(data);
      console.log(`✅ Updated: ${data.title}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error updating ${packageData.title}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n🎉 Update complete!`);
  console.log(`✅ Success: ${successCount} packages`);
  console.log(`❌ Errors: ${errorCount} packages`);
  
  process.exit(0);
}

// Run the update
updateServicePackages().catch(console.error);