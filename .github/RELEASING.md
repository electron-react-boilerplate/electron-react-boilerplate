# Releases

Ordinary pushes and pull requests run lint, type checking, and unit tests before
packaging and development smoke tests on macOS, Windows, and Linux.

To release, update `release/app/package.json` to the intended version and push a
matching `v<version>` tag. The publishing workflow verifies the tag, calls the same
validation workflow for that exact commit, and only then builds and publishes
assets on native runners. Failed validation prevents publishing on all platforms.

Configure `CSC_LINK`, `CSC_KEY_PASSWORD`, `APPLE_ID`, `APPLE_ID_PASS`, and
`APPLE_TEAM_ID` for signed/notarized releases. `APPLE_ID_PASS` is passed using the
name expected by the existing notarization hook. Update the repository-owner
condition and electron-builder publisher settings when using this boilerplate
in another repository.

CI retains unsigned test packages and available diagnostics for seven days.
Publishing is deliberately not triggered on every push to main.
