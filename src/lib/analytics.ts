type FunnelEventValue = string | number | boolean | null | undefined;
type FunnelEventPayload = Record<string, FunnelEventValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackFunnelEvent(
  eventName: string,
  payload: FunnelEventPayload = {},
) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    ...payload,
    page_path: window.location.pathname,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }
}
