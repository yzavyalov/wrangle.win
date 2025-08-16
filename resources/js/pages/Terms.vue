<script setup>
import { Head } from "@inertiajs/vue3";
import PageWrapperText from "@/components/PageWrapperText.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import SeoMeta from "@/components/SeoMeta.vue";

defineOptions({
  name: "Terms",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

const pageTitle = "Terms of Service";
const lastUpdated = "Last Updated: 07.05.2025";
const pageText = `
<div style="color: #000">
  <p><b>Privacy Policy</b></p>
  <p>At WRANGLE.WIN, we respect your privacy and are committed to protecting your personal data.
  This Privacy Policy explains how we collect, use, and safeguard your information.</p>

  <p><b>1. Information We Collect</b></p>
  <p>We collect the following types of information:</p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Account information (email address, username, wallet data)</li>
    <li>Transaction and bet history</li>
    <li>Technical data (IP address, browser type, device info)</li>
  </ul>

  <p><b>2. How We Use Your Information</b></p>
  <p>Your data is used to:</p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Provide access to the platform and its features</li>
    <li>Process bets, deposits, and withdrawals</li>
    <li>Moderate disputes</li>
    <li>Improve and secure our platform</li>
    <li>Comply with legal and regulatory obligations</li>
  </ul>

  <p><b>3. Data Sharing</b></p>
  <p>We do not sell your personal data. We may share data with:</p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Payment processors for transaction handling</li>
    <li>Law enforcement or regulators when legally required</li>
    <li>Moderators for dispute verification</li>
  </ul>

  <p><b>4. Data Security</b></p>
  <p>We implement reasonable technical and organizational measures to protect your personal information from loss,
  theft, and unauthorized access.</p>

  <p><b>5. Your Rights</b></p>
  <p>You have the right to:</p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Access your personal data</li>
    <li>Correct inaccurate data</li>
    <li>Request deletion of your data (subject to legal limitations)</li>
  </ul>
  <p>For requests, email us at <a href="mailto:operator@wrangle.win">operator@wrangle.win</a>.</p>

  <p><b>6. Cookies and Tracking</b></p>
  <p>We may use cookies to enhance your user experience and track usage analytics. You can manage cookie settings through your browser.</p>

  <p><b>7. Third-Party Links</b></p>
  <p>Our platform may contain links to third-party sites. We are not responsible for their privacy practices.</p>

  <p><b>8. Changes to This Policy</b></p>
  <p>We may update this Privacy Policy periodically. Continued use of the Service after changes implies acceptance.</p>

  <p style="margin-top: 20px;"><b>Contact</b></p>
  <p style="margin-bottom: 20px;">For questions or concerns, contact us:</p>
  <p style="margin: 0;">DADORI CAPITAL INC.</p>
  <p>British Virgin Islands</p>
  <p><a href="mailto:wrangle@wrangle.win" style="color: #0066cc;">wrangle@wrangle.win</a></p>
</div>
`;
</script>

<template>
  <SeoMeta
    :title="pageTitle"
    :description="pageText"
  />

  <PageWrapperText
    :title="pageTitle"
    :last-updated="lastUpdated"
    :text="pageText"
  />
</template>

<style scoped lang='scss'>

</style>
