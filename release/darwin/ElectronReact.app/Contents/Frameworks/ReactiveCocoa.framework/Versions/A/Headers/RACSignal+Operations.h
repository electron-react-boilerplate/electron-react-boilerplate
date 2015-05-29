//
//  RACSignal+Operations.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2012-09-06.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RACSignal.h"

/// The domain for errors originating in RACSignal operations.
extern NSString * const RACSignalErrorDomain;

/// The error code used with -timeout:.
extern const NSInteger RACSignalErrorTimedOut;

/// The error code used when a value passed into +switch:cases:default: does not
/// match any of the cases, and no default was given.
extern const NSInteger RACSignalErrorNoMatchingCase;

@class RACCommand;
@class RACDisposable;
@class RACMulticastConnection;
@class RACScheduler;
@class RACSequence;
@class RACSubject;
@class RACTuple;
@protocol RACSubscriber;

@interface RACSignal (Operations)

/// Do the given block on `next`. This should be used to inject side effects into
/// the signal.
- (RACSignal *)doNext:(void (^)(id x))block;

/// Do the given block on `error`. This should be used to inject side effects
/// into the signal.
- (RACSignal *)doError:(void (^)(NSError *error))block;

/// Do the given block on `completed`. This should be used to inject side effects
/// into the signal.
- (RACSignal *)doCompleted:(void (^)(void))block;

/// Sends `next`s only if we don't receive another `next` in `interval` seconds.
///
/// If a `next` is received, and then another `next` is received before
/// `interval` seconds have passed, the first value is discarded.
///
/// After `interval` seconds have passed since the most recent `next` was sent,
/// the most recent `next` is forwarded on the scheduler that the value was
/// originally received on. If +[RACScheduler currentScheduler] was nil at the
/// time, a private background scheduler is used.
///
/// Returns a signal which sends throttled and delayed `next` events. Completion
/// and errors are always forwarded immediately.
- (RACSignal *)throttle:(NSTimeInterval)interval;

/// Throttles `next`s for which `predicate` returns YES.
///
/// When `predicate` returns YES for a `next`:
///
///  1. If another `next` is received before `interval` seconds have passed, the
///     prior value is discarded. This happens regardless of whether the new
///     value will be throttled.
///  2. After `interval` seconds have passed since the value was originally
///     received, it will be forwarded on the scheduler that it was received
///     upon. If +[RACScheduler currentScheduler] was nil at the time, a private
///     background scheduler is used.
///
/// When `predicate` returns NO for a `next`, it is forwarded immediately,
/// without any throttling.
///
/// interval  - The number of seconds for which to buffer the latest value that
///             passes `predicate`.
/// predicate - Passed each `next` from the receiver, this block returns
///             whether the given value should be throttled. This argument must
///             not be nil.
///
/// Returns a signal which sends `next` events, throttled when `predicate`
/// returns YES. Completion and errors are always forwarded immediately.
- (RACSignal *)throttle:(NSTimeInterval)interval valuesPassingTest:(BOOL (^)(id next))predicate;

/// Forwards `next` and `completed` events after delaying for `interval` seconds
/// on the current scheduler (on which the events were delivered).
///
/// If +[RACScheduler currentScheduler] is nil when `next` or `completed` is
/// received, a private background scheduler is used.
///
/// Returns a signal which sends delayed `next` and `completed` events. Errors
/// are always forwarded immediately.
- (RACSignal *)delay:(NSTimeInterval)interval;

/// Resubscribes when the signal completes.
- (RACSignal *)repeat;

/// Executes the given block each time a subscription is created.
///
/// block - A block which defines the subscription side effects. Cannot be `nil`.
///
/// Example:
///
///   // Write new file, with backup.
///   [[[[fileManager
///       rac_createFileAtPath:path contents:data]
///       initially:^{
///           // 2. Second, backup current file
///           [fileManager moveItemAtPath:path toPath:backupPath error:nil];
///       }]
///       initially:^{
///           // 1. First, acquire write lock.
///           [writeLock lock];
///       }]
///       finally:^{
///           [writeLock unlock];
///       }];
///
/// Returns a signal that passes through all events of the receiver, plus
/// introduces side effects which occur prior to any subscription side effects
/// of the receiver.
- (RACSignal *)initially:(void (^)(void))block;

/// Executes the given block when the signal completes or errors.
- (RACSignal *)finally:(void (^)(void))block;

