//
//  RACCommand.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 3/3/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACSignal;

/// The domain for errors originating within `RACCommand`.
extern NSString * const RACCommandErrorDomain;

/// -execute: was invoked while the command was disabled.
extern const NSInteger RACCommandErrorNotEnabled;

/// A `userInfo` key for an error, associated with the `RACCommand` that the
/// error originated from.
///
/// This is included only when the error code is `RACCommandErrorNotEnabled`.
extern NSString * const RACUnderlyingCommandErrorKey;

/// A command is a signal triggered in response to some action, typically
/// UI-related.
@interface RACCommand : NSObject

/// A signal of the signals returned by successful invocations of -execute:
/// (i.e., while the receiver is `enabled`).
///
/// Errors will be automatically caught upon the inner signals, and sent upon
/// `errors` instead. If you _want_ to receive inner errors, use -execute: or
/// -[RACSignal materialize].
/// 
/// Only executions that begin _after_ subscription will be sent upon this
/// signal. All inner signals will arrive upon the main thread.
@property (nonatomic, strong, readonly) RACSignal *executionSignals;

/// A signal of whether this command is currently executing.
///
/// This will send YES whenever -execute: is invoked and the created signal has
/// not yet terminated. Once all executions have terminated, `executing` will
/// send NO.
///
/// This signal will send its current value upon subscription, and then all
/// future values on the main thread.
@property (nonatomic, strong, readonly) RACSignal *executing;

/// A signal of whether this command is able to execute.
///
/// This will send NO if:
///
///  - The command was created with an `enabledSignal`, and NO is sent upon that
///    signal, or
///  - `allowsConcurrentExecution` is NO and the command has started executing.
///
/// Once the above conditions are no longer met, the signal will send YES.
///
/// This signal will send its current value upon subscription, and then all
/// future values on the main thread.
@property (nonatomic, strong, readonly) RACSignal *enabled;

/// Forwards any errors that occur within signals returned by -execute:.
///
/// When an error occurs on a signal returned from -execute:, this signal will
/// send the associated NSError value as a `next` event (since an `error` event
/// would terminate the stream).
///
/// After subscription, this signal will send all future errors on the main
/// thread.
@property (nonatomic, strong, readonly) RACSignal *errors;

/// Whether the command allows multiple executions to proceed concurrently.
///
/// The default value for this property is NO.
@property (atomic, assign) BOOL allowsConcurrentExecution;

/// Invokes -initWithEnabled:signalBlock: with a nil `enabledSignal`.
- (id)initWithSignalBlock:(RACSignal * (^)(id input))signalBlock;

/// Initializes a command that is conditionally enabled.
///
/// This is the designated initializer for this class.
///
/// enabledSignal - A signal of BOOLs which indicate whether the command should
///                 be enabled. `enabled` will be based on the latest value sent
///                 from this signal. Before any values are sent, `enabled` will
///                 default to YES. This argument may be nil.
/// signalBlock   - A block which will map each input value (passed to -execute:)
///                 to a signal of work. The returned signal will be multicasted
///                 to a replay subject, sent on `executionSignals`, then
///                 subscribed to synchronously. Neither the block nor the
///                 returned signal may be nil.
- (id)initWithEnabled:(RACSignal *)enabledSignal signalBlock:(RACSignal * (^)(id input))signalBlock;

/// If the receiver is enabled, this method will:
///
///  1. Invoke the `signalBlock` given at the time of initialization.
///  2. Multicast the returned signal to a RACReplaySubject.
///  3. Send the multicasted signal on `executionSignals`.
///  4. Subscribe (connect) to the original signal on the main thread.
///
/// input - The input value to pass to the receiver's `signalBlock`. This may be
///         nil.
///
/// Returns the multicasted signal, after subscription. If the receiver is not
/// enabled, returns a signal that will send an error with code
/// RACCommandErrorNotEnabled.
- (RACSignal *)execute:(id)input;

@end

@interface RACCommand (Unavailable)

@property (atomic, readonly) BOOL canExecute __attribute__((unavailable("Use the 'enabled' signal instead")));

+ (instancetype)command __attribute__((unavailable("Use -initWithSignalBlock: instead")));
+ (instancetype)commandWithCanExecuteSignal:(RACSignal *)canExecuteSignal __attribute__((unavailable("Use -initWithEnabled:signalBlock: instead")));
- (id)initWithCanExecuteSignal:(RACSignal *)canExecuteSignal __attribute__((unavailable("Use -initWithEnabled:signalBlock: instead")));
- (RACSignal *)addSignalBlock:(RACSignal * (^)(id value))signalBlock __attribute__((unavailable("Pass the signalBlock to -initWithSignalBlock: instead")));

@end
