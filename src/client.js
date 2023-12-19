import createClient from "@sanity/client";

const client = createClient({
  projectId: "inhaluy4",
  dataset: "production",
  token: import.meta.env.VITE_SANITY_KEY,
  apiVersion: "v2022-03-07",
  useCdn: true,
});

export default client;
