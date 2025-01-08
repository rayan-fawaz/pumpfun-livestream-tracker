import { handleNewLiveStream } from "./livestream-action.js";
import { pumpFunLiveSteamsQuery } from "./query.js";
import { LiveStreamResponse } from "./types";

// map to track addresses we have already seen
const seenAddresses: Map<string, number> = new Map();

export const startFetchingPumpFunLiveStreams = async () => {
  // we initialize seen addresses on server startup so we dont send messages for old livestreams
  await initializeSeenAddresses();

  // every 1 second we refetch the active livestreams
  setInterval(checkPumpFunLiveStreams, 1000);
};

export const cleanUpSeenAddresses = async () => {
  try {
    const activeLiveStreams = await pumpFunLiveSteamsQuery();
    const activeMints = new Set(activeLiveStreams.map((stream) => stream.mint));

    // we cross check the livestreams with the map and remove tokens that are no longer being livestreamed
    for (const mint of seenAddresses.keys()) {
      if (!activeMints.has(mint)) {
        console.log("Removing inactive live stream"); //TODO: remove this
        seenAddresses.delete(mint);
      }
    }

    console.log(
      `[${new Date().toISOString()}] Cleanup complete. Remaining active live streams: ${
        seenAddresses.size
      }`
    );
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error during cleanup:`, error);
  }
};

//helpers
const checkPumpFunLiveStreams = async () => {
  try {
    // we fetch liveStreams from pump.fun
    const liveStreams = await pumpFunLiveSteamsQuery();

    const currentTime = Date.now();

    // we check if we already seen these live streams before
    for (const item of liveStreams) {
      if (!seenAddresses.has(item.mint)) {
        // we have not seen this live stream before
        await handleNewLiveStream(item.mint);
      }

      // update or add to the map with the current time
      seenAddresses.set(item.mint, currentTime);
    }
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] error during API request:`,
      error
    );
  }
};

const initializeSeenAddresses = async () => {
  try {
    const data = await pumpFunLiveSteamsQuery();

    const currentTime = Date.now();
    data.forEach((item) => {
      seenAddresses.set(item.mint, currentTime);
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error initializing seen addresses:`,
      error
    );
  }
};
