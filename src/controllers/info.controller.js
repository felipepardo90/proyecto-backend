import { cpus } from "os";
const cpu = cpus();

const renderServerInfo = (req, res) => {
  res.status(200).render("info", {
      "Input Arguments": process.argv.slice(2),
      OS: process.platform,
      "Node Version": process.version,
      "Memory Usage": process.memoryUsage().rss,
      "Execution Path": process.execPath,
      "Process ID": process.pid,
      "Current Working Directory": process.cwd(),
      "active processors": cpu.length,
    
  });
};

export default renderServerInfo;
