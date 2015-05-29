//
//  RACScheduler.m
//  ReactiveCocoa
//
//  Created by Miķelis Vindavs on 5/27/14.
//  Copyright (c) 2014 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RACScheduler.h"

/// An interface for use by subclasses.
///
/// Subclasses should use `-performAsCurrentScheduler:` to do the actual block
/// invocation so that +[RACScheduler currentScheduler] behaves as expected.
///
/// **Note that RACSchedulers are expected to be serial**. Subclasses must honor
/// that contract. See `RACTargetQueueScheduler` for a queue-based scheduler
/// which will enforce the serialization guarantee.
@interface RACScheduler ()

/// Performs the given block with the receiver as the current scheduler for
/// its thread. This should only be called by subclasses to perform their
/// scheduled blocks.
///
/// block - The block to execute. Cannot be NULL.
- (void)performAsCurrentScheduler:(void (^)(void))block;

@end
