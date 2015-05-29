//
//  NSString+RACSupport.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 5/11/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACScheduler;
@class RACSignal;

@interface NSString (RACSupport)

// Reads in the contents of the file using +[NSString stringWithContentsOfURL:usedEncoding:error:].
// Note that encoding won't be valid until the signal completes successfully.
//
// scheduler - cannot be nil.
+ (RACSignal *)rac_readContentsOfURL:(NSURL *)URL usedEncoding:(NSStringEncoding *)encoding scheduler:(RACScheduler *)scheduler;

@end
