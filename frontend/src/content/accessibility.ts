import type { Faq, Feature } from "./types";

/**
 * Accessibility: the statement for vaug.in and the "Accessibility audits and
 * remediation" capability page. The sample report is our own audit of vaug.in
 * (22 Nov 2026): real issues, real counts, real fixes. Keep it true when the
 * site changes, and re-run the audit before updating the numbers.
 */

export type AuditStatus = "Resolved" | "Exception" | "Monitoring";
export type Principle = "Perceivable" | "Operable" | "Understandable" | "Robust";

export interface AuditIssue {
  id: string;
  title: string;
  criterion: string;
  level: "A" | "AA" | "Best practice";
  principle: Principle;
  foundBy: "Automated (axe-core)" | "Manual (keyboard)" | "Manual (screen reader)" | "Manual (motion)";
  where: string;
  before: number;
  after: number;
  fix: string;
  verified: string;
  status: AuditStatus;
}

export const audit = {
  site: "vaug.in",
  date: "22 November 2026",
  standard: "WCAG 2.2 Level AA",
  pages: 81,
  views: ["Light theme, 1280 px", "Dark theme, 1280 px", "Phone, 390 px"],
  tools: ["axe-core 4.13 (WCAG 2.0, 2.1 and 2.2 A/AA rules plus best practices)", "Chrome", "Keyboard only", "Accessibility-tree review (names, roles, states)"],
  issues: [
    {
      id: "VA-01",
      title: "Text below 4.5:1 contrast",
      criterion: "1.4.3 Contrast (Minimum)",
      level: "AA",
      principle: "Perceivable",
      foundBy: "Automated (axe-core)",
      where: "Labels, captions and form hints on every page, and white text on the violet accent. Most instances were inside drawn product screens (see VA-02).",
      before: 15187,
      after: 0,
      fix: "Changed two design tokens instead of patching pages: subtle text is now #69646f on light bands and #918c99 on dark ones (4.5:1 or better on every surface), and the violet accent is #7c4dee (5.1:1 with white).",
      verified: "Full re-scan of every page in light, dark and phone views.",
      status: "Resolved",
    },
    {
      id: "VA-02",
      title: "Small text inside drawn product screens",
      criterion: "1.4.3 Contrast (Minimum)",
      level: "AA",
      principle: "Perceivable",
      foundBy: "Automated (axe-core)",
      where: "Case-study product screens and hero mock-ups",
      before: 0,
      after: 0,
      fix: "The screens are pictures of software, so their small interface text counts as text in an image (WCAG's exception for incidental text). Each screen is marked inert, carries a text alternative (its caption) and opens in a zoomable viewer.",
      verified: "Screens are outside the tab order and announced by caption only.",
      status: "Exception",
    },
    {
      id: "VA-03",
      title: "Carousel dots smaller than 24 × 24 px",
      criterion: "2.5.8 Target Size (Minimum)",
      level: "AA",
      principle: "Operable",
      foundBy: "Automated (axe-core)",
      where: "Product-screen carousels on case-study cards and heroes",
      before: 3240,
      after: 0,
      fix: "Each dot is now a 24 × 24 px button around the same small bar, so the look is unchanged and the target is easy to hit.",
      verified: "Re-scan, plus tap tests at 375, 390 and 430 px.",
      status: "Resolved",
    },
    {
      id: "VA-04",
      title: "Extra main landmarks and headings inside mock-ups",
      criterion: "1.3.1 Info and Relationships",
      level: "A",
      principle: "Perceivable",
      foundBy: "Automated (axe-core)",
      where: "Drawn screens that contained <main>, <h1> and <h2> elements",
      before: 888,
      after: 0,
      fix: "Mock-ups use neutral elements, and the case-study section labels became real h2 headings, so every page has one main landmark and an unbroken heading outline.",
      verified: "Landmark and heading-order rules pass on every page.",
      status: "Resolved",
    },
    {
      id: "VA-05",
      title: "Mega-menu links reached only after the rest of the header",
      criterion: "2.4.3 Focus Order",
      level: "A",
      principle: "Operable",
      foundBy: "Manual (keyboard)",
      where: "Desktop navigation: What We Do, Industries, Engineering, About",
      before: 4,
      after: 0,
      fix: "Menus follow the disclosure pattern: Tab from an open menu button enters its links, Tab past the last link moves on, Shift+Tab goes back, and Escape closes the menu and returns focus.",
      verified: "Keyboard walk-through of every menu.",
      status: "Resolved",
    },
    {
      id: "VA-06",
      title: "Closed mobile menu still reachable with Tab",
      criterion: "2.4.3 Focus Order",
      level: "A",
      principle: "Operable",
      foundBy: "Manual (keyboard)",
      where: "Phone navigation",
      before: 1,
      after: 0,
      fix: "Closed menus are inert, so hidden links never take focus.",
      verified: "Keyboard walk-through at 390 px.",
      status: "Resolved",
    },
    {
      id: "VA-07",
      title: "Moving content with no way to pause it",
      criterion: "2.2.2 Pause, Stop, Hide",
      level: "A",
      principle: "Operable",
      foundBy: "Manual (motion)",
      where: "162 looping CSS animations, plus the ticker, rotating headline words, product carousels and illustrations driven by script",
      before: 162,
      after: 0,
      fix: "A \"Pause animations\" button in the header stops every looping animation and remembers the choice; carousels also have their own pause button and stop on hover or focus. The operating system's reduce-motion setting does the same automatically.",
      verified: "Checked with the button on and off, and with reduced motion emulated.",
      status: "Resolved",
    },
    {
      id: "VA-08",
      title: "Theme switch did not announce whether it was on",
      criterion: "4.1.2 Name, Role, Value",
      level: "A",
      principle: "Robust",
      foundBy: "Manual (screen reader)",
      where: "Header theme button",
      before: 1,
      after: 0,
      fix: "The button exposes its state (aria-pressed) and has a stable name.",
      verified: "Accessibility-tree check of name, role and state.",
      status: "Resolved",
    },
    {
      id: "VA-09",
      title: "Screen-reader label on a non-interactive element",
      criterion: "4.1.2 Name, Role, Value",
      level: "A",
      principle: "Robust",
      foundBy: "Automated (axe-core)",
      where: "Home page wordmark animation",
      before: 3,
      after: 0,
      fix: "Replaced the invalid aria-label with visually hidden text.",
      verified: "Re-scan.",
      status: "Resolved",
    },
    {
      id: "VA-10",
      title: "Header could hide while a header item had focus",
      criterion: "2.4.11 Focus Not Obscured (Minimum)",
      level: "AA",
      principle: "Operable",
      foundBy: "Manual (keyboard)",
      where: "Sticky header on scroll",
      before: 1,
      after: 0,
      fix: "The header stays in view while it holds keyboard focus, and the page scroll padding keeps focused items clear of it.",
      verified: "Keyboard walk-through while scrolling.",
      status: "Resolved",
    },
    {
      id: "VA-11",
      title: "Regression watch",
      criterion: "All WCAG 2.2 A and AA criteria",
      level: "AA",
      principle: "Robust",
      foundBy: "Automated (axe-core)",
      where: "Every page, before each release",
      before: 0,
      after: 0,
      fix: "A scripted axe-core scan of every sitemap URL runs before each release, and a manual keyboard pass is repeated monthly. New issues are logged here.",
      verified: "Last run 22 November 2026: no failures.",
      status: "Monitoring",
    },
  ] satisfies AuditIssue[],
};

