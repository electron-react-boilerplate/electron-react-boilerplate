//
//  RACEvent.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2013-01-07.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

/// Describes the type of a RACEvent.
///
/// RACEventTypeCompleted - A `completed` event.
/// RACEventTypeError     - An `error` event.
/// RACEventTypeNext      - A `next` event.
typedef enum : NSUInteger {
    RACEventTypeCompleted,
    RACEventTypeError,
    RACEventTypeNext
} RACEventType;

/// Represents an event sent by a RACSignal.
///
/// This corresponds to the `Notification` class in Rx.
@interface RACEvent : NSObject <NSCopying>

/// Returns a singleton RACEvent representing the `completed` event.
+ (instancetype)completedEvent;

/// Returns a new event of type RACEventTypeError, containing the given error.
+ (instancetype)eventWithError:(NSError *)error;

/// Returns a new event of type RACEventTypeNext, containing the given value.
+ (instancetype)eventWithValue:(id)value;

/// The type of event represented by the receiver.
@property (nonatomic, assign, readonly) RACEventType eventType;

/// Returns whether the receiver is of type RACEventTypeCompleted or
/// RACEventTypeError.
@property (nonatomic, getter = isFinished, assign, readonly) BOOL finished;

/// The error associated with an event of type RACEventTypeError. This will be
/// nil for all other event types.
@property (nonatomic, strong, readonly) NSError *error;

/// The value associated with an event of type RACEventTypeNext. This will be
/// nil for all other event types.
@property (nonatomic, strong, readonly) id value;

@end
