//
//  RACTestScheduler.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2013-07-06.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import "RACScheduler.h"

/// A special kind of scheduler that steps through virtualized time.
///
/// This scheduler class can be used in unit tests to verify asynchronous
/// behaviors without spending significant time waiting.
///
/// This class can be used from multiple threads, but only one thread can `step`
/// through the enqueued actions at a time. Other threads will wait while the
/// scheduled blocks are being executed.
@interface RACTestScheduler : RACScheduler

/// Initializes a new test scheduler.
- (instancetype)init;

/// Executes the next scheduled block, if any.
///
/// This method will block until the scheduled action has completed.
- (void)step;

/// Executes up to the next `ticks` scheduled blocks.
///
/// This method will block until the scheduled actions have completed.
///
/// ticks - The number of scheduled blocks to execute. If there aren't this many
///         blocks enqueued, all scheduled blocks are executed.
- (void)step:(NSUInteger)ticks;

/// Executes all of the scheduled blocks on the receiver.
///
/// This method will block until the scheduled actions have completed.
- (void)stepAll;

@end
