//
//  RACTargetQueueScheduler.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 6/6/13.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import "RACQueueScheduler.h"

/// A scheduler that enqueues blocks on a private serial queue, targeting an
/// arbitrary GCD queue.
@interface RACTargetQueueScheduler : RACQueueScheduler

/// Initializes the receiver with a serial queue that will target the given
/// `targetQueue`.
///
/// name        - The name of the scheduler. If nil, a default name will be used.
/// targetQueue - The queue to target. Cannot be NULL.
///
/// Returns the initialized object.
- (id)initWithName:(NSString *)name targetQueue:(dispatch_queue_t)targetQueue;

@end