/// Divides the receiver's `next`s into buffers which deliver every `interval`
/// seconds.
///
/// interval  - The interval in which values are grouped into one buffer.
/// scheduler - The scheduler upon which the returned signal will deliver its
///             values. This must not be nil or +[RACScheduler
///             immediateScheduler].
///
/// Returns a signal which sends RACTuples of the buffered values at each
/// interval on `scheduler`. When the receiver completes, any currently-buffered
/// values will be sent immediately.
- (RACSignal *)bufferWithTime:(NSTimeInterval)interval onScheduler:(RACScheduler *)scheduler;

/// Collects all receiver's `next`s into a NSArray. Nil values will be converted
/// to NSNull.
///
/// This corresponds to the `ToArray` method in Rx.
///
/// Returns a signal which sends a single NSArray when the receiver completes
/// successfully.
- (RACSignal *)collect;

/// Takes the last `count` `next`s after the receiving signal completes.
- (RACSignal *)takeLast:(NSUInteger)count;

/// Combines the latest values from the receiver and the given signal into
/// RACTuples, once both have sent at least one `next`.
///
/// Any additional `next`s will result in a new RACTuple with the latest values
/// from both signals.
///
/// signal - The signal to combine with. This argument must not be nil.
///
/// Returns a signal which sends RACTuples of the combined values, forwards any
/// `error` events, and completes when both input signals complete.
- (RACSignal *)combineLatestWith:(RACSignal *)signal;

/// Combines the latest values from the given signals into RACTuples, once all
/// the signals have sent at least one `next`.
///
/// Any additional `next`s will result in a new RACTuple with the latest values
/// from all signals.
///
/// signals - The signals to combine. If this collection is empty, the returned
///           signal will immediately complete upon subscription.
///
/// Returns a signal which sends RACTuples of the combined values, forwards any
/// `error` events, and completes when all input signals complete.
+ (RACSignal *)combineLatest:(id<NSFastEnumeration>)signals;

/// Combines signals using +combineLatest:, then reduces the resulting tuples
/// into a single value using -reduceEach:.
///
/// signals     - The signals to combine. If this collection is empty, the
///               returned signal will immediately complete upon subscription.
/// reduceBlock - The block which reduces the latest values from all the
///               signals into one value. It must take as many arguments as the
///               number of signals given. Each argument will be an object
///               argument. The return value must be an object. This argument
///               must not be nil.
///
/// Example:
///
///   [RACSignal combineLatest:@[ stringSignal, intSignal ] reduce:^(NSString *string, NSNumber *number) {
///       return [NSString stringWithFormat:@"%@: %@", string, number];
///   }];
///
/// Returns a signal which sends the results from each invocation of
/// `reduceBlock`.
+ (RACSignal *)combineLatest:(id<NSFastEnumeration>)signals reduce:(id (^)())reduceBlock;

/// Merges the receiver and the given signal with `+merge:` and returns the
/// resulting signal.
- (RACSignal *)merge:(RACSignal *)signal;

/// Sends the latest `next` from any of the signals.
///
/// Returns a signal that passes through values from each of the given signals,
/// and sends `completed` when all of them complete. If any signal sends an error,
/// the returned signal sends `error` immediately.
+ (RACSignal *)merge:(id<NSFastEnumeration>)signals;

/// Merges the signals sent by the receiver into a flattened signal, but only
/// subscribes to `maxConcurrent` number of signals at a time. New signals are
/// queued and subscribed to as other signals complete.
///
/// If an error occurs on any of the signals, it is sent on the returned signal.
/// It completes only after the receiver and all sent signals have completed.
///
/// This corresponds to `Merge<TSource>(IObservable<IObservable<TSource>>, Int32)`
/// in Rx.
///
/// maxConcurrent - the maximum number of signals to subscribe to at a
///                 time. If 0, it subscribes to an unlimited number of
///                 signals.
- (RACSignal *)flatten:(NSUInteger)maxConcurrent;

/// Ignores all `next`s from the receiver, waits for the receiver to complete,
/// then subscribes to a new signal.
///
/// block - A block which will create or obtain a new signal to subscribe to,
///         executed only after the receiver completes. This block must not be
///         nil, and it must not return a nil signal.
///
/// Returns a signal which will pass through the events of the signal created in
/// `block`. If the receiver errors out, the returned signal will error as well.
- (RACSignal *)then:(RACSignal * (^)(void))block;