export const auditsPage = {
  meta: {
    title: "Accessibility Audits and Remediation",
    description:
      "WCAG 2.2 AA accessibility audits that combine automated scans with manual keyboard and screen-reader testing, then fix the issues in your code. No overlays.",
  },
  hero: {
    eyebrow: "Accessibility",
    title: { light: "Accessibility audits", bold: "and remediation." },
    subtitle:
      "We test your site or app against WCAG 2.2 AA with automated scans and hands-on keyboard and screen-reader checks, fix what we find in your codebase, and keep it passing. No overlays, no plug-ins that paper over the problem.",
    tags: ["WCAG 2.1 and 2.2 AA", "Section 508", "EN 301 549", "Fixes in code"],
  },
  method: [
    { title: "Scope and inventory", description: "We list every template, page type, component, form, document and third-party embed, and agree the standard (usually WCAG 2.1 or 2.2 AA) and the browsers and assistive technologies to cover.", meta: "Week 1" },
    { title: "Automated scans", description: "axe-core and Lighthouse across every URL in the sitemap, in each theme and at phone width, to catch contrast, labels, landmarks, ARIA and target-size issues at scale.", meta: "Days 2–4" },
    { title: "Manual testing", description: "Keyboard-only journeys, NVDA, JAWS and VoiceOver checks, 200% and 400% zoom, 320 px reflow, motion and timing, forms and error messages, PDFs and media. Automated tools find roughly a third of real issues; this finds the rest.", meta: "Week 2" },
    { title: "Remediate in code", description: "Fixes go into your codebase as reviewed pull requests, starting with the issues that block tasks. Shared fixes (tokens, components) come first, so one change clears hundreds of instances.", meta: "Weeks 2–4" },
    { title: "Verify and monitor", description: "We re-test every fix, publish an accessibility statement, and add scans to your release process so regressions are caught before they go live.", meta: "Ongoing" },
  ] satisfies Feature[],
  checks: [
    { title: "Keyboard and focus", description: "Every control reachable and usable without a mouse, in a logical order, with a visible focus indicator that is never hidden.", icon: "workflow" },
    { title: "Screen readers", description: "Names, roles, states, headings, landmarks and live updates checked with NVDA, JAWS, VoiceOver and TalkBack.", icon: "message-square" },
    { title: "Colour and contrast", description: "Text, icons and focus indicators against WCAG ratios in every theme and state, fixed at the design-token level.", icon: "sparkles" },
    { title: "Zoom and reflow", description: "Content at 200% and 400% zoom and at 320 px wide, with no loss of content or two-way scrolling.", icon: "smartphone" },
    { title: "Motion and timing", description: "Pause controls for moving content, reduced-motion support and no time limits users cannot extend.", icon: "gauge" },
    { title: "Forms and errors", description: "Labels, instructions, error identification and suggestions, and accessible authentication.", icon: "file-check" },
    { title: "Media and documents", description: "Captions, transcripts and audio description for video; tagged, readable PDFs.", icon: "layers" },
    { title: "Structure and language", description: "Page titles, heading outline, landmarks, language of page and parts, and consistent navigation.", icon: "search" },
  ] satisfies Feature[],
  noOverlays: {
    title: "No overlays. Ever.",
    body: [
      "Accessibility overlays are scripts that promise compliance through a toolbar or automatic fixes. They do not change the underlying code, they often conflict with the screen readers and settings people already use, and overlay vendors have faced regulatory action for overstating what they do.",
      "We fix the source: markup, components, design tokens and content. That is the only approach that holds up in a manual test, and the only one we will sign our name to.",
    ],
    points: [
      { title: "Fix the code, not the symptom", description: "Changes live in your repository and survive redesigns." },
      { title: "Work with assistive technology", description: "No injected widgets fighting the user's own screen reader or zoom." },
      { title: "Evidence you can show", description: "An issue log mapped to WCAG, a re-test record and an honest statement." },
    ] satisfies Feature[],
  },
  deliverables: [
    { title: "Audit report", description: "Every issue mapped to a WCAG criterion, with location, impact, a code-level fix and its status.", icon: "file-check" },
    { title: "Remediation pull requests", description: "Fixes in your codebase, reviewed and tested, shared components first.", icon: "code" },
    { title: "Conformance report", description: "An Accessibility Conformance Report in the VPAT format for procurement, written from the test results.", icon: "shield" },
    { title: "Accessibility statement", description: "A plain-English statement of what conforms, known exceptions and how to get help.", icon: "message-square" },
    { title: "Release checks", description: "Automated scans of every page before each release, with failures blocking the deploy.", icon: "refresh-cw" },
    { title: "Editor training", description: "Short guides for content teams: headings, link text, alt text, PDFs and video captions in your CMS.", icon: "users" },
  ] satisfies Feature[],
  standards: [
    { title: "WCAG 2.1 and 2.2 AA", description: "The benchmark most laws and procurement teams point to." },
    { title: "US: ADA, Section 508 and Section 504", description: "Federal agencies, state and local government, and organisations funded by federal health programmes increasingly cite WCAG 2.1 AA." },
    { title: "EU: European Accessibility Act, EN 301 549", description: "Products and services sold in the EU, and public-sector sites." },
    { title: "UK and Canada", description: "UK public-sector accessibility regulations; AODA in Ontario and the Accessible Canada Act." },
  ] satisfies Feature[],
  faqs: [
    { question: "How long does an audit take?", answer: "A marketing site of up to 100 page types usually takes two weeks to audit and two to four weeks to fix, depending on how much is shared across templates. Apps with complex forms or data tables take longer; we scope it in the first call." },
    { question: "Do you only report, or do you fix things too?", answer: "Both. Most clients want the fixes, so we deliver them as pull requests in their codebase and re-test each one. If your own team prefers to fix, we hand over the issue log with code-level guidance and re-test their changes." },
    { question: "Will you give us a certificate?", answer: "There is no official WCAG certificate. We give you an evidence-based audit report, a conformance report in the VPAT format and a re-test record, which is what procurement and legal teams ask for." },
    { question: "Can you test with real screen readers?", answer: "Yes. Manual testing covers NVDA and JAWS on Windows, VoiceOver on macOS and iOS, and TalkBack on Android, alongside keyboard-only and zoom testing." },
    { question: "Do you work on WordPress and headless CMS sites?", answer: "Yes. We fix themes and blocks in WordPress and components in headless front ends, and we set up editor guidance so new content stays accessible." },
  ] satisfies Faq[],
};

