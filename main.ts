// main.ts
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import freshwind from "freshwind/plugin.ts";
import config, { configURL } from "./twind.config.ts";

await start(manifest, {
  plugins: [freshwind(config, configURL)],
});
