import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/config/clinic";
import { buildPageMetadata } from "@/lib/seo";
import { findPractitioner } from "@/lib/helpers";

export const metadata: Metadata = buildPageMetadata(clinic, {
  title: "Patient Reviews",
  description: clinic.rating
    ? `Public patient rating for ${clinic.business.name}: ${clinic.rating.score} from ${clinic.rating.basedOn} reviews.`
    : `Patient reviews for ${clinic.business.name}.`,
});

export default function ReviewsPage() {
  const reviews = clinic.reviews ?? [];

  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="What Patients Say"
        title={
          clinic.rating
            ? `${clinic.rating.score} — average rating from ${clinic.rating.basedOn} public reviews.`
            : "What our patients say."
        }
        subtitle="Patients repeatedly mention the calm, patient approach and pain-free treatment."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => {
                const practitioner = findPractitioner(clinic, review.practitionerId);
                return (
                  <Reveal key={`${review.name}-${i}`} delay={i * 0.06}>
                    <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-6">
                      {review.rating && (
                        <div className="text-blue-500" aria-hidden>
                          {"★".repeat(Math.round(review.rating))}
                          <span className="text-ink/15">
                            {"★".repeat(Math.max(0, 5 - Math.round(review.rating)))}
                          </span>
                        </div>
                      )}
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-inkSoft">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-inkSoft/70">
                        <span className="font-medium text-ink">{review.name}</span>
                        <span>
                          {[review.source, practitioner?.name].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal>
              <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-inkSoft">
                Written reviews will appear here as soon as they&rsquo;re made available.
                {clinic.rating &&
                  ` The rating shown reflects the public rating available at the time this site was published.`}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <Faq />
      <CtaBanner />
      <Footer />
    </main>
  );
}
