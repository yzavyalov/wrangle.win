<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  layout: (h, page) => {
    return h(BaseLayout, () => [page]);
  },
};
</script>


<script setup>
import { Head } from "@inertiajs/vue3";
import PageWrapperText from "@/components/PageWrapperText.vue";

const pageTitle = "Rules of the Platform";
const lastUpdated = "Last Updated: 07.05.2025";
const pageText = `
<div>
  <ul>
    <li>This platform is designed for organizing and managing online disputes and bets (hereafter referred to as the "Service").</li>
    <li>A user of the Service must be a legal adult with full legal capacity and sound mental health.</li>
    <li>By participating in any dispute, the user confirms they meet the criteria outlined in point 2.</li>
    <li>Any user may act as a dispute creator, a participant placing a bet, or both.</li>
    <li>Each dispute must include a title, outcome options, and between one (minimum) and three links to publicly accessible sources where the results will be published at the specified time.</li>
    <li>Every dispute must also include a specific date and time when the dispute will be concluded.</li>
    <li>The Service displays the number of bets placed on each outcome and the current return rate for each monetary unit wagered.</li>
    <li>Once created, all disputes are subject to moderation.</li>
    <li>The Service reserves the right to reject any dispute without explanation.</li>
    <li>The Service may suspend or cancel any dispute at its discretion. If a dispute is canceled, all bets are refunded to the users’ balances, and the dispute creator forfeits their reward.</li>
    <li>The Service charges a 15% fee on each bet as a service commission.</li>
    <li>The dispute creator receives 5% of the total amount wagered on their dispute.</li>
    <li>Bets must be in whole monetary units (no fractional amounts).</li>
    <li>The minimum bet amount is 1 monetary unit.</li>
    <li>There is no maximum bet set by the Service, though it may be limited by the laws of the user’s jurisdiction.</li>
    <li>The maximum bet is also limited by the user’s available balance.</li>
    <li>After the specified end date and time, the Service’s moderators will determine the winning outcome based on the sources provided in the dispute.</li>
    <li>Once a winning outcome is confirmed, the Service distributes winnings proportionally among users who placed bets on that outcome.</li>
    <li>Winnings are calculated using the following formula: (Total amount of losing bets – 15% Service fee) / Total amount wagered on the winning outcome.</li>
    <li>Users can deposit and withdraw funds using the methods listed on the website. Payment method fees are displayed on the respective page and are charged separately from the Service’s commission.</li>
    <li>The Service reserves the right to block a user. In this case, the user will be unable to deposit, withdraw, create disputes, or place bets.</li>
    <li>A user may appeal their account block by emailing block@wrangle.win.</li>
  </ul>


  <p style="margin-top: 20px;"><b>Contact</b></p>
  <p style="margin-bottom: 20px;">For questions or concerns, contact us:</p>
  <p style="margin: 0;">Nikita and Ko</p>
  <p>Ontario, Canada</p>
  <p><a href="mailto:support@wrangle.win" style="color: #0066cc;">support@wrangle.win</a></p>
</div>
`;
</script>

<template>
  <Head :title="pageTitle" />

  <PageWrapperText
    :title="pageTitle"
    :last-updated="lastUpdated"
    :text="pageText"
  />
</template>

<style scoped lang='scss'>

</style>
