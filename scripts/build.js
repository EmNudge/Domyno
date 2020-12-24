const fs = require("fs-extra");
const path = require("path");
const cp = require("child_process");
const execa = require("execa");
const { Extractor, ExtractorConfig } = require("@microsoft/api-extractor");

build();

async function build() {
  const env = "production";

  if (await fs.exists("types")) {
    await fs.remove("types");
  }

  await execa("rollup", ["-c", "--environment", `NODE_ENV:${env}`], {
    stdio: "inherit",
  });

    const config = ExtractorConfig.loadFileAndPrepare(
      path.resolve("api-extractor.json")
    );


    const result = Extractor.invoke(config, {
      localBuild: true,
      showVerboseMessages: true,
    });

    if (result.succeeded) {
      const typesDir = path.resolve("types");
      if (await fs.exists("types")) {
        const dtsPath = path.resolve("./foo");

        const existing = await fs.readFile(dtsPath, "utf8");
        const typeFiles = await fs.readdir(typesDir);
        const toAdd = await Promise.all(
          typeFiles.map((file) =>
            fs.readFile(path.resolve(typesDir, file), "utf8")
          )
        );
        await fs.writeFile(dtsPath, existing + "\n" + toAdd.join("\n"));
      }
      console.log("Extractor Worked");
  }
}
