<script setup>
import { Head } from "@inertiajs/vue3";
import PageWrapperText from "@/components/PageWrapperText.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import SeoMeta from "@/components/SeoMeta.vue";

defineOptions({
  name: "PrivacyPolicy",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

const pageTitle = "Privacy Policy";
const lastUpdated = "Last Updated: 07.05.2025";
const pageText = `
<div style="color: #000">
  <p><b>Welcome to WRANGLE.WIN</b>, operated by Nikita and Ko, a company registered in Ontario, Canada.
  By accessing or using our platform, you agree to comply with and be bound by the following Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.</p>

  <p><b>1. Description of the Service</b></p>
  <p>WRANGLE.WIN is an online platform that allows users to create, join, and bet on disputes (hereafter "Service"). Users can act as dispute creators or participants placing bets, or both.</p>

  <p><b>2. Eligibility</b></p>
  <p>To use the Service, you must:</p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Be at least 18 years of age (or older, depending on your local laws),</li>
    <li>Have full legal capacity,</li>
    <li>Not be prohibited from participating in online betting by the laws of your jurisdiction.</li>
  </ul>
  <p>By using the Service, you confirm that you meet all eligibility requirements.</p>

  <p><b>3. Creating and Participating in Disputes</b></p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Each dispute must include a title, outcome options, and 1–3 external sources where the results will be published.</li>
    <li>The dispute must specify an end date and time.</li>
    <li>Once created, all disputes undergo moderation and may be rejected or removed without notice or explanation.</li>
    <li>The Service reserves the right to suspend or cancel any dispute at any time. In such cases, all bets will be refunded to users, and the creator will forfeit any earnings.</li>
  </ul>

  <p><b>4. Fees and Earnings</b></p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>A 15% commission is applied to the total bet pool of each dispute.</li>
    <li>The creator of a dispute earns 5% of the total bet amount.</li>
    <li>The minimum bet is 1 unit of currency. Bets must be in whole units.</li>
    <li>The maximum bet is not limited by the Service but may be restricted by user balance or local laws.</li>
  </ul>

  <p><b>5. Determining Winners</b></p>
  <p>After the dispute ends, moderators review the listed sources and determine the winning outcome. Winnings are then distributed proportionally among those who bet on the winning outcome, using this formula:<br>
  (Total amount of losing bets – 15% commission) / Total amount on the winning outcome</p>

  <p><b>6. Account and Payments</b></p>
  <ul style="padding-left: 20px; font-size: inherit; font-weight: 300; list-style-type: disc;">
    <li>Users can deposit and withdraw funds using available payment methods.</li>
    <li>Payment provider fees are charged separately and displayed on the payment methods page.</li>
    <li>The Service reserves the right to block users who violate these Terms. Blocked users cannot bet, create disputes, deposit, or withdraw funds.</li>
    <li>Users may appeal account suspensions by contacting block@wrangle.win.</li>
  </ul>

  <p><b>7. Limitation of Liability</b></p>
  <p>The Service is provided "as is." Nikita and Ko makes no warranties regarding the accuracy, reliability, or availability of the Service. Users engage with the platform at their own risk.</p>

  <p><b>8. Governing Law</b></p>
  <p>These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada.</p>

  <p style="margin-top: 20px;"><b>Contact</b></p>
  <p style="margin-bottom: 20px;">For questions or concerns, contact us:</p>
  <p style="margin: 0;">Nikita and Ko</p>
  <p>Ontario, Canada</p>
  <p><a href="mailto:support@wrangle.win" style="color: #0066cc;">support@wrangle.win</a></p>
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
