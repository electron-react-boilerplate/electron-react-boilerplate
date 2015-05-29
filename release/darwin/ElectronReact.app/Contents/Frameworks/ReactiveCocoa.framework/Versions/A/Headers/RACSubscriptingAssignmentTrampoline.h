//
//  RACSubscriptingAssignmentTrampoline.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 9/24/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EXTKeyPathCoding.h"

@class RACSignal;

/// Assigns a signal to an object property, automatically setting the given key
/// path on every `next`. When the signal completes, the binding is automatically
/// disposed of.
///
/// There are two different versions of this macro:
///
///  - RAC(TARGET, KEYPATH, NILVALUE) will bind the `KEYPATH` of `TARGET` to the
///    given signal. If the signal ever sends a `nil` value, the property will be
///    set to `NILVALUE` instead. `NILVALUE` may itself be `nil` for object
///    properties, but an NSValue should be used for primitive properties, to
///    avoid an exception if `nil` is sent (which might occur if an intermediate
///    object is set to `nil`).
///  - RAC(TARGET, KEYPATH) is the same as the above, but `NILVALUE` defaults to
///    `nil`.
///
/// See -[RACSignal setKeyPath:onObject:nilValue:] for more information about the
/// binding's semantics.
///
/// Examples
///
///  RAC(self, objectProperty) = objectSignal;
///  RAC(self, stringProperty, @"foobar") = stringSignal;
///  RAC(self, integerProperty, @42) = integerSignal;
///
/// WARNING: Under certain conditions, use of this macro can be thread-unsafe.
///          See the documentation of -setKeyPath:onObject:nilValue:.
#define RAC(TARGET, ...) \
    metamacro_if_eq(1, metamacro_argcount(__VA_ARGS__)) \
        (RAC_(TARGET, __VA_ARGS__, nil)) \
        (RAC_(TARGET, __VA_ARGS__))

/// Do not use this directly. Use the RAC macro above.
#define RAC_(TARGET, KEYPATH, NILVALUE) \
    [[RACSubscriptingAssignmentTrampoline alloc] initWithTarget:(TARGET) nilValue:(NILVALUE)][@keypath(TARGET, KEYPATH)]

@interface RACSubscriptingAssignmentTrampoline : NSObject

- (id)initWithTarget:(id)target nilValue:(id)nilValue;
- (void)setObject:(RACSignal *)signal forKeyedSubscript:(NSString *)keyPath;

@end