export const statement = {
  meta: {
    title: "Accessibility Statement",
    description: "How accessible vaug.in is, how we test it, the known exceptions, and how to get help if something does not work for you.",
  },
  updated: "22 November 2026",
  sections: [
    {
      heading: "Our commitment",
      body: [
        "We want everyone to be able to use vaug.in, including people who use a keyboard, a screen reader, magnification, voice control or reduced motion. We design and build to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.",
      ],
    },
    {
      heading: "Conformance status",
      body: [
        "We believe vaug.in conforms to WCAG 2.2 Level AA, with the one exception described below. This is based on our own evaluation; it is not a third-party certification.",
        "On 22 November 2026 we tested every page in the sitemap (81 pages) in three views: light theme and dark theme at 1280 px, and phone width at 390 px. We used axe-core 4.13 with the WCAG 2.0, 2.1 and 2.2 A and AA rules, and tested by hand with a keyboard and by reviewing names, roles and states in the accessibility tree.",
      ],
    },
    {
      heading: "What we fixed",
      body: [
        "The audit found contrast, target-size, landmark, heading, focus-order and motion issues. We fixed them in the code, not with an overlay. The full issue log is published as our sample report on the Accessibility audits page.",
      ],
    },
    {
      heading: "Features that help",
      body: [
        "A skip link to the main content; keyboard-operable menus that follow the disclosure pattern; a visible focus indicator on every control; a \"Pause animations\" button that stops all looping motion and remembers your choice; support for your device's reduce-motion setting; a light and an all-dark theme; and product screens that open in a viewer you can zoom, pan and navigate with the keyboard.",
      ],
    },
    {
      heading: "Known exception",
      body: [
        "Case studies show drawn product screens: pictures of dashboards and apps. The small interface text inside them is part of the picture, so we treat it as text in an image. Each screen has a written caption that describes it, is hidden from screen readers apart from that caption, and opens in a viewer where it can be enlarged. If you need the details of any screen in another format, email us and we will send them.",
      ],
    },
    {
      heading: "No overlays",
      body: [
        "We do not use accessibility overlays or toolbars. Fixes are made in the site's code and design tokens.",
      ],
    },
    {
      heading: "Feedback and help",
      body: [
        "If anything on this site is hard to use, or you need information in a different format, email hello@vaug.in with the page address and what happened. We aim to reply within two business days.",
      ],
    },
    {
      heading: "Technical details",
      body: [
        "vaug.in is built with HTML, CSS and JavaScript (Next.js and React) and uses WAI-ARIA where native HTML is not enough. It is tested in current Chrome on desktop and with phone emulation. We re-scan every page before each release and repeat a manual keyboard review monthly.",
      ],
    },
  ],
};
