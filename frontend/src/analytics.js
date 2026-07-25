export const trackEvent = (eventName, category, label) => {
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    event_category: category,
    event_label: label,
  });
};