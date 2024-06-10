import dotenv from "dotenv";

import { FacebookPageApi as IFacebookPageApi } from "../src/FacebookPageApi";
import { facebookPageApi } from "../src";

dotenv.config({ path: ".env.development" });
const appId = process.env.APP_ID!;
const appSecret = process.env.APP_SECRET!;
const compteAccessToken = process.env.FB_ACCESS_TOKEN!;

describe("Test Facebook page api", () => {
  let fbPageApi: IFacebookPageApi;

  beforeAll(() => {
    fbPageApi = facebookPageApi(appId, appSecret);
  });

  test("Should get user info", async () => {
    const mockUserInfo = {
      id: "1017131143339271",
      name: "Youssef Youssef",
    };

    const userInfo = await fbPageApi.userInfo(compteAccessToken, "id, name");

    expect(userInfo).toHaveProperty("id");
    expect(userInfo).toHaveProperty("name");
    expect(userInfo).toEqual(mockUserInfo);
  });

  test("Should get the compte pages", async () => {
    const fbPages = await fbPageApi.accountPages(compteAccessToken);

    expect(Array.isArray(fbPages)).toBe(true);
    fbPages.forEach((page: any) => {
      expect(page).toHaveProperty("name");
      expect(page).toHaveProperty("access_token");
    });
  });
});
