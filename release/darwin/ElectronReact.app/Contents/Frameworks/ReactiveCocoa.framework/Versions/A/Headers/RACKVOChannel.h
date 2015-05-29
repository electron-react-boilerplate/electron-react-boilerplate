//
//  RACKVOChannel.h
//  ReactiveCocoa
//
//  Created by Uri Baghin on 27/12/2012.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import "RACChannel.h"
#import "EXTKeyPathCoding.h"
#import "metamacros.h"

/// Creates a RACKVOChannel to the given key path. When the targeted object
/// deallocates, the channel will complete.
///
/// If RACChannelTo() is used as an expression, it returns a RACChannelTerminal that
/// can be used to watch the specified property for changes, and set new values
/// for it. The terminal will start with the property's current value upon
/// subscription.
///
/// If RACChannelTo() is used on the left-hand side of an assignment, there must a
/// RACChannelTerminal on the right-hand side of the assignment. The two will be
/// subscribed to one another: the property's value is immediately set to the
/// value of the channel terminal on the right-hand side, and subsequent changes
/// to either terminal will be reflected on the other.
///
/// There are two different versions of this macro:
///
///  - RACChannelTo(TARGET, KEYPATH, NILVALUE) will create a channel to the `KEYPATH`
///    of `TARGET`. If the terminal is ever sent a `nil` value, the property will
///    be set to `NILVALUE` instead. `NILVALUE` may itself be `nil` for object
///    properties, but an NSValue should be used for primitive properties, to
///    avoid an exception if `nil` is sent (which might occur if an intermediate
///    object is set to `nil`).
///  - RACChannelTo(TARGET, KEYPATH) is the same as the above, but `NILVALUE` defaults to
///    `nil`.
///
/// Examples
///
///  RACChannelTerminal *integerChannel = RACChannelTo(self, integerProperty, @42);
///
///  // Sets self.integerProperty to 5.
///  [integerChannel sendNext:@5];
///
///  // Logs the current value of self.integerProperty, and all future changes.
///  [integerChannel subscribeNext:^(id value) {
///      NSLog(@"value: %@", value);
///  }];
///
///  // Binds properties to each other, taking the initial value from the right
///  side.
///  RACChannelTo(view, objectProperty) = RACChannelTo(model, objectProperty);
///  RACChannelTo(view, integerProperty, @2) = RACChannelTo(model, integerProperty, @10);
#define RACChannelTo(TARGET, ...) \
    metamacro_if_eq(1, metamacro_argcount(__VA_ARGS__)) \
        (RACChannelTo_(TARGET, __VA_ARGS__, nil)) \
        (RACChannelTo_(TARGET, __VA_ARGS__))

/// Do not use this directly. Use the RACChannelTo macro above.
#define RACChannelTo_(TARGET, KEYPATH, NILVALUE) \
    [[RACKVOChannel alloc] initWithTarget:(TARGET) keyPath:@keypath(TARGET, KEYPATH) nilValue:(NILVALUE)][@keypath(RACKVOChannel.new, followingTerminal)]

/// A RACChannel that observes a KVO-compliant key path for changes.
@interface RACKVOChannel : RACChannel

/// Initializes a channel that will observe the given object and key path.
///
/// The current value of the key path, and future KVO notifications for the given
/// key path, will be sent to subscribers of the channel's `followingTerminal`.
/// Values sent to the `followingTerminal` will be set at the given key path using
/// key-value coding.
///
/// When the target object deallocates, the channel will complete. Signal errors
/// are considered undefined behavior.
///
/// This is the designated initializer for this class.
///
/// target   - The object to bind to.
/// keyPath  - The key path to observe and set the value of.
/// nilValue - The value to set at the key path whenever a `nil` value is
///            received. This may be nil when connecting to object properties, but
///            an NSValue should be used for primitive properties, to avoid an
///            exception if `nil` is received (which might occur if an intermediate
///            object is set to `nil`).
- (id)initWithTarget:(__weak NSObject *)target keyPath:(NSString *)keyPath nilValue:(id)nilValue;

- (id)init __attribute__((unavailable("Use -initWithTarget:keyPath:nilValue: instead")));

@end

/// Methods needed for the convenience macro. Do not call explicitly.
@interface RACKVOChannel (RACChannelTo)

- (RACChannelTerminal *)objectForKeyedSubscript:(NSString *)key;
- (void)setObject:(RACChannelTerminal *)otherTerminal forKeyedSubscript:(NSString *)key;

@end