/// Concats the inner signals of a signal of signals.
- (RACSignal *)concat;

/// Aggregates the `next` values of the receiver into a single combined value.
///
/// The algorithm proceeds as follows:
///
///  1. `start` is passed into the block as the `running` value, and the first
///     element of the receiver is passed into the block as the `next` value.
///  2. The result of the invocation (`running`) and the next element of the
///     receiver (`next`) is passed into `reduceBlock`.
///  3. Steps 2 and 3 are repeated until all values have been processed.
///  4. The last result of `reduceBlock` is sent on the returned signal.
///
/// This method is similar to -scanWithStart:reduce:, except that only the
/// final result is sent on the returned signal.
///
/// start       - The value to be combined with the first element of the
///               receiver. This value may be `nil`.
/// reduceBlock - The block that describes how to combine values of the
///               receiver. If the receiver is empty, this block will never be
///               invoked. Cannot be nil.
///
/// Returns a signal that will send the aggregated value when the receiver
/// completes, then itself complete. If the receiver never sends any values,
/// `start` will be sent instead.
- (RACSignal *)aggregateWithStart:(id)start reduce:(id (^)(id running, id next))reduceBlock;

/// Aggregates the `next` values of the receiver into a single combined value.
/// This is indexed version of -aggregateWithStart:reduce:.
///
/// start       - The value to be combined with the first element of the
///               receiver. This value may be `nil`.
/// reduceBlock - The block that describes how to combine values of the
///               receiver. This block takes zero-based index value as the last
///               parameter. If the receiver is empty, this block will never be
///               invoked. Cannot be nil.
///
/// Returns a signal that will send the aggregated value when the receiver
/// completes, then itself complete. If the receiver never sends any values,
/// `start` will be sent instead.
- (RACSignal *)aggregateWithStart:(id)start reduceWithIndex:(id (^)(id running, id next, NSUInteger index))reduceBlock;

/// Aggregates the `next` values of the receiver into a single combined value.
///
/// This invokes `startFactory` block on each subscription, then calls
/// -aggregateWithStart:reduce: with the return value of the block as start value.
///
/// startFactory - The block that returns start value which will be combined
///                with the first element of the receiver. Cannot be nil.
/// reduceBlock  - The block that describes how to combine values of the
///                receiver. If the receiver is empty, this block will never be
///                invoked. Cannot be nil.
///
/// Returns a signal that will send the aggregated value when the receiver
/// completes, then itself complete. If the receiver never sends any values,
/// the return value of `startFactory` will be sent instead.
- (RACSignal *)aggregateWithStartFactory:(id (^)(void))startFactory reduce:(id (^)(id running, id next))reduceBlock;

/// Invokes -setKeyPath:onObject:nilValue: with `nil` for the nil value.
///
/// WARNING: Under certain conditions, this method is known to be thread-unsafe.
///          See the description in -setKeyPath:onObject:nilValue:.
- (RACDisposable *)setKeyPath:(NSString *)keyPath onObject:(NSObject *)object;

/// Binds the receiver to an object, automatically setting the given key path on
/// every `next`. When the signal completes, the binding is automatically
/// disposed of.
///
/// WARNING: Under certain conditions, this method is known to be thread-unsafe.
///          A crash can result if `object` is deallocated concurrently on
///          another thread within a window of time between a value being sent
///          on this signal and immediately prior to the invocation of
///          -setValue:forKeyPath:, which sets the property. To prevent this,
///          ensure `object` is deallocated on the same thread the receiver
///          sends on, or ensure that the returned disposable is disposed of
///          before `object` deallocates.
///          See https://github.com/ReactiveCocoa/ReactiveCocoa/pull/1184
///
/// Sending an error on the signal is considered undefined behavior, and will
/// generate an assertion failure in Debug builds.
///
/// A given key on an object should only have one active signal bound to it at any
/// given time. Binding more than one signal to the same property is considered
/// undefined behavior.
///
/// keyPath  - The key path to update with `next`s from the receiver.
/// object   - The object that `keyPath` is relative to.
/// nilValue - The value to set at the key path whenever `nil` is sent by the
///            receiver. This may be nil when binding to object properties, but
///            an NSValue should be used for primitive properties, to avoid an
///            exception if `nil` is sent (which might occur if an intermediate
///            object is set to `nil`).
///
/// Returns a disposable which can be used to terminate the binding.
- (RACDisposable *)setKeyPath:(NSString *)keyPath onObject:(NSObject *)object nilValue:(id)nilValue;

