// @flow

import fs from 'fs';

// Public: Download a file and store it on a file system using streaming with appropriate progress callback.
//
// * `sourceUrl`        Url to download from.
// * `targetFile`       File path to save to.
// * `progressCallback` Callback function that will be given a {ByteProgressCallback} object containing
//                      both bytesDone and percent.
// * `length`           Optional file length in bytes for cases where the server will not supply the
//                      Content-Length header but the value is known in advance. Without either the
//                      percentage on the callback can not be determined.
//
// Returns a {Promise} that will accept when complete.
export default async function download(
  sourceUrl: string,
  targetFile: string,
   progressCallback: ?ByteProgressCallback, 
   length: ?number
): Promise<void> {
  const request = new Request(sourceUrl, {
    headers: new Headers({'Content-Type': 'application/octet-stream'})
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw Error(`Unable to download, server returned ${response.status} ${response.statusText}`);
  }

  const body = response.body;
  if (body == null) {
    throw Error('No response body');
  }

  const finalLength = length || parseInt(response.headers.get('Content-Length') || '0', 10);
  const reader = body.getReader();
  const writer = fs.createWriteStream(targetFile);

  await streamWithProgress(finalLength, reader, writer, progressCallback);
  writer.end();
}

// Stream from a {ReadableStreamReader} to a {WriteStream} with progress callback.
//
// * `length`           File length in bytes.
// * `reader`           {ReadableStreamReader} to read from.
// * `targwriteretFile` {WriteStream} to write to.
// * `progressCallback` Callback function that will be given a {ByteProgressCallback} object containing
//                      both bytesDone and percent.
//
// Returns a {Promise} that will accept when complete.
async function streamWithProgress(
  length: number,
   reader: ReadableStreamReader,
   writer: fs.WriteStream,
   progressCallback: ?ByteProgressCallback
): Promise<void> {
  let bytesDone = 0;

  while (true) {
    const result = await reader.read();
    if (result.done) {
      if (progressCallback != null) {
        progressCallback(length, 100);
      }
      return;
    }

    const chunk = result.value;
    if (chunk == null) {
      throw Error('Empty chunk received during download');
    } else {
      writer.write(Buffer.from(chunk));
      if (progressCallback != null) {
        bytesDone += chunk.byteLength;
        const percent: ?number = length === 0 ? null : Math.floor(bytesDone / length * 100);
        progressCallback(bytesDone, percent);
       }
     }
   }
}

// Public: Progress callback function signature indicating the bytesDone and
// optional percentage when length is known.
export type ByteProgressCallback = (bytesDone: number, percent: ?number) => {};
