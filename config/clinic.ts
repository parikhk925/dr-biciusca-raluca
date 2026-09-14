import type { ClinicConfig } from "./types";

/**
 * ============================================================================
 * CLINIC CONFIGURATION — the only file you should need to edit per business.
 * ============================================================================
 *
 * This template renders an entire premium clinic/doctor website from this
 * one object. To launch a new business:
 *
 *   1. Replace every field below with the new business's real information.
 *   2. Drop the new business's images into /public/business/ and point the
 *      `image`/`logo`/`hero.image` fields at them.
 *   3. Leave any field you don't have data for as `undefined` (or delete the
 *      optional key) — every section hides itself gracefully when its data
 *      is missing. Never fill a gap with "N/A", "Coming soon", or Lorem Ipsum.
 *
 * `practitioners` drives the homepage/about layout automatically:
 *   - 1 practitioner  → a doctor-focused "About Dr. X" layout
 *   - 2+ practitioners → a "Meet the Team" grid
 *   - 0 practitioners  → a clinic-level about section, no empty team block
 *
 * The data below is 100% fictional demo content for "Carter Dental Clinic" —
 * no real person, address, or phone number.
 */
export const clinic: ClinicConfig = {
  business: {
    name: "Carter Dental Clinic",
    shortName: "Carter Dental",
    legalName: "Carter Dental Clinic Ltd.",
    type: "dentist",
  },

  practitioners: [
    {
      id: "dr-emily-carter",
      name: "Dr. Emily Carter",
      title: "Dentist & Clinical Director",
      specialty: "Advanced Dental & Aesthetic Care",
      qualifications: ["BDS", "MSc Restorative Dentistry"],
      experienceYears: 12,
      languages: ["English", "French"],
      shortBio:
        "Dr. Carter focuses on open communication and a calm environment, so every patient understands exactly what's happening and feels at ease in the chair.",
      bio:
        "Dr. Emily Carter leads Carter Dental Clinic with a philosophy built on patience and clear explanation. Having spent over a decade treating patients of every age — including many who feel anxious about dental visits — she believes the best outcomes come from a patient who feels informed and comfortable at every step. Her practice covers general dentistry, orthodontics, endodontics and dental radiology, always with a focus on gentle, unhurried care.",
      featured: true,
    },
  ],

  branding: {
    logo: "/business/logo.jpg",
    favicon: "/favicon.ico",
  },

  hero: {
    eyebrow: "Modern Dentistry. Personal Care.",
    headline: "Gentle dentistry, without the fear.",
    description:
      "Dental care delivered in a calm, modern environment, where open communication and patient comfort always come first.",
    primaryCTA: "Book Appointment",
    secondaryCTA: "Call Now",
    image: "/business/hero.jpg",
    imageAlt: "Patient smiling during a calm dental consultation",
    tags: ["Consultation", "Cleaning", "Fillings", "Root Canal", "Orthodontics"],
  },

  about: {
    heading: "We provide personalised dental treatment in a calm environment,",
    supportingText:
      "with open communication and real care for every patient's comfort — especially those who feel anxious about visiting the dentist.",
  },

  careSection: {
    eyebrow: "Dedicated Care",
    heading: "A thoughtful approach to lasting dental health.",
  },

  teamSection: {
    eyebrow: "Our Team",
    title: "Meet Our Team of Dentists",
    description:
      "Every practitioner at Carter Dental Clinic shares the same commitment to calm, clearly explained care.",
  },

  contact: {
    phone: "+44 20 7946 0958",
    whatsapp: "442079460958",
    email: "hello@carterdental.example",
    address: "24 Wimpole Street",
    city: "London",
    region: "Greater London",
    postalCode: "W1G 8GN",
    country: "United Kingdom",
    latitude: 51.5195,
    longitude: -0.1509,
  },

  openingHours: [
    { days: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
    { days: "Saturday", hours: "10:00 AM – 1:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ],

  services: [
    {
      id: "general-dentistry",
      slug: "general-dentistry",
      name: "General Dentistry",
      shortDescription:
        "Consultations, routine check-ups and treatments for everyday dental and gum health.",
      description:
        "Regular check-ups help catch cavities and gum issues early, before they become painful or costly to treat. A general dentistry appointment typically includes a full assessment of your dental health, oral hygiene guidance and, if needed, a treatment plan explained step by step, at your own pace.",
      icon: "tooth",
      featured: true,
      confirmed: true,
    },
    {
      id: "orthodontics",
      slug: "orthodontics",
      name: "Orthodontics",
      shortDescription:
        "Assessment and orthodontic treatment for straighter teeth, for children and adults.",
      description:
        "Orthodontics addresses the correct alignment of teeth and jaws, both for aesthetic and functional reasons — a correct bite prevents uneven tooth wear and jaw joint problems. An initial assessment determines whether, and what type of, orthodontic treatment suits you, at any age.",
      icon: "braces",
      confirmed: true,
    },
    {
      id: "endodontics",
      slug: "endodontics",
      name: "Endodontics",
      shortDescription: "Root canal treatment, carried out carefully to minimise discomfort.",
      description:
        "Root canal treatment is needed when infection or inflammation reaches the nerve of a tooth. Though it has a reputation for being unpleasant, a well-performed root canal — with proper anaesthesia and clear explanation at every step — relieves pain rather than causing it.",
      icon: "root-canal",
      confirmed: true,
    },
    {
      id: "dental-radiology",
      slug: "dental-radiology",
      name: "Dental Radiology",
      shortDescription: "Radiological imaging for an accurate diagnosis before any treatment.",
      description:
        "Dental X-rays reveal what can't be seen with the naked eye — early cavities, root infections or the position of unerupted teeth. They're an essential step toward an accurate diagnosis and the right treatment plan.",
      icon: "xray",
      confirmed: true,
    },
    {
      id: "professional-cleaning",
      slug: "professional-cleaning",
      name: "Professional Cleaning",
      shortDescription: "Professional removal of plaque and tartar for optimal oral hygiene.",
      description:
        "Even with rigorous daily brushing, tartar builds up over time in hard-to-reach areas. Periodic professional cleaning prevents cavities and gum disease and keeps gums healthy.",
      icon: "cleaning",
      confirmed: false,
    },
    {
      id: "teeth-whitening",
      slug: "teeth-whitening",
      name: "Teeth Whitening",
      shortDescription: "Whitening solutions for a brighter smile, tailored to your needs.",
      description:
        "Professional teeth whitening is a safe, effective option for reducing staining and yellowing built up over time, carried out under the supervision of a dentist.",
      icon: "whitening",
      confirmed: false,
    },
    {
      id: "oral-surgery",
      slug: "oral-surgery",
      name: "Oral Surgery",
      shortDescription: "Extractions and minor surgical procedures, carried out with patient comfort in mind.",
      description:
        "Sometimes an extraction or a minor surgical procedure is the best solution for your long-term dental health. We make sure you understand why it's necessary and what to expect, before, during and after the procedure.",
      icon: "surgery",
      confirmed: false,
    },
    {
      id: "dental-prosthetics",
      slug: "dental-prosthetics",
      name: "Dental Prosthetics",
      shortDescription: "Crowns and bridges to restore the function and appearance of damaged teeth.",
      description:
        "Dental prosthetics restore heavily damaged or missing teeth using crowns, bridges or other prosthetic work, individually tailored for the most natural result possible.",
      icon: "crown",
      confirmed: false,
    },
  ],

  reviews: [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Genuinely the first dental visit where I didn't feel anxious the whole time. Everything was explained before it happened.",
      source: "Google",
      practitionerId: "dr-emily-carter",
    },
    {
      name: "James T.",
      rating: 5,
      text: "Calm, unhurried and painless — exactly what they promise. My kids actually like coming here now.",
      source: "Google",
    },
    {
      name: "Priya D.",
      rating: 5,
      text: "Root canal treatment with zero drama. Clear explanations at every step and no pain afterwards.",
      source: "Facebook",
      practitionerId: "dr-emily-carter",
    },
  ],
  rating: { score: "4.9/5", basedOn: 214 },

  stats: [
    { value: "4.9/5", label: "Average patient rating" },
    { value: "214", label: "Public patient reviews" },
    { value: "8", label: "Treatment areas" },
  ],

  gallery: [
    { src: "/business/treatment-room.jpg", alt: "Treatment room at Carter Dental Clinic" },
    { src: "/business/exterior.jpg", alt: "Entrance to Carter Dental Clinic" },
    { src: "/business/reception.jpg", alt: "Reception at Carter Dental Clinic" },
  ],

  processTags: ["Initial Assessment", "Treatment Plan", "Calm Procedure", "Aftercare"],

  process: [
    {
      title: "Booking",
      text: "Contact us by phone, WhatsApp or the form below and we'll find a time that works for you.",
      image: "/business/process-1.png",
    },
    {
      title: "Consultation & assessment",
      text: "We talk through your dental health and any concerns, and carry out a full, unhurried assessment.",
      image: "/business/process-2.png",
    },
    {
      title: "A clearly explained plan",
      text: "We explain exactly what we recommend and why, so you can make an informed decision at your own pace.",
      image: "/business/process-3.png",
    },
    {
      title: "Treatment, step by step",
      text: "Every stage is communicated before it begins. We pause any time you need a break.",
      image: "/business/process-4.png",
    },
    {
      title: "Aftercare",
      text: "You'll receive clear guidance for the period after treatment, and we remain available for questions.",
      image: "/business/process-5.png",
    },
  ],

  benefits: [
    {
      title: "Open communication",
      text: "We explain every step before it begins, so you always know what to expect.",
    },
    {
      title: "Your own pace",
      text: "No rushing. We pause, take a breath, and continue only when you're ready.",
    },
    {
      title: "Real comfort",
      text: "A welcoming practice, designed to ease anxiety rather than add to it.",
    },
    {
      title: "Trust built over time",
      text: "The relationship with every patient matters just as much as the treatment itself.",
    },
  ],

  faq: [
    {
      question: "I'm afraid of the dentist. How can you help?",
      answer:
        "We explain every stage upfront and go at your pace. You can ask for a break at any time — open communication is what defines us.",
    },
    {
      question: "How do I book a consultation?",
      answer:
        "The fastest way is by phone or WhatsApp, but you can also use the appointment form on this site.",
    },
    {
      question: "What happens at my first visit?",
      answer:
        "A full assessment of your dental health, a discussion of any concerns, and a clearly explained treatment plan — with no pressure to decide on the spot.",
    },
    {
      question: "Do you treat children?",
      answer: "Yes, our general dentistry and orthodontics services are for both children and adults.",
    },
  ],

  insights: [
    { tag: "Dental Health", title: "Professional cleaning vs. daily brushing", readTime: "6 min read" },
    { tag: "Dental Health", title: "Signs it's time for a check-up", readTime: "5 min read" },
    { tag: "Dental Health", title: "How to ease dental anxiety", readTime: "4 min read" },
  ],

  social: {
    instagram: "https://instagram.com/carterdental.example",
    facebook: "https://facebook.com/carterdental.example",
  },

  seo: {
    siteUrl: "https://carter-dental-template.vercel.app",
    title: "Carter Dental Clinic — Gentle Dentistry, Without the Fear | London",
    description:
      "Carter Dental Clinic in London offers general dentistry, orthodontics, endodontics and dental radiology in a calm, welcoming environment for patients of every age, including those who feel anxious about the dentist.",
    keywords: ["dentist London", "cosmetic dentistry", "family dentist", "root canal London"],
  },

  appointment: {
    enabled: true,
    heading: "Request an Appointment",
    description: "Fill in the form and we'll get in touch to confirm the date and time.",
    allowPractitionerSelection: false,
  },
};