/// Sends NSDate.date every `interval` seconds.
///
/// interval  - The time interval in seconds at which the current time is sent.
/// scheduler - The scheduler upon which the current NSDate should be sent. This
///             must not be nil or +[RACScheduler immediateScheduler].
///
/// Returns a signal that sends the current date/time every `interval` on
/// `scheduler`.
+ (RACSignal *)interval:(NSTimeInterval)interval onScheduler:(RACScheduler *)scheduler;

/// Sends NSDate.date at intervals of at least `interval` seconds, up to
/// approximately `interval` + `leeway` seconds.
///
/// The created signal will defer sending each `next` for at least `interval`
/// seconds, and for an additional amount of time up to `leeway` seconds in the
/// interest of performance or power consumption. Note that some additional
/// latency is to be expected, even when specifying a `leeway` of 0.
///
/// interval  - The base interval between `next`s.
/// scheduler - The scheduler upon which the current NSDate should be sent. This
///             must not be nil or +[RACScheduler immediateScheduler].
/// leeway    - The maximum amount of additional time the `next` can be deferred.
///
/// Returns a signal that sends the current date/time at intervals of at least
/// `interval seconds` up to approximately `interval` + `leeway` seconds on
/// `scheduler`.
+ (RACSignal *)interval:(NSTimeInterval)interval onScheduler:(RACScheduler *)scheduler withLeeway:(NSTimeInterval)leeway;

/// Takes `next`s until the `signalTrigger` sends `next` or `completed`.
///
/// Returns a signal which passes through all events from the receiver until
/// `signalTrigger` sends `next` or `completed`, at which point the returned signal
/// will send `completed`.
- (RACSignal *)takeUntil:(RACSignal *)signalTrigger;

/// Takes `next`s until the `replacement` sends an event.
///
/// replacement - The signal which replaces the receiver as soon as it sends an
///               event.
///
/// Returns a signal which passes through `next`s and `error` from the receiver
/// until `replacement` sends an event, at which point the returned signal will
/// send that event and switch to passing through events from `replacement`
/// instead, regardless of whether the receiver has sent events already.
- (RACSignal *)takeUntilReplacement:(RACSignal *)replacement;

/// Subscribes to the returned signal when an error occurs.
- (RACSignal *)catch:(RACSignal * (^)(NSError *error))catchBlock;

/// Subscribes to the given signal when an error occurs.
- (RACSignal *)catchTo:(RACSignal *)signal;

/// Runs `tryBlock` against each of the receiver's values, passing values
/// until `tryBlock` returns NO, or the receiver completes.
///
/// tryBlock - An action to run against each of the receiver's values.
///            The block should return YES to indicate that the action was
///            successful. This block must not be nil.
///
/// Example:
///
///   // The returned signal will send an error if data values cannot be
///   // written to `someFileURL`.
///   [signal try:^(NSData *data, NSError **errorPtr) {
///       return [data writeToURL:someFileURL options:NSDataWritingAtomic error:errorPtr];
///   }];
///
/// Returns a signal which passes through all the values of the receiver. If
/// `tryBlock` fails for any value, the returned signal will error using the
/// `NSError` passed out from the block.
- (RACSignal *)try:(BOOL (^)(id value, NSError **errorPtr))tryBlock;

/// Runs `mapBlock` against each of the receiver's values, mapping values until
/// `mapBlock` returns nil, or the receiver completes.
///
/// mapBlock - An action to map each of the receiver's values. The block should
///            return a non-nil value to indicate that the action was successful.
///            This block must not be nil.
///
/// Example:
///
///   // The returned signal will send an error if data cannot be read from
///   // `fileURL`.
///   [signal tryMap:^(NSURL *fileURL, NSError **errorPtr) {
///       return [NSData dataWithContentsOfURL:fileURL options:0 error:errorPtr];
///   }];
///
/// Returns a signal which transforms all the values of the receiver. If
/// `mapBlock` returns nil for any value, the returned signal will error using
/// the `NSError` passed out from the block.
- (RACSignal *)tryMap:(id (^)(id value, NSError **errorPtr))mapBlock;

/// Returns the first `next`. Note that this is a blocking call.
- (id)first;

