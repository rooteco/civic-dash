import { authenticator } from "~/models/auth.server";

export const action = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/dashboard" });
};
