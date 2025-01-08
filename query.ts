import axios from "axios";
import { LiveStreamResponse } from "./types";

export const pumpFunLiveSteamsQuery = async (): Promise<LiveStreamResponse[]> => {
  const apiUrl = "https://frontend-api.pump.fun/coins/currently-live";
  const params = {
    offset: 0,
    limit: 50,
    sort: "currently_live",
    order: "DESC",
    includeNsfw: "false",
  };
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  };

  try {
    const response = await axios.get<LiveStreamResponse[]>(apiUrl, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching Pump.Fun live streams:`,
      error
    );
    throw error;
  }
};
