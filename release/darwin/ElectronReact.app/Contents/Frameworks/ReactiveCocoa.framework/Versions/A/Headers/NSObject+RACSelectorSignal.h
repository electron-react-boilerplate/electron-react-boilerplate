//
//  NSObject+RACSelectorSignal.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 3/18/13.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACSignal;

/// The domain for any errors originating from -rac_signalForSelector:.
extern NSString * const RACSelectorSignalErrorDomain;

/// -rac_signalForSelector: was going to add a new method implementation for
/// `selector`, but another thread added an implementation before it was able to.
///
/// This will _not_ occur for cases where a method implementation exists before
/// -rac_signalForSelector: is invoked.
extern const NSInteger RACSelectorSignalErrorMethodSwizzlingRace;

@interface NSObject (RACSelectorSignal)

/// Creates a signal associated with the receiver, which will send a tuple of the
/// method's arguments each time the given selector is invoked.
///
/// If the selector is already implemented on the receiver, the existing
/// implementation will be invoked _before_ the signal fires.
///
/// If the selector is not yet implemented on the receiver, the injected
/// implementation will have a `void` return type and accept only object
/// arguments. Invoking the added implementation with non-object values, or
/// expecting a return value, will result in undefined behavior.
///
/// This is useful for changing an event or delegate callback into a signal. For
/// example, on an NSView:
///
///     [[view rac_signalForSelector:@selector(mouseDown:)] subscribeNext:^(RACTuple *args) {
///         NSEvent *event = args.first;
///         NSLog(@"mouse button pressed: %@", event);
///     }];
///
/// selector - The selector for whose invocations are to be observed. If it
///            doesn't exist, it will be implemented to accept object arguments
///            and return void. This cannot have C arrays or unions as arguments
///            or C arrays, unions, structs, complex or vector types as return
///            type.
///
/// Returns a signal which will send a tuple of arguments upon each invocation of
/// the selector, then completes when the receiver is deallocated. `next` events
/// will be sent synchronously from the thread that invoked the method. If
/// a runtime call fails, the signal will send an error in the
/// RACSelectorSignalErrorDomain.
- (RACSignal *)rac_signalForSelector:(SEL)selector;

/// Behaves like -rac_signalForSelector:, but if the selector is not yet
/// implemented on the receiver, its method signature is looked up within
/// `protocol`, and may accept non-object arguments.
///
/// If the selector is not yet implemented and has a return value, the injected
/// method will return all zero bits (equal to `nil`, `NULL`, 0, 0.0f, etc.).
///
/// selector - The selector for whose invocations are to be observed. If it
///            doesn't exist, it will be implemented using information from
///            `protocol`, and may accept non-object arguments and return
///            a value. This cannot have C arrays or unions as arguments or
///            return type.
/// protocol - The protocol in which `selector` is declared. This will be used
///            for type information if the selector is not already implemented on
///            the receiver. This must not be `NULL`, and `selector` must exist
///            in this protocol.
///
/// Returns a signal which will send a tuple of arguments on each invocation of
/// the selector, or an error in RACSelectorSignalErrorDomain if a runtime
/// call fails.
- (RACSignal *)rac_signalForSelector:(SEL)selector fromProtocol:(Protocol *)protocol;

@end
