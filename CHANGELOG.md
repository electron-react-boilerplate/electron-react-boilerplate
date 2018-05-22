### Version 0.4.1

#### Fixes
- Fix download and Save To progess in production builds
- (for now) Sort bundles by name, so bundles don't unexpectedly change order when reopening Nathanael

### Version 0.4.0

#### Features
- Download from DBL
- Enable Click "Save To" folder
- Show Download and "Save To" Progress
- Parse history to determine if downloaded
- Enable Click Info (to open DBL entry in browser)
- Disable unused/invalid tray menu buttons

#### Fixes
- clear search on location change. feed searchInput from prop
- fix circular progress to happen on loading

### Version 0.3.0

#### Features

- Add highlighting to buttons!
- By default load bundles from dbl dot local api 
- Can access `File > Bundles (Demo)` for demo list  (w/o login)
- Changed "Completed" status to "Downloaded" or "Uploaded"
- Uses bundle history to determine status

#### Fixes
- Fixed operating system paths in `Help > Open Log`
- Styled top-right icons with more padding
- Styled wider login user/password
- Styled login loading animation margin
- Fix loading dev tools/menu on `did-finish-load` so dev tools do not cover up UI. 
- Fix context menu so `Inspect element` doesn't keep popping up by only loading dev tools first time menu is installed.

# 0.2.1

#### Features

- Added Open Log to the Help menu

#### Fixes

- Fix status column
- Fix highlighting to have zero padding (+ bolded)

# 0.2.0 

#### Features

- Search/Filter bundles and highlight matches

# 0.1.0 

#### Features

- File > Login
- File > Bundles (Demo) 
- Auto-update