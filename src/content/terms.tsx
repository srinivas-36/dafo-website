import Link from "next/link";
import type { LegalSection } from "@/components/site/legal-document";

export const termsUpdated = "26 October 2026";
export const termsUpdatedDate = "2026-10-26";

const policyLinkClass =
  "font-medium text-brand-indigo underline-offset-4 transition-colors hover:underline";

export const termsSections: LegalSection[] = [
  {
    title: "1. Introduction",
    blocks: [
      {
        type: "paragraph",
        content:
          "Welcome to the DafoTalk website. These Terms & Conditions (“Terms”) govern your access to and use of the company website operated by DafoTalk Private Limited (“DafoTalk,” “we,” “our,” or “us”).",
      },
      {
        type: "paragraph",
        content:
          "By accessing or using this website, you agree to these Terms. If you do not agree, please discontinue using the website.",
      },
      {
        type: "paragraph",
        content:
          "These Terms apply to the company website only and do not govern the DafoTalk application or its services, which may be subject to separate terms when released.",
      },
    ],
  },
  {
    title: "2. Purpose of the Website",
    blocks: [
      {
        type: "paragraph",
        content:
          "This website provides information about DafoTalk, our mission, our products, our company, and opportunities to contact us.",
      },
      {
        type: "paragraph",
        content:
          "The website may be updated, changed, suspended, or discontinued as our business evolves.",
      },
    ],
  },
  {
    title: "3. Eligibility",
    blocks: [
      {
        type: "paragraph",
        content: "You must be at least 18 years old to use this website.",
      },
    ],
  },
  {
    title: "4. Acceptable Use",
    blocks: [
      {
        type: "paragraph",
        content: "You agree not to:",
      },
      {
        type: "list",
        items: [
          "Use the website for any unlawful purpose.",
          "Attempt to gain unauthorized access to the website or its systems.",
          "Interfere with the website’s operation, security, or availability.",
          "Submit false, misleading, abusive, or unlawful content through the Contact Us form.",
          "Use the website in a way that infringes the rights of others.",
        ],
      },
      {
        type: "paragraph",
        content:
          "We may take reasonable action if we believe these Terms have been violated.",
      },
    ],
  },
  {
    title: "5. Contact Form",
    blocks: [
      {
        type: "paragraph",
        content:
          "You may use the Contact Us form to submit enquiries or communicate with DafoTalk.",
      },
      {
        type: "paragraph",
        content:
          "You agree to provide accurate information and not to submit unlawful, harmful, or misleading content. Submitting an enquiry does not create a contractual, employment, partnership, or other business relationship with DafoTalk.",
      },
      {
        type: "paragraph",
        content: (
          <>
            We will handle personal information submitted through the form in
            accordance with our{" "}
            <Link href="/privacy" className={policyLinkClass}>
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "6. Intellectual Property",
    blocks: [
      {
        type: "paragraph",
        content:
          "Unless otherwise stated, the website and its content, including text, branding, logos, graphics, designs, and other materials, belong to DafoTalk Private Limited or are used with appropriate permission.",
      },
      {
        type: "paragraph",
        content:
          "You may view and use the website for personal and legitimate informational purposes. You may not reproduce, distribute, modify, commercially exploit, or republish website content without prior written permission, except where permitted by law.",
      },
    ],
  },
  {
    title: "7. Third-Party Links",
    blocks: [
      {
        type: "paragraph",
        content:
          "The website may contain links to third-party websites or services for convenience or informational purposes. DafoTalk does not control and is not responsible for the content, availability, terms, or practices of third-party websites.",
      },
      {
        type: "paragraph",
        content:
          "Accessing third-party websites is at your own discretion and risk.",
      },
    ],
  },
  {
    title: "8. Website Availability",
    blocks: [
      {
        type: "paragraph",
        content:
          "We aim to keep the website available and its information accurate, but we do not guarantee uninterrupted access, error-free operation, or that all information will always be complete, accurate, or current.",
      },
      {
        type: "paragraph",
        content: "We may modify or remove website content at any time.",
      },
    ],
  },
  {
    title: "9. Disclaimers",
    blocks: [
      {
        type: "paragraph",
        content:
          "The website and its content are provided on an “as is” and “as available” basis, to the extent permitted by law.",
      },
      {
        type: "paragraph",
        content:
          "Information on the website is provided for general informational purposes and does not constitute legal, financial, medical, or other professional advice.",
      },
    ],
  },
  {
    title: "10. Limitation of Liability",
    blocks: [
      {
        type: "paragraph",
        content:
          "To the extent permitted by applicable law, DafoTalk Private Limited will not be liable for indirect, incidental, special, or consequential losses arising from your use of, or inability to use, the website.",
      },
      {
        type: "paragraph",
        content:
          "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited under applicable law.",
      },
    ],
  },
  {
    title: "11. Privacy",
    blocks: [
      {
        type: "paragraph",
        content: (
          <>
            Your use of the website is also subject to our{" "}
            <Link href="/privacy" className={policyLinkClass}>
              Privacy Policy
            </Link>
            , which explains how we handle personal information submitted
            through the website.
          </>
        ),
      },
    ],
  },
  {
    title: "12. Changes to These Terms",
    blocks: [
      {
        type: "paragraph",
        content:
          "We may revise these Terms from time to time. Updated Terms will be published on this page with a revised “Last updated” date. Your continued use of the website after changes are published constitutes acceptance of the updated Terms to the extent permitted by law.",
      },
    ],
  },
  {
    title: "13. Governing Law",
    blocks: [
      {
        type: "paragraph",
        content:
          "These Terms are subject to the applicable laws of India, subject to any mandatory legal requirements that apply in your jurisdiction.",
      },
      {
        type: "paragraph",
        content:
          "Any disputes will be handled by the competent courts or other appropriate forums under applicable law.",
      },
    ],
  },
  {
    title: "14. Contact Us",
    blocks: [
      {
        type: "paragraph",
        content:
          "If you have questions about these Terms, please contact:",
      },
      { type: "contact" },
    ],
  },
];
