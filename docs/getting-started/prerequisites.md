# Prerequisites & API Access

Before you can use the `@vitabletech/gbp-sdk` to manage a Google Business Profile (GBP), you must complete Google's prerequisites and get approved for API access.

## Requesting API Access

In order to get access to the Google Business Profile APIs, you have to submit a formal request to Google. Here is the step-by-step guide:

1. **Get a Google Account:** Ensure you have a Google Account.
2. **Try out Business Profile:** Familiarize yourself with the Business Profile user interface before starting to code.
3. **Create a Google Cloud Project:** Go to the [Google Cloud Console](https://console.cloud.google.com/), click **Create project**, enter a name, and click **Create**.
4. **Create an Organization Account:** You must create an Organization account via the GBP help center.
5. **Meet the Requirements:**
   - Manage a Google Business Profile that is verified and active for **60+ days**. This can be your own office or belong to a client you manage.
   - Have a website representing the business listed on the GBP.
   - _Tip:_ Ensure the Business Profile is fully complete and up-to-date for a smooth review.
6. **Submit the Application:**
   - Go to the Google Cloud Console and find your **Project Number** on the project's Dashboard.
   - Submit your request using the GBP API contact form (Select 'Application for Basic API Access' from the drop-down menu).
   - Ensure you are using an email address that is listed as an owner/manager on the business's GBP.

> **Note on Checking Approval Status:** You can check if your project has been approved by viewing the quotas for the Business Profile APIs in the Google Cloud Console.
>
> - If your quota is **0 QPM** (Queries Per Minute), your project has not yet been approved.
> - If your quota is **300 QPM**, your project is approved.

For full details, visit the official [Prerequisites page](https://developers.google.com/my-business/content/prereqs).

---

## Trialing the SDK (OAuth Playground)

If you are waiting for API approval or just want to trial the SDK without going through the full setup, you can generate a token using the Google OAuth Playground.

1. Go to the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Input the scope `https://www.googleapis.com/auth/business.manage` and authorize the APIs.
3. Exchange the authorization code for an **access token** and **refresh token**.

> [!WARNING]
> Tokens generated via the OAuth Playground are restricted. You can use them to access basic business details (e.g., fetch accounts, fetch locations), but features like the **Reviews API will not work**. To fully utilize all endpoints, you must use a client ID from a fully approved GCP project.
