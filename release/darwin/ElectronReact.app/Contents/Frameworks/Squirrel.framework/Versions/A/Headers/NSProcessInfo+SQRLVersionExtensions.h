//
//  NSProcessInfo+SQRLVersionExtensions.h
//  Squirrel
//
//  Created by Justin Spahr-Summers on 2013-09-16.
//  Copyright (c) 2013 GitHub. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSProcessInfo (SQRLVersionExtensions)

// The short version string (e.g. `10.8.5`) for the running version of OS X.
@property (nonatomic, copy, readonly) NSString *sqrl_operatingSystemShortVersionString;

@end
