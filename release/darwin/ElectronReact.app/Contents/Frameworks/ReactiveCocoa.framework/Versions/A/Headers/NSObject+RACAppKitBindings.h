//
//  NSObject+RACAppKitBindings.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 4/17/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Cocoa/Cocoa.h>

@class RACChannelTerminal;

@interface NSObject (RACAppKitBindings)

/// Invokes -rac_channelToBinding:options: without any options.
- (RACChannelTerminal *)rac_channelToBinding:(NSString *)binding;

/// Applies a Cocoa binding to the receiver, then exposes a RACChannel-based
/// interface for manipulating it.
///
/// Creating two of the same bindings on the same object will result in undefined
/// behavior.
///
/// binding - The name of the binding. This must not be nil.
/// options - Any options to pass to Cocoa Bindings. This may be nil.
///
/// Returns a RACChannelTerminal which will send future values from the receiver,
/// and update the receiver when values are sent to the terminal.
- (RACChannelTerminal *)rac_channelToBinding:(NSString *)binding options:(NSDictionary *)options;

@end

@interface NSObject (RACAppKitBindingsDeprecated)

- (void)rac_bind:(NSString *)binding toObject:(id)object withKeyPath:(NSString *)keyPath __attribute__((deprecated("Use -rac_bind:options: instead")));
- (void)rac_bind:(NSString *)binding toObject:(id)object withKeyPath:(NSString *)keyPath nilValue:(id)nilValue __attribute__((deprecated("Use -rac_bind:options: instead")));
- (void)rac_bind:(NSString *)binding toObject:(id)object withKeyPath:(NSString *)keyPath transform:(id (^)(id value))transformBlock __attribute__((deprecated("Use -rac_bind:options: instead")));
- (void)rac_bind:(NSString *)binding toObject:(id)object withNegatedKeyPath:(NSString *)keyPath __attribute__((deprecated("Use -rac_bind:options: instead")));

@end
