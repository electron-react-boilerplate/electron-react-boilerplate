//
//  RACChannel.h
//  ReactiveCocoa
//
//  Created by Uri Baghin on 01/01/2013.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import "RACSignal.h"
#import "RACSubscriber.h"

@class RACChannelTerminal;

/// A two-way channel.
///
/// Conceptually, RACChannel can be thought of as a bidirectional connection,
/// composed of two controllable signals that work in parallel.
///
/// For example, when connecting between a view and a model:
///
///        Model                      View
///  `leadingTerminal` ------> `followingTerminal`
///  `leadingTerminal` <------ `followingTerminal`
///
/// The initial value of the model and all future changes to it are _sent on_ the
/// `leadingTerminal`, and _received by_ subscribers of the `followingTerminal`.
///
/// Likewise, whenever the user changes the value of the view, that value is sent
/// on the `followingTerminal`, and received in the model from the
/// `leadingTerminal`. However, the initial value of the view is not received
/// from the `leadingTerminal` (only future changes).
@interface RACChannel : NSObject

/// The terminal which "leads" the channel, by sending its latest value
/// immediately to new subscribers of the `followingTerminal`.
///
/// New subscribers to this terminal will not receive a starting value, but will
/// receive all future values that are sent to the `followingTerminal`.
@property (nonatomic, strong, readonly) RACChannelTerminal *leadingTerminal;

/// The terminal which "follows" the lead of the other terminal, only sending
/// _future_ values to the subscribers of the `leadingTerminal`.
///
/// The latest value sent to the `leadingTerminal` (if any) will be sent
/// immediately to new subscribers of this terminal, and then all future values
/// as well.
@property (nonatomic, strong, readonly) RACChannelTerminal *followingTerminal;

@end

/// Represents one end of a RACChannel.
///
/// An terminal is similar to a socket or pipe -- it represents one end of
/// a connection (the RACChannel, in this case). Values sent to this terminal
/// will _not_ be received by its subscribers. Instead, the values will be sent
/// to the subscribers of the RACChannel's _other_ terminal.
///
/// For example, when using the `followingTerminal`, _sent_ values can only be
/// _received_ from the `leadingTerminal`, and vice versa.
///
/// To make it easy to terminate a RACChannel, `error` and `completed` events
/// sent to either terminal will be received by the subscribers of _both_
/// terminals.
///
/// Do not instantiate this class directly. Create a RACChannel instead.
@interface RACChannelTerminal : RACSignal <RACSubscriber>

- (id)init __attribute__((unavailable("Instantiate a RACChannel instead")));

@end
