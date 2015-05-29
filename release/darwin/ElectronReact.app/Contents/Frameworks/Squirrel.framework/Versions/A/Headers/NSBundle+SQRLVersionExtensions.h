//
//  NSBundle+SQRLVersionExtensions.h
//  Squirrel
//
//  Created by Justin Spahr-Summers on 2013-09-25.
//  Copyright (c) 2013 GitHub. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSBundle (SQRLVersionExtensions)

// The value associated with the `CFBundleVersion` key in the receiver's
// Info.plist, or nil if the key is not present.
@property (nonatomic, copy, readonly) NSString *sqrl_bundleVersion;

@end
