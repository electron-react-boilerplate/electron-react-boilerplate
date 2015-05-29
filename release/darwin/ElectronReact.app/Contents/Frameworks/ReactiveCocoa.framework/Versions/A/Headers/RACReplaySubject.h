//
//  RACReplaySubject.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 3/14/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import "RACSubject.h"

extern const NSUInteger RACReplaySubjectUnlimitedCapacity;

/// A replay subject saves the values it is sent (up to its defined capacity)
/// and resends those to new subscribers. It will also replay an error or
/// completion.
@interface RACReplaySubject : RACSubject

/// Creates a new replay subject with the given capacity. A capacity of
/// RACReplaySubjectUnlimitedCapacity means values are never trimmed.
+ (instancetype)replaySubjectWithCapacity:(NSUInteger)capacity;

@end
