import { PageInsightsDatePreset, PageInsightsPeriod } from "./enums";
import { FacebookPageApi as FbPageApi } from "./FacebookPageApi";

const facebookPageApi = (
  appId: string,
  appSecret: string,
  appVersion?: string
) => {
  return new FbPageApi(appId, appSecret, appVersion);
};

export { facebookPageApi, PageInsightsDatePreset, PageInsightsPeriod };
