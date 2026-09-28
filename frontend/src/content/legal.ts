import type { SplitTitle } from "./types";

/**
 * Legal pages: privacy, terms and cookies.
 *
 * DRAFT TEMPLATES. These are sensible starting points written for a UK/EU
 * software agency, not legal advice. Everything in [square brackets] must be
 * filled in, and the whole text reviewed by legal counsel before launch.
 */

/** A paragraph, or a bulleted list. */
export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  /** Anchor id used by the table of contents. */
  id: string;
  heading: string;
  body: LegalBlock[];
}

export interface LegalDoc {
  slug: "privacy-policy" | "terms" | "cookie-policy";
  label: string;
  meta: { title: string; description: string };
  title: SplitTitle;
  subtitle: string;
  updated: string;
  summary: string[];
  sections: LegalSection[];
}

export const legalDraftNotice =
  "Draft: to be reviewed by legal counsel. This text is a template and is not yet legally binding. Details in [square brackets] are placeholders.";

const entity = "VAUG [legal entity name]";
const contactEmail = "privacy@vaug.in";

export const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  label: "Privacy Policy",
  meta: {
    title: "Privacy Policy",
    description: "How VAUG collects, uses and protects personal data, and the rights you have under UK and EU data protection law.",
  },
  title: { light: "Privacy", bold: "Policy." },
  subtitle: "What we collect, why we collect it, and how you stay in control. Written in plain English.",
  updated: "27 September 2026",
  summary: [
    "We collect only what we need to reply to you and deliver our work.",
    "We never sell your personal data.",
    "You can ask to see, correct or delete your data at any time.",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "1. Who we are",
      body: [
        `This policy explains how ${entity} ("VAUG", "we", "us") handles personal data when you visit vaug.in, contact us, or work with us. We are registered in [country] under company number [number], with our registered office at [address].`,
        `For the purposes of the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and the EU General Data Protection Regulation (EU GDPR), we are the controller of the personal data described here. Where we process data on a client's behalf as part of a project, we act as a processor under a separate data processing agreement.`,
        `If you have any questions, email ${contactEmail}. [If appointed: our Data Protection Officer can be reached at the same address. Our EU representative is [name, address].]`,
      ],
    },
    {
      id: "data-we-collect",
      heading: "2. Data we collect",
      body: [
        "We collect personal data in three ways:",
        {
          list: [
            "Data you give us: your name, work email, company, phone or WhatsApp number, budget range and the details of your project when you fill in a form, email us or book a call.",
            "Data we collect automatically: technical information such as IP address, browser type, device, pages visited and referring site, collected through essential cookies and, with your consent, analytics tools.",
            "Data from others: business contact details from public sources such as LinkedIn or company websites, or from partners who introduce you to us.",
          ],
        },
        "We do not intentionally collect special category data (such as health or biometric data) through this website. Please don't send it to us unless we've agreed a secure way to handle it.",
      ],
    },
    {
      id: "how-we-use-data",
      heading: "3. How we use your data and our lawful basis",
      body: [
        "We only use personal data when the law allows us to. In practice:",
        {
          list: [
            "To reply to your enquiry and prepare a proposal: legitimate interests, or steps taken at your request before entering a contract.",
            "To deliver and manage a project, send invoices and keep records: performance of a contract and legal obligation.",
            "To send occasional updates or newsletters: consent, which you can withdraw at any time using the unsubscribe link.",
            "To measure and improve our website: consent, for non-essential analytics cookies.",
            "To keep our website and systems secure and prevent fraud or spam: legitimate interests.",
            "To handle job applications: steps taken at your request, and legitimate interests in hiring the right people.",
          ],
        },
        "Where we rely on legitimate interests, we have balanced them against your rights. You can ask us for details of that assessment.",
      ],
    },
    {
      id: "ai-and-automation",
      heading: "4. AI tools and automated decisions",
      body: [
        "We use AI tools to help us work faster, for example to summarise enquiries or draft documents. We only use providers that do not train their models on data we submit, under contracts that protect confidentiality.",
        "We do not make decisions that have legal or similarly significant effects on you using automated processing alone. A person always reviews enquiries, proposals and job applications.",
      ],
    },
    {
      id: "sharing",
      heading: "5. Who we share data with",
      body: [
        "We never sell your personal data. We share it only with:",
        {
          list: [
            "Service providers who help us run the business, such as hosting, email, CRM, scheduling, analytics and accounting providers, under contracts that require them to protect it.",
            "Other VAUG group companies (India, UK and USA) where needed to reply to you or deliver your project.",
            "Professional advisers such as lawyers, accountants and insurers.",
            "Authorities, where the law requires us to.",
            "A buyer or successor, if our business is ever sold or reorganised, under the same protections.",
          ],
        },
        "[Insert a list of key sub-processors, or link to one.]",
      ],
    },
    {
      id: "international-transfers",
      heading: "6. International transfers",
      body: [
        "Our team works across India, the UK and the USA, so your data may be accessed from outside the UK or the European Economic Area.",
        "When that happens, we protect it with appropriate safeguards: adequacy regulations or decisions where they exist, and otherwise the UK International Data Transfer Agreement or Addendum and the EU Standard Contractual Clauses, together with supplementary measures where needed. You can ask us for a copy of the relevant safeguards.",
      ],
    },
    {
      id: "retention",
      heading: "7. How long we keep data",
      body: [
        "We keep personal data only as long as we need it:",
        {
          list: [
            "Enquiries that don't become projects: up to [24] months after our last contact.",
            "Client and project records: for the length of the contract plus [6] years, for legal and tax purposes.",
            "Job applications: up to [12] months after the role is filled, unless you agree to a longer period.",
            "Marketing preferences: until you unsubscribe, after which we keep a suppression record so we don't contact you again.",
          ],
        },
        "After that, we delete or anonymise it securely.",
      ],
    },
    {
      id: "security",
      heading: "8. How we protect data",
      body: [
        "We use technical and organisational measures appropriate to the risk, including encryption in transit and at rest, access controls on a need-to-know basis, multi-factor authentication, and regular reviews of our suppliers. Our practices are aligned with recognised frameworks such as ISO 27001; formal certification is on our roadmap.",
        "No system is perfectly secure. If a breach is likely to put your rights at risk, we will tell you and the relevant regulator as the law requires.",
      ],
    },
    {
      id: "your-rights",
      heading: "9. Your rights",
      body: [
        "Under UK and EU data protection law you have the right to:",
        {
          list: [
            "Access the personal data we hold about you.",
            "Have inaccurate data corrected.",
            "Have your data deleted in certain circumstances.",
            "Restrict or object to how we use your data, including for direct marketing.",
            "Receive your data in a portable format.",
            "Withdraw consent at any time, where we rely on it.",
          ],
        },
        `To use any of these rights, email ${contactEmail}. We'll reply within one month, and there's usually no charge.`,
        "If you're unhappy with how we've handled your data, please tell us first. You also have the right to complain to the Information Commissioner's Office (ico.org.uk) in the UK, or to your local supervisory authority in the EU.",
      ],
    },
    {
      id: "cookies",
      heading: "10. Cookies",
      body: [
        "We use essential cookies to run the website and, only with your consent, analytics cookies to understand how it's used. Our Cookie Policy explains which cookies we use and how to control them.",
      ],
    },
    {
      id: "children",
      heading: "11. Children",
      body: ["Our website and services are for businesses and are not directed at children under 16. We do not knowingly collect their personal data."],
    },
    {
      id: "changes",
      heading: "12. Changes to this policy",
      body: [
        "We may update this policy from time to time. The date at the top shows when it last changed. If we make significant changes, we'll let active clients know directly.",
      ],
    },
    {
      id: "contact",
      heading: "13. Contact us",
      body: [`${entity}, [registered address]. Email: ${contactEmail}.`],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "terms",
  label: "Terms & Conditions",
  meta: {
    title: "Terms & Conditions",
    description: "The terms that apply when you use the VAUG website. Client projects are governed by a separate signed agreement.",
  },
  title: { light: "Terms &", bold: "Conditions." },
  subtitle: "The ground rules for using our website. Project work is always covered by its own signed agreement.",
  updated: "27 September 2026",
  summary: [
    "These terms cover the website. Projects have their own contract.",
    "Website content is for general information, not professional advice.",
    "English law applies, with courts in England and Wales.",
  ],
  sections: [
    {
      id: "about-these-terms",
      heading: "1. About these terms",
      body: [
        `These terms apply to your use of vaug.in (the "website"), operated by ${entity}, registered in [country] under company number [number], with its registered office at [address].`,
        "By using the website you agree to these terms. If you don't agree, please don't use it.",
      ],
    },
    {
      id: "our-services",
      heading: "2. Our services and client contracts",
      body: [
        "The website describes our services, including AI as a Service, dedicated developers, custom development, Build With Us, monthly retainers, and launch and rescue work.",
        "Nothing on the website is an offer capable of acceptance. Every engagement is governed by a separate written agreement, such as a master services agreement and statement of work, which sets out the scope, fees, intellectual property, confidentiality and liability for that project. If that agreement conflicts with these terms, the agreement wins.",
        "Proposals, estimates and timelines we share before a contract is signed are given in good faith but are not binding until agreed in writing.",
      ],
    },
    {
      id: "using-the-website",
      heading: "3. Using the website",
      body: [
        "You may use the website for lawful purposes only. You must not:",
        {
          list: [
            "Try to gain unauthorised access to the website, its servers or any connected systems.",
            "Introduce viruses, malware or anything else harmful.",
            "Scrape, copy or harvest content or data at scale, including to train AI models, without our written permission.",
            "Submit false, misleading or spam enquiries through our forms.",
            "Use the website in any way that could damage our reputation or disrupt other users.",
          ],
        },
        "We may suspend or restrict access to the website at any time, for example for maintenance or security reasons.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "4. Intellectual property",
      body: [
        "We, or our licensors, own all intellectual property rights in the website, including its design, text, graphics, code and the VAUG name and logo. You may view and print pages for your own reference, but you may not reuse them commercially without our permission.",
        "Case studies on the website are anonymised unless the client has agreed to be named. Nothing on the website grants you any right to use a client's or a third party's trade marks.",
      ],
    },
    {
      id: "information-accuracy",
      heading: "5. Information on the website",
      body: [
        "We work to keep the website accurate and up to date, but its content is provided for general information only. It is not professional, legal, financial or technical advice, and you should not rely on it without getting advice specific to your situation.",
        "Figures and outcomes in case studies describe past projects. They do not guarantee similar results for your project.",
      ],
    },
    {
      id: "submissions",
      heading: "6. What you send us",
      body: [
        "When you share an idea or project details through the website, we treat them as confidential and use them only to reply to you and prepare a proposal. If you'd like a formal non-disclosure agreement before sharing more, ask and we'll sign one.",
        "Our Privacy Policy explains how we handle personal data you send us.",
      ],
    },
    {
      id: "third-party-links",
      heading: "7. Links to other websites",
      body: [
        "The website may link to other sites, such as our social profiles or tools we use for booking calls. We don't control those sites and aren't responsible for their content or privacy practices.",
      ],
    },
    {
      id: "liability",
      heading: "8. Our liability",
      body: [
        "Nothing in these terms limits or excludes our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded by law.",
        "Subject to that, we are not liable for any loss or damage arising from your use of, or inability to use, the website or reliance on its content, including loss of profit, revenue, business, data or goodwill, or any indirect or consequential loss.",
        "If you are a consumer, you have legal rights that these terms do not affect.",
      ],
    },
    {
      id: "changes",
      heading: "9. Changes to these terms",
      body: ["We may update these terms from time to time. The date at the top shows when they last changed. Please check this page when you visit."],
    },
    {
      id: "governing-law",
      heading: "10. Governing law",
      body: [
        "These terms, and any dispute arising from them, are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction. [Confirm jurisdiction with counsel.]",
        "If you are a consumer living elsewhere in the UK or the EU, you may also be able to bring proceedings in your local courts.",
      ],
    },
    {
      id: "contact",
      heading: "11. Contact us",
      body: [`Questions about these terms? Email legal@vaug.in or write to ${entity}, [registered address].`],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: "cookie-policy",
  label: "Cookie Policy",
  meta: {
    title: "Cookie Policy",
    description: "Which cookies the VAUG website uses, why, and how to control them under UK PECR and the EU ePrivacy rules.",
  },
  title: { light: "Cookie", bold: "Policy." },
  subtitle: "Which cookies we use, why we use them, and how to switch them off.",
  updated: "27 September 2026",
  summary: [
    "Essential cookies keep the website working.",
    "Analytics cookies only run if you say yes.",
    "No advertising or cross-site tracking cookies.",
  ],
  sections: [
    {
      id: "what-are-cookies",
      heading: "1. What cookies are",
      body: [
        "Cookies are small text files a website stores on your device. Similar technologies, such as local storage and pixels, work in much the same way, and we call them all \"cookies\" in this policy.",
        `This policy explains how ${entity} uses cookies on vaug.in, in line with the UK Privacy and Electronic Communications Regulations (PECR), the EU ePrivacy Directive, and UK and EU GDPR.`,
      ],
    },
    {
      id: "how-we-use-cookies",
      heading: "2. How we use cookies",
      body: [
        "We keep cookies to a minimum and group them into two types:",
        {
          list: [
            "Strictly necessary: needed for the website to work, for example to remember your light or dark theme, keep forms secure and protect against spam. These don't need consent.",
            "Analytics: help us understand which pages are useful, so we can improve them. We set these only if you accept them, and we configure them to avoid identifying you where possible.",
          ],
        },
        "We do not use advertising, retargeting or cross-site tracking cookies.",
      ],
    },
    {
      id: "cookies-we-use",
      heading: "3. Cookies we use",
      body: [
        "[Replace this list with the output of a cookie audit before launch.]",
        {
          list: [
            "theme (local storage, necessary): remembers your light or dark preference. Kept until you clear it.",
            "cookie-consent (necessary): records your cookie choices. Kept for up to 12 months.",
            "[analytics cookie name] (analytics, optional): counts visits and page views. Kept for up to [13] months.",
          ],
        },
      ],
    },
    {
      id: "third-party-cookies",
      heading: "4. Third-party services",
      body: [
        "Some pages may include tools from other providers, such as an embedded calendar for booking calls or a video player. These providers may set their own cookies, under their own policies. Where they aren't strictly necessary, we load them only after you consent.",
      ],
    },
    {
      id: "managing-cookies",
      heading: "5. Managing your choices",
      body: [
        "You can change your cookie choices at any time using the cookie settings link in the footer of the website. [Add cookie settings link once the consent tool is live.]",
        "You can also block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the website from working properly.",
      ],
    },
    {
      id: "changes",
      heading: "6. Changes to this policy",
      body: ["We'll update this policy when the cookies we use change. The date at the top shows when it last changed."],
    },
    {
      id: "contact",
      heading: "7. Contact us",
      body: [`Questions about cookies? Email ${contactEmail}. Our Privacy Policy has more on how we handle personal data.`],
    },
  ],
};

export const legalDocs = [privacyPolicy, terms, cookiePolicy];
