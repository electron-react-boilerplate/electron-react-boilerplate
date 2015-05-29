//
//  SQRLDownloadedUpdate.h
//  Squirrel
//
//  Created by Justin Spahr-Summers on 2013-09-25.
//  Copyright (c) 2013 GitHub. All rights reserved.
//

#import <Mantle/Mantle.h>

@class SQRLUpdate;

// A SQRLUpdate that has been successfully downloaded to disk.
@interface SQRLDownloadedUpdate : MTLModel

// The application bundle representing the downloaded and unarchived update.
@property (nonatomic, strong, readonly) NSBundle *bundle;

// The update information sent by the server.
//
// This may be a `SQRLUpdate` subclass if `SQRLUpdater.updateClass` was changed.
@property (nonatomic, copy, readonly) SQRLUpdate *update;

// Initializes the receiver with update metadata and the downloaded and
// unarchived bundle.
//
// update - The update information sent by the server. This must not be nil.
// bundle - The application bundle representing the update. This must not be nil.
- (id)initWithUpdate:(SQRLUpdate *)update bundle:(NSBundle *)bundle;

@end
