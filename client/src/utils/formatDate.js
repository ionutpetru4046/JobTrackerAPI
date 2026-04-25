export function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }