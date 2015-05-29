//
//  NSURLConnection+RACSupport.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2013-10-01.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACSignal;

@interface NSURLConnection (RACSupport)

// Lazily loads data for the given request in the background.
//
// request - The URL request to load. This must not be nil.
//
// Returns a signal which will begin loading the request upon each subscription,
// then send a `RACTuple` of the received `NSURLResponse` and downloaded
// `NSData`, and complete on a background thread. If any errors occur, the
// returned signal will error out.
+ (RACSignal *)rac_sendAsynchronousRequest:(NSURLRequest *)request;

@end
