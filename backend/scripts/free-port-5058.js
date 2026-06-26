const { execSync } = require("child_process");

const PORT = process.env.PORT || "5058";

const killPortOnWindows = () => {
  try {
    const output = execSync(`netstat -ano | findstr :${PORT}`, {
      encoding: "utf8",
    });

    const pids = new Set();
    for (const line of output.split("\n")) {
      if (!line.includes("LISTENING")) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== "0") pids.add(pid);
    }

    if (!pids.size) {
      console.log(`Port ${PORT} is free.`);
      return;
    }

    for (const pid of pids) {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "inherit" });
      console.log(`Stopped process ${pid} on port ${PORT}`);
    }
  } catch (error) {
    console.log(`Port ${PORT} is free.`);
  }
};

killPortOnWindows();
