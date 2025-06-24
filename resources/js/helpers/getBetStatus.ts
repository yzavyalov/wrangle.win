export const getBetStatus = (status: number) => {
  switch (status) {
    case 1:
      return "moderation";
    case 2:
      return "active";
    case 3:
      return "finished";
    case 4:
      return "cancelled";
    case 5:
      return "unknown";

    default:
      return "unknown";
  }
};