/// Returns the first `next` or `defaultValue` if the signal completes or errors
/// without sending a `next`. Note that this is a blocking call.
- (id)firstOrDefault:(id)defaultValue;

/// Returns the first `next` or `defaultValue` if the signal completes or errors
/// without sending a `next`. If an error occurs success will be NO and error
/// will be populated. Note that this is a blocking call.
///
/// Both success and error may be NULL.
- (id)firstOrDefault:(id)defaultValue success:(BOOL *)success error:(NSError **)error;

/// Blocks the caller and waits for the signal to complete.
///
/// error - If not NULL, set to any error that occurs.
///
/// Returns whether the signal completed successfully. If NO, `error` will be set
/// to the error that occurred.
- (BOOL)waitUntilCompleted:(NSError **)error;

/// Defers creation of a signal until the signal's actually subscribed to.
///
/// This can be used to effectively turn a hot signal into a cold signal.
+ (RACSignal *)defer:(RACSignal * (^)(void))block;

/// Every time the receiver sends a new RACSignal, subscribes and sends `next`s and
/// `error`s only for that signal.
///
/// The receiver must be a signal of signals.
///
/// Returns a signal which passes through `next`s and `error`s from the latest
/// signal sent by the receiver, and sends `completed` when both the receiver and
/// the last sent signal complete.
- (RACSignal *)switchToLatest;

/// Switches between the signals in `cases` as well as `defaultSignal` based on
/// the latest value sent by `signal`.
///
/// signal        - A signal of objects used as keys in the `cases` dictionary.
///                 This argument must not be nil.
/// cases         - A dictionary that has signals as values. This argument must
///                 not be nil. A RACTupleNil key in this dictionary will match
///                 nil `next` events that are received on `signal`.
/// defaultSignal - The signal to pass through after `signal` sends a value for
///                 which `cases` does not contain a signal. If nil, any
///                 unmatched values will result in
///                 a RACSignalErrorNoMatchingCase error.
///
/// Returns a signal which passes through `next`s and `error`s from one of the
/// the signals in `cases` or `defaultSignal`, and sends `completed` when both
/// `signal` and the last used signal complete. If no `defaultSignal` is given,
/// an unmatched `next` will result in an error on the returned signal.
+ (RACSignal *)switch:(RACSignal *)signal cases:(NSDictionary *)cases default:(RACSignal *)defaultSignal;

/// Switches between `trueSignal` and `falseSignal` based on the latest value
/// sent by `boolSignal`.
///
/// boolSignal  - A signal of BOOLs determining whether `trueSignal` or
///               `falseSignal` should be active. This argument must not be nil.
/// trueSignal  - The signal to pass through after `boolSignal` has sent YES.
///               This argument must not be nil.
/// falseSignal - The signal to pass through after `boolSignal` has sent NO. This
///               argument must not be nil.
///
/// Returns a signal which passes through `next`s and `error`s from `trueSignal`
/// and/or `falseSignal`, and sends `completed` when both `boolSignal` and the
/// last switched signal complete.
+ (RACSignal *)if:(RACSignal *)boolSignal then:(RACSignal *)trueSignal else:(RACSignal *)falseSignal;

/// Adds every `next` to an array. Nils are represented by NSNulls. Note that
/// this is a blocking call.
///
/// **This is not the same as the `ToArray` method in Rx.** See -collect for
/// that behavior instead.
///
/// Returns the array of `next` values, or nil if an error occurs.
- (NSArray *)toArray;

/// Adds every `next` to a sequence. Nils are represented by NSNulls.
///
/// This corresponds to the `ToEnumerable` method in Rx.
///
/// Returns a sequence which provides values from the signal as they're sent.
/// Trying to retrieve a value from the sequence which has not yet been sent will
/// block.
@property (nonatomic, strong, readonly) RACSequence *sequence;

/// Creates and returns a multicast connection. This allows you to share a single
/// subscription to the underlying signal.
- (RACMulticastConnection *)publish;

/// Creates and returns a multicast connection that pushes values into the given
/// subject. This allows you to share a single subscription to the underlying
/// signal.
- (RACMulticastConnection *)multicast:(RACSubject *)subject;

/// Multicasts the signal to a RACReplaySubject of unlimited capacity, and
/// immediately connects to the resulting RACMulticastConnection.
///
/// Returns the connected, multicasted signal.
- (RACSignal *)replay;

