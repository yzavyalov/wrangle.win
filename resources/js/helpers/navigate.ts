import { router } from "@inertiajs/vue3";

export const navigateTo = (url) => {
  console.log(url, "url - goToPage");
  if (!url) return console.warn("No url provided");

  router.visit(url);
}
