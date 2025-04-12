export const baseUrl = "https://api.copper.com/developer_api/v1/";

const apiToken: string = '';
const apiEmail = "mschoessling@irishangels.com";
export const headers: HeadersInit = {
  "X-PW-AccessToken": apiToken,
  "X-PW-Application": "developer_api",
  "X-PW-UserEmail": apiEmail,
  "Content-Type": "application/json"
};