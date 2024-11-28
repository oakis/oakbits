import { datadogRum, DefaultPrivacyLevel } from "@datadog/browser-rum";

console.log(process.env);

if (process.env.NEXT_PUBLIC_ENV !== "local") {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APPID as string,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_TOKEN as string,
    site: "datadoghq.eu",
    service: "oakbits",
    env: "prod",
    version: "0.1.0",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: DefaultPrivacyLevel.ALLOW,
  });
}

export default function DatadogInit() {
  return null;
}
