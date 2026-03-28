// type Operation = "add" | "subtract" | "multiply" | "divide";
// function calculate(a: number, b: number, operation: Operation): string | number {
//      switch(operation) {
//           case "add":
//                return a + b;
//           case "subtract":
//                return a- b;
//           case "multiply":
//                return a * b;
//           case "divide":
//                if (b == 0) {
//                     return "Cannot divide by zero"
//                }
//                return a / b;
//      }
// }
// console.log(calculate(10, 5, "add"));       // 15
// console.log(calculate(10, 5, "subtract"));  // 5
// console.log(calculate(10, 5, "multiply"));  // 50
// console.log(calculate(10, 0, "divide"));    // Cannot divide by zero
// console.log(calculate(10, 5, "divide"));    // 2

// import fs from "fs";
// import { dataType } from "./types/dataType";
// const data: dataType = JSON.parse(fs.readFileSync("./data.json", 'utf-8'));
// console.log(`${data.name} is learning ${data.lang}`)

// import fs from "fs/promises";

// async function main() {
//   const datas: string[] = ["Hello", "World", "Node.js"];
//   await fs.mkdir("files", { recursive: true });
//   await Promise.all(
//     datas.map((data, i) => fs.writeFile(`files/file-${i + 1}`, data)),
//   );

//   const files: string[] = await fs.readdir("files");
//   const fileData: string[] = await Promise.all(files.map((file) => fs.readFile(`files/${file}`, 'utf-8')));
//   const merged = fileData.join(" ");
//   await fs.writeFile("merged.txt", merged);
// }

// main();

// import fs from "fs";

// async function main() {
//   const args: string[] = process.argv.slice(2);
//   const files: string[] = await fs.promises.readdir(args[0]);
//   const results: {file: string, content: string}[] = await Promise.all(
//     files.map(async (file) => {
//       const content = await fs.promises.readFile(`${args[0]}/${file}`, "utf-8");
//       return { file, content };
//     }),
//   );
//   const result = results.filter((data) => data.content.includes(args[1]));
//   console.log("result ", result);
// }

// main();

// import { CustomLogger } from "./Logger/CustomLogger";

// function main() {
//   const logger = new CustomLogger();

//   logger.on("info", (msg) => console.log(`[INFO] ${msg}`));
//   logger.on("error", (msg) => console.log(`[ERROR] ${msg}`));
//   logger.on("warn", (msg) => console.log(`[WARN] ${msg}`));

//   logger.info("Server started");
//   logger.error("Database connection failed");
//   logger.warn("Memory usage high");
// }

// main()

// import { createReadStream } from "fs";
// import { createInterface } from "readline";

// function main() {
//   let count = 0;
//   const rl = createInterface({
//     input: createReadStream("large.txt"),
//   });
//   rl.on("line", (line) => {
//     count += 1;
//   });
//   rl.on("close", () => {
//      console.log("Total count ", count);
//   });
// }

// main();

// import { createReadStream, createWriteStream } from "fs";
// import { Transform } from "stream";

// async function main() {
//   const upperTransForm = new Transform({
//     transform(chunk, encoding, callback) {
//       const upperCase = chunk.toString().toUpperCase();
//       this.push(upperCase);
//       callback();
//     },
//   });
//   createReadStream("large.txt")
//     .pipe(upperTransForm)
//     .pipe(createWriteStream("upper.txt"));
// }
// main();

// import http from "http";

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   const method = req.method;

//   if (method == "POST" && url == "/users") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const user = JSON.parse(body);
//       res.writeHead(200, { "Content-type": "text/plain" });
//       res.end(`User ${user.name} created`);
//     });
//     return;
//   }
//   if (url == "/") {
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end("Hello");
//     return;
//   }
//   if (url == "/users") {
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(JSON.stringify([{ id: 1, name: "Vignesh" }]));
//     return;
//   }
//   res.writeHead(400, { "Content-type": "text/plain" });
//   res.end("Not found");
// });

// server.listen(3001, "localhost", () => {
//   console.log("server is running");
// });

// import { Router } from "./route/Router";

// const router = new Router();

// router.get("/", (req, res) => {
//   res.end("Home");
// });

// router.post("/users", (req, res) => {
//   res.end("User created");
// });

// router.get("/users/:id", (req, res) => {
//   res.end(`User ID: ${req.params.id}`);
// });

// router.listen(3000);

// import { fork } from "child_process";
// import { createInterface } from "readline";
// const child = fork("./src/child/ChildProcess.ts");

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter N ", (N) => {
//   rl.close();
//   child.send({ number: parseInt(N) }); // ← send N to child

//   child.on("message", (result) => {
//     console.log(`Sum of 1 to ${N}: ${result}`);
//     child.disconnect();
//   });
// });

// import { Worker } from "worker_threads";
// import { createInterface } from "readline/promises";

// async function main() {
//   const rl = createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const N = await rl.question("Enter N ");

//   const worker = new Worker("./src/worker/Worker.ts", {
//     execArgv: ["--require", "ts-node/register"],
//   });

//   worker.postMessage(N);
//   worker.on("message", (data) => {
//     console.log("Woker result ", data);
//     worker.terminate();
//     rl.close();
//   });
// }

// main();
