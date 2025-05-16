/**
 * Task scheduler utility for batching heavy operations to improve performance
 * This helps optimize First Input Delay (FID) by breaking down heavy tasks
 */

/**
 * Process a batch of items with a specified operation
 * @param items Array of items to process
 * @param operation Function to apply to each item
 * @param batchSize Number of items to process in each batch
 * @param delay Delay between batches in milliseconds
 * @returns Promise that resolves with the processed items
 */
export const processBatch = async <T, R>(
  items: T[],
  operation: (item: T) => R,
  batchSize: number = 5,
  delay: number = 0
): Promise<R[]> => {
  return new Promise((resolve) => {
    const result: R[] = [];
    const totalItems = items.length;
    let processedCount = 0;

    const processBatchWithDelay = (startIndex: number): void => {
      // Use requestIdleCallback if available, otherwise use setTimeout
      const scheduler = 
        window.requestIdleCallback || 
        ((callback: () => void) => setTimeout(callback, 1));
      
      scheduler(() => {
        const endIndex = Math.min(startIndex + batchSize, totalItems);
        
        for (let i = startIndex; i < endIndex; i++) {
          result[i] = operation(items[i]);
          processedCount++;
        }
        
        if (processedCount < totalItems) {
          // If there are more items to process, schedule the next batch
          setTimeout(() => {
            processBatchWithDelay(endIndex);
          }, delay);
        } else {
          // All items processed, resolve the promise
          resolve(result);
        }
      });
    };

    // Start processing the first batch
    processBatchWithDelay(0);
  });
};

/**
 * Schedule a task to run during browser idle time
 * @param task Function to execute during idle time
 * @param timeout Maximum time to wait before forcing execution
 */
export const scheduleIdleTask = (
  task: () => void, 
  timeout: number = 2000
): void => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(task, { timeout });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(task, 1);
  }
};

/**
 * Break down a heavy computation into smaller chunks to avoid blocking the main thread
 * @param items Array of items to process
 * @param processItem Function to process each item
 * @param chunkSize Number of items to process in each chunk
 * @param onProgress Callback for progress updates
 * @param onComplete Callback when all processing is complete
 */
export const processInChunks = <T, R>(
  items: T[],
  processItem: (item: T) => R,
  chunkSize: number = 3,
  onProgress?: (processed: number, total: number) => void,
  onComplete?: (results: R[]) => void
): void => {
  const results: R[] = [];
  const total = items.length;
  let processed = 0;

  const processChunk = (startIndex: number): void => {
    const endIndex = Math.min(startIndex + chunkSize, total);
    
    for (let i = startIndex; i < endIndex; i++) {
      results[i] = processItem(items[i]);
      processed++;
    }
    
    if (onProgress) {
      onProgress(processed, total);
    }
    
    if (processed < total) {
      // Schedule next chunk
      setTimeout(() => {
        processChunk(endIndex);
      }, 0);
    } else if (onComplete) {
      // All done
      onComplete(results);
    }
  };
  
  // Start processing the first chunk
  processChunk(0);
};
