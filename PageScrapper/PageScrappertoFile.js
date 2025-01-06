import https from "https";
import fs from "fs";

const options = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/ChatGPT",
  method: "GET",
};

const req = https.request(options, (res) => {
  let data = "";
  res.setEncoding("utf-8");
  res.on("data", (chunk) => {
    console.log(chunk.length);

    data += chunk;
  });

  res.on("end", () => {
    fs.writeFile("ChatGPT.html", data, (err) => {
      if (err) {
        throw err;
      }
      console.log("File written successfully");
    });
  });
});

req.on("error", (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
