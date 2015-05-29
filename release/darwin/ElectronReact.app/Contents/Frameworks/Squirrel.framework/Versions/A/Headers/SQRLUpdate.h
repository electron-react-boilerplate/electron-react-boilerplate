//
//  SQRLUpdate.h
//  Squirrel
//
//  Created by Keith Duncan on 18/09/2013.
//  Copyright (c) 2013 GitHub. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Mantle/Mantle.h>

// An update parsed from a response to the `SQRLUpdater.updateRequest`.
//
// This can be subclassed, and `SQRLUpdater.updateClass` set, to preserve
// additional JSON data. Any subclasses must be immutable, and should inherit
// their superclass' property key and transformer behaviors.
@interface SQRLUpdate : MTLModel <MTLJSONSerializing>

// The release notes for the update.
@property (readonly, copy, nonatomic) NSString *releaseNotes;

// The release name for the update.
@property (readonly, copy, nonatomic) NSString *releaseName;

// The release date for the update.
@property (readonly, copy, nonatomic) NSDate *releaseDate;

// The URL to the update package that should be downloaded for installation.
@property (readonly, copy, nonatomic) NSURL *updateURL;

@end
