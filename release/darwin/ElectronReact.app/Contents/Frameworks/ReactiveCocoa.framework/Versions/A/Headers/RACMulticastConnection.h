//
//  RACMulticastConnection.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 4/11/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACDisposable;
@class RACSignal;

/// A multicast connection encapsulates the idea of sharing one subscription to a
/// signal to many subscribers. This is most often needed if the subscription to
/// the underlying signal involves side-effects or shouldn't be called more than
/// once.
///
/// The multicasted signal is only subscribed to when
/// -[RACMulticastConnection connect] is called. Until that happens, no values
/// will be sent on `signal`. See -[RACMulticastConnection autoconnect] for how
/// -[RACMulticastConnection connect] can be called automatically.
///
/// Note that you shouldn't create RACMulticastConnection manually. Instead use
/// -[RACSignal publish] or -[RACSignal multicast:].
@interface RACMulticastConnection : NSObject

/// The multicasted signal.
@property (nonatomic, strong, readonly) RACSignal *signal;

/// Connect to the underlying signal by subscribing to it. Calling this multiple
/// times does nothing but return the existing connection's disposable.
///
/// Returns the disposable for the subscription to the multicasted signal.
- (RACDisposable *)connect;

/// Connects to the underlying signal when the returned signal is first
/// subscribed to, and disposes of the subscription to the multicasted signal
/// when the returned signal has no subscribers.
///
/// If new subscribers show up after being disposed, they'll subscribe and then
/// be immediately disposed of. The returned signal will never re-connect to the
/// multicasted signal.
///
/// Returns the autoconnecting signal.
- (RACSignal *)autoconnect;

@end