/// Multicasts the signal to a RACReplaySubject of capacity 1, and immediately
/// connects to the resulting RACMulticastConnection.
///
/// Returns the connected, multicasted signal.
- (RACSignal *)replayLast;

/// Multicasts the signal to a RACReplaySubject of unlimited capacity, and
/// lazily connects to the resulting RACMulticastConnection.
///
/// This means the returned signal will subscribe to the multicasted signal only
/// when the former receives its first subscription.
///
/// Returns the lazily connected, multicasted signal.
- (RACSignal *)replayLazily;

/// Sends an error after `interval` seconds if the source doesn't complete
/// before then.
///
/// The error will be in the RACSignalErrorDomain and have a code of
/// RACSignalErrorTimedOut.
///
/// interval  - The number of seconds after which the signal should error out.
/// scheduler - The scheduler upon which any timeout error should be sent. This
///             must not be nil or +[RACScheduler immediateScheduler].
///
/// Returns a signal that passes through the receiver's events, until the stream
/// finishes or times out, at which point an error will be sent on `scheduler`.
- (RACSignal *)timeout:(NSTimeInterval)interval onScheduler:(RACScheduler *)scheduler;

/// Creates and returns a signal that delivers its events on the given scheduler.
/// Any side effects of the receiver will still be performed on the original
/// thread.
///
/// This is ideal when the signal already performs its work on the desired
/// thread, but you want to handle its events elsewhere.
///
/// This corresponds to the `ObserveOn` method in Rx.
- (RACSignal *)deliverOn:(RACScheduler *)scheduler;

/// Creates and returns a signal that executes its side effects and delivers its
/// events on the given scheduler.
///
/// Use of this operator should be avoided whenever possible, because the
/// receiver's side effects may not be safe to run on another thread. If you just
/// want to receive the signal's events on `scheduler`, use -deliverOn: instead.
- (RACSignal *)subscribeOn:(RACScheduler *)scheduler;

/// Creates and returns a signal that delivers its events on the main thread.
/// If events are already being sent on the main thread, they may be passed on
/// without delay. An event will instead be queued for later delivery on the main
/// thread if sent on another thread, or if a previous event is already being
/// processed, or has been queued.
///
/// Any side effects of the receiver will still be performed on the original
/// thread.
///
/// This can be used when a signal will cause UI updates, to avoid potential
/// flicker caused by delayed delivery of events, such as the first event from
/// a RACObserve at view instantiation.
- (RACSignal *)deliverOnMainThread;

/// Groups each received object into a group, as determined by calling `keyBlock`
/// with that object. The object sent is transformed by calling `transformBlock`
/// with the object. If `transformBlock` is nil, it sends the original object.
///
/// The returned signal is a signal of RACGroupedSignal.
- (RACSignal *)groupBy:(id<NSCopying> (^)(id object))keyBlock transform:(id (^)(id object))transformBlock;

/// Calls -[RACSignal groupBy:keyBlock transform:nil].
- (RACSignal *)groupBy:(id<NSCopying> (^)(id object))keyBlock;

/// Sends an [NSNumber numberWithBool:YES] if the receiving signal sends any
/// objects.
- (RACSignal *)any;

/// Sends an [NSNumber numberWithBool:YES] if the receiving signal sends any
/// objects that pass `predicateBlock`.
///
/// predicateBlock - cannot be nil.
- (RACSignal *)any:(BOOL (^)(id object))predicateBlock;

/// Sends an [NSNumber numberWithBool:YES] if all the objects the receiving 
/// signal sends pass `predicateBlock`.
///
/// predicateBlock - cannot be nil.
- (RACSignal *)all:(BOOL (^)(id object))predicateBlock;

/// Resubscribes to the receiving signal if an error occurs, up until it has
/// retried the given number of times.
///
/// retryCount - if 0, it keeps retrying until it completes.
- (RACSignal *)retry:(NSInteger)retryCount;

/// Resubscribes to the receiving signal if an error occurs.
- (RACSignal *)retry;

/// Sends the latest value from the receiver only when `sampler` sends a value.
/// The returned signal could repeat values if `sampler` fires more often than
/// the receiver. Values from `sampler` are ignored before the receiver sends
/// its first value.
///
/// sampler - The signal that controls when the latest value from the receiver
///           is sent. Cannot be nil.
- (RACSignal *)sample:(RACSignal *)sampler;

/// Ignores all `next`s from the receiver.
///
/// Returns a signal which only passes through `error` or `completed` events from
/// the receiver.
- (RACSignal *)ignoreValues;

