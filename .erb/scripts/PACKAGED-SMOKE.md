# Packaged startup verification

Run `npm run package:smoke`, then `npm run test:packaged`. On headless Linux,
use `xvfb-run --auto-servernum npm run test:packaged`.

The check launches the real unpacked executable using Playwright's experimental
Electron API, verifies `app.isPackaged`, the file URL, image, links, preload IPC,
renderer errors, and clean app shutdown. No dev server is involved.

Set `SMOKE_EXECUTABLE` to an explicit executable path when using a custom product
name/output layout or when testing a specific architecture. Screenshots and process
logs are written to `release/build/smoke` and uploaded by CI even on failure.
This complements the development smoke test; it does not exercise installer UI,
code signing, notarization, or update delivery.
