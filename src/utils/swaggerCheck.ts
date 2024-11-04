import find from "find-process";

/**
 * Checks if a given port has a Swagger endpoint running.
 */
async function isSwaggerRunningOnPort(port: number): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:${port}/api/docs`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Scans a range of ports to find the one running Swagger.
 */
async function findSwaggerPortInRange(
  startPort: number,
  endPort: number
): Promise<number | null> {
  for (let port = startPort; port <= endPort; port++) {
    const isRunning = await isSwaggerRunningOnPort(port);
    if (isRunning) {
      return port;
    }
  }
  return null;
}

/**
 * Gets running Node.js apps that match the base path and dynamically detects the port.
 */
export async function getRunningNodeApps(basePath: string) {
  try {
    const processes = await find("name", "node");

    // Filter processes that contain the base path in the command
    const relevantProcesses = processes.filter((proc) =>
      proc.cmd.includes(basePath)
    );

    // Define a range of ports to scan
    const startPort = 8000;
    const endPort = 9000;

    // Check each filtered process for a running Swagger endpoint within the port range
    for (const proc of relevantProcesses) {
      const detectedPort = await findSwaggerPortInRange(startPort, endPort);
      if (detectedPort !== null) {
        return [{ port: detectedPort, pid: proc.pid, cmd: proc.cmd }]; // Return process with detected port
      }
    }

    return []; // Return empty array if no matching process with running Swagger is found
  } catch (error) {
    console.error("Error finding Node.js processes:", error);
    return [];
  }
}