/// Converts each of the receiver's events into a RACEvent object.
///
/// Returns a signal which sends the receiver's events as RACEvents, and
/// completes after the receiver sends `completed` or `error`.
- (RACSignal *)materialize;

/// Converts each RACEvent in the receiver back into "real" RACSignal events.
///
/// Returns a signal which sends `next` for each value RACEvent, `error` for each
/// error RACEvent, and `completed` for each completed RACEvent.
- (RACSignal *)dematerialize;

/// Inverts each NSNumber-wrapped BOOL sent by the receiver. It will assert if
/// the receiver sends anything other than NSNumbers.
///
/// Returns a signal of inverted NSNumber-wrapped BOOLs.
- (RACSignal *)not;

/// Performs a boolean AND on all of the RACTuple of NSNumbers in sent by the receiver.
///
/// Asserts if the receiver sends anything other than a RACTuple of one or more NSNumbers.
///
/// Returns a signal that applies AND to each NSNumber in the tuple.
- (RACSignal *)and;

/// Performs a boolean OR on all of the RACTuple of NSNumbers in sent by the receiver.
///
/// Asserts if the receiver sends anything other than a RACTuple of one or more NSNumbers.
/// 
/// Returns a signal that applies OR to each NSNumber in the tuple.
- (RACSignal *)or;

/// Sends the result of calling the block with arguments as packed in each RACTuple
/// sent by the receiver.
///
/// The receiver must send tuple values, where the first element of the tuple is
/// a block, taking a number of parameters equal to the count of the remaining
/// elements of the tuple, and returning an object. Each block must take at least
/// one argument, so each tuple must contain at least 2 elements.
///
/// Example:
///
///   RACSignal *adder = [RACSignal return:^(NSNumber *a, NSNumber *b) {
///       return @(a.intValue + b.intValue);
///   }];
///   RACSignal *sums = [[RACSignal
///       combineLatest:@[ adder, as, bs ]]
///       reduceApply];
///
/// Returns a signal of the result of applying the first element of each tuple
/// to the remaining elements.
- (RACSignal *)reduceApply;

@end

@interface RACSignal (OperationsDeprecated)

- (RACSignal *)windowWithStart:(RACSignal *)openSignal close:(RACSignal * (^)(RACSignal *start))closeBlock __attribute__((deprecated("See https://github.com/ReactiveCocoa/ReactiveCocoa/issues/587")));
- (RACSignal *)buffer:(NSUInteger)bufferCount __attribute__((deprecated("See https://github.com/ReactiveCocoa/ReactiveCocoa/issues/587")));
- (RACSignal *)let:(RACSignal * (^)(RACSignal *sharedSignal))letBlock __attribute__((deprecated("Use -publish instead")));
+ (RACSignal *)interval:(NSTimeInterval)interval __attribute__((deprecated("Use +interval:onScheduler: instead")));
+ (RACSignal *)interval:(NSTimeInterval)interval withLeeway:(NSTimeInterval)leeway __attribute__((deprecated("Use +interval:onScheduler:withLeeway: instead")));
- (RACSignal *)bufferWithTime:(NSTimeInterval)interval __attribute__((deprecated("Use -bufferWithTime:onScheduler: instead")));
- (RACSignal *)timeout:(NSTimeInterval)interval __attribute__((deprecated("Use -timeout:onScheduler: instead")));
- (RACDisposable *)toProperty:(NSString *)keyPath onObject:(NSObject *)object __attribute__((deprecated("Renamed to -setKeyPath:onObject:")));
- (RACSignal *)ignoreElements __attribute__((deprecated("Renamed to -ignoreValues")));
- (RACSignal *)sequenceNext:(RACSignal * (^)(void))block __attribute__((deprecated("Renamed to -then:")));
- (RACSignal *)aggregateWithStart:(id)start combine:(id (^)(id running, id next))combineBlock __attribute__((deprecated("Renamed to -aggregateWithStart:reduce:")));
- (RACSignal *)aggregateWithStartFactory:(id (^)(void))startFactory combine:(id (^)(id running, id next))combineBlock __attribute__((deprecated("Renamed to -aggregateWithStartFactory:reduce:")));
- (RACDisposable *)executeCommand:(RACCommand *)command __attribute__((deprecated("Use -flattenMap: or -subscribeNext: instead")));

@end
