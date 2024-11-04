import { AppMetadata } from "../types/appMetadata";

export function prepareMetadata(basePath: string, port: number): AppMetadata {
  return {
    basePath,
    port,
    swaggerUrl: `http://localhost:${port}/api/docs`,
  };
}

export async function sendMetadataToTauri(metadata: AppMetadata) {
  try {
    // const response = await fetch(
    //   "http://localhost:YOUR_TAURI_APP_PORT/your-endpoint",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(metadata),
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Failed to send metadata");
    // }
    console.log("METADATA can be sent to tauri app ===> ", metadata);
  } catch (error) {
    console.error("Error sending metadata:", error);
  }
}
