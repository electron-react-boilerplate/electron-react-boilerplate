//
//  RACStream.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2012-10-31.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACStream;

/// A block which accepts a value from a RACStream and returns a new instance
/// of the same stream class.
///
/// Setting `stop` to `YES` will cause the bind to terminate after the returned
/// value. Returning `nil` will result in immediate termination.
typedef RACStream * (^RACStreamBindBlock)(id value, BOOL *stop);

/// An abstract class representing any stream of values.
///
/// This class represents a monad, upon which many stream-based operations can
/// be built.
///
/// When subclassing RACStream, only the methods in the main @interface body need
/// to be overridden.
@interface RACStream : NSObject

/// Returns an empty stream.
+ (instancetype)empty;

/// Lifts `value` into the stream monad.
///
/// Returns a stream containing only the given value.
+ (instancetype)return:(id)value;

/// Lazily binds a block to the values in the receiver.
///
/// This should only be used if you need to terminate the bind early, or close
/// over some state. -flattenMap: is more appropriate for all other cases.
///
/// block - A block returning a RACStreamBindBlock. This block will be invoked
///         each time the bound stream is re-evaluated. This block must not be
///         nil or return nil.
///
/// Returns a new stream which represents the combined result of all lazy
/// applications of `block`.
- (instancetype)bind:(RACStreamBindBlock (^)(void))block;

/// Appends the values of `stream` to the values in the receiver.
///
/// stream - A stream to concatenate. This must be an instance of the same
///          concrete class as the receiver, and should not be `nil`.
///
/// Returns a new stream representing the receiver followed by `stream`.
- (instancetype)concat:(RACStream *)stream;

/// Zips the values in the receiver with those of the given stream to create
/// RACTuples.
///
/// The first value of each stream will be combined, then the second value, and
/// so forth, until at least one of the streams is exhausted.
///
/// stream - The stream to zip with. This must be an instance of the same
///          concrete class as the receiver, and should not be `nil`.
///
/// Returns a new stream of RACTuples, representing the zipped values of the
/// two streams.
- (instancetype)zipWith:(RACStream *)stream;

@end

/// This extension contains functionality to support naming streams for
/// debugging.
///
/// Subclasses do not need to override the methods here.
@interface RACStream ()

/// The name of the stream. This is for debugging/human purposes only.
@property (copy) NSString *name;

/// Sets the name of the receiver to the given format string.
///
/// This is for debugging purposes only, and won't do anything unless the
/// RAC_DEBUG_SIGNAL_NAMES environment variable is set.
///
/// Returns the receiver, for easy method chaining.
- (instancetype)setNameWithFormat:(NSString *)format, ... NS_FORMAT_FUNCTION(1, 2);

@end

/// Operations built on the RACStream primitives.
///
/// These methods do not need to be overridden, although subclasses may
/// occasionally gain better performance from doing so.
@interface RACStream (Operations)

/// Maps `block` across the values in the receiver and flattens the result.
///
/// Note that operators applied _after_ -flattenMap: behave differently from
/// operators _within_ -flattenMap:. See the Examples section below.
///
/// This corresponds to the `SelectMany` method in Rx.
///
/// block - A block which accepts the values in the receiver and returns a new
///         instance of the receiver's class. Returning `nil` from this block is
///         equivalent to returning an empty signal.
///
/// Examples
///
///   [signal flattenMap:^(id x) {
///       // Logs each time a returned signal completes.
///       return [[RACSignal return:x] logCompleted];
///   }];
///
///   [[signal
///       flattenMap:^(id x) {
///           return [RACSignal return:x];
///       }]
///       // Logs only once, when all of the signals complete.
///       logCompleted];
///
/// Returns a new stream which represents the combined streams resulting from
/// mapping `block`.
- (instancetype)flattenMap:(RACStream * (^)(id value))block;

/// Flattens a stream of streams.
///
/// This corresponds to the `Merge` method in Rx.
///
/// Returns a stream consisting of the combined streams obtained from the
/// receiver.
- (instancetype)flatten;

/// Maps `block` across the values in the receiver.
///
/// This corresponds to the `Select` method in Rx.
///
/// Returns a new stream with the mapped values.
- (instancetype)map:(id (^)(id value))block;

/// Replaces each value in the receiver with the given object.
///
/// Returns a new stream which includes the given object once for each value in
/// the receiver.
- (instancetype)mapReplace:(id)object;

/// Filters out values in the receiver that don't pass the given test.
///
/// This corresponds to the `Where` method in Rx.
///
/// Returns a new stream with only those values that passed.
- (instancetype)filter:(BOOL (^)(id value))block;

/// Filters out values in the receiver that equal (via -isEqual:) the provided value.
///
/// value - The value can be `nil`, in which case it ignores `nil` values.
///
/// Returns a new stream containing only the values which did not compare equal
/// to `value`.
- (instancetype)ignore:(id)value;

/// Unpacks each RACTuple in the receiver and maps the values to a new value.
///
/// reduceBlock - The block which reduces each RACTuple's values into one value.
///               It must take as many arguments as the number of tuple elements
///               to process. Each argument will be an object argument. The
///               return value must be an object. This argument cannot be nil.
///
/// Returns a new stream of reduced tuple values.
- (instancetype)reduceEach:(id (^)())reduceBlock;

/// Returns a stream consisting of `value`, followed by the values in the
/// receiver.
- (instancetype)startWith:(id)value;

/// Skips the first `skipCount` values in the receiver.
///
/// Returns the receiver after skipping the first `skipCount` values. If
/// `skipCount` is greater than the number of values in the stream, an empty
/// stream is returned.
- (instancetype)skip:(NSUInteger)skipCount;

/// Returns a stream of the first `count` values in the receiver. If `count` is
/// greater than or equal to the number of values in the stream, a stream
/// equivalent to the receiver is returned.
- (instancetype)take:(NSUInteger)count;

/// Zips the values in the given streams to create RACTuples.
///
/// The first value of each stream will be combined, then the second value, and
/// so forth, until at least one of the streams is exhausted.
///
/// streams - The streams to combine. These must all be instances of the same
///           concrete class implementing the protocol. If this collection is
///           empty, the returned stream will be empty.
///
/// Returns a new stream containing RACTuples of the zipped values from the
/// streams.
+ (instancetype)zip:(id<NSFastEnumeration>)streams;

/// Zips streams using +zip:, then reduces the resulting tuples into a single
/// value using -reduceEach:
///
/// streams     - The streams to combine. These must all be instances of the
///               same concrete class implementing the protocol. If this
///               collection is empty, the returned stream will be empty.
/// reduceBlock - The block which reduces the values from all the streams
///               into one value. It must take as many arguments as the
///               number of streams given. Each argument will be an object
///               argument. The return value must be an object. This argument
///               must not be nil.
///
/// Example:
///
///   [RACStream zip:@[ stringSignal, intSignal ] reduce:^(NSString *string, NSNumber *number) {
///       return [NSString stringWithFormat:@"%@: %@", string, number];
///   }];
///
/// Returns a new stream containing the results from each invocation of
/// `reduceBlock`.
+ (instancetype)zip:(id<NSFastEnumeration>)streams reduce:(id (^)())reduceBlock;

/// Returns a stream obtained by concatenating `streams` in order.
+ (instancetype)concat:(id<NSFastEnumeration>)streams;

/// Combines values in the receiver from left to right using the given block.
///
/// The algorithm proceeds as follows:
///
///  1. `startingValue` is passed into the block as the `running` value, and the
///  first element of the receiver is passed into the block as the `next` value.
///  2. The result of the invocation is added to the returned stream.
///  3. The result of the invocation (`running`) and the next element of the
///  receiver (`next`) is passed into `block`.
///  4. Steps 2 and 3 are repeated until all values have been processed.
///
/// startingValue - The value to be combined with the first element of the
///                 receiver. This value may be `nil`.
/// reduceBlock   - The block that describes how to combine values of the
///                 receiver. If the receiver is empty, this block will never be
///                 invoked. Cannot be nil.
///
/// Examples
///
///      RACSequence *numbers = @[ @1, @2, @3, @4 ].rac_sequence;
///
///      // Contains 1, 3, 6, 10
///      RACSequence *sums = [numbers scanWithStart:@0 reduce:^(NSNumber *sum, NSNumber *next) {
///          return @(sum.integerValue + next.integerValue);
///      }];
///
/// Returns a new stream that consists of each application of `reduceBlock`. If the
/// receiver is empty, an empty stream is returned.
- (instancetype)scanWithStart:(id)startingValue reduce:(id (^)(id running, id next))reduceBlock;

/// Combines values in the receiver from left to right using the given block
/// which also takes zero-based index of the values.
///
/// startingValue - The value to be combined with the first element of the
///                 receiver. This value may be `nil`.
/// reduceBlock   - The block that describes how to combine values of the
///                 receiver. This block takes zero-based index value as the last
///                 parameter. If the receiver is empty, this block will never
///                 be invoked. Cannot be nil.
///
/// Returns a new stream that consists of each application of `reduceBlock`. If the
/// receiver is empty, an empty stream is returned.
- (instancetype)scanWithStart:(id)startingValue reduceWithIndex:(id (^)(id running, id next, NSUInteger index))reduceBlock;

/// Combines each previous and current value into one object.
///
/// This method is similar to -scanWithStart:reduce:, but only ever operates on
/// the previous and current values (instead of the whole stream), and does not
/// pass the return value of `reduceBlock` into the next invocation of it.
///
/// start       - The value passed into `reduceBlock` as `previous` for the
///               first value.
/// reduceBlock - The block that combines the previous value and the current
///               value to create the reduced value. Cannot be nil.
///
/// Examples
///
///      RACSequence *numbers = @[ @1, @2, @3, @4 ].rac_sequence;
///
///      // Contains 1, 3, 5, 7
///      RACSequence *sums = [numbers combinePreviousWithStart:@0 reduce:^(NSNumber *previous, NSNumber *next) {
///          return @(previous.integerValue + next.integerValue);
///      }];
///
/// Returns a new stream consisting of the return values from each application of
/// `reduceBlock`.
- (instancetype)combinePreviousWithStart:(id)start reduce:(id (^)(id previous, id current))reduceBlock;

/// Takes values until the given block returns `YES`.
///
/// Returns a stream of the initial values in the receiver that fail `predicate`.
/// If `predicate` never returns `YES`, a stream equivalent to the receiver is
/// returned.
- (instancetype)takeUntilBlock:(BOOL (^)(id x))predicate;

/// Takes values until the given block returns `NO`.
///
/// Returns a stream of the initial values in the receiver that pass `predicate`.
/// If `predicate` never returns `NO`, a stream equivalent to the receiver is
/// returned.
- (instancetype)takeWhileBlock:(BOOL (^)(id x))predicate;

/// Skips values until the given block returns `YES`.
///
/// Returns a stream containing the values of the receiver that follow any
/// initial values failing `predicate`. If `predicate` never returns `YES`,
/// an empty stream is returned.
- (instancetype)skipUntilBlock:(BOOL (^)(id x))predicate;

/// Skips values until the given block returns `NO`.
///
/// Returns a stream containing the values of the receiver that follow any
/// initial values passing `predicate`. If `predicate` never returns `NO`, an
/// empty stream is returned.
- (instancetype)skipWhileBlock:(BOOL (^)(id x))predicate;

/// Returns a stream of values for which -isEqual: returns NO when compared to the
/// previous value.
- (instancetype)distinctUntilChanged;

@end

@interface RACStream (Deprecated)

- (instancetype)sequenceMany:(RACStream * (^)(void))block __attribute__((deprecated("Use -flattenMap: instead")));
- (instancetype)scanWithStart:(id)startingValue combine:(id (^)(id running, id next))block __attribute__((deprecated("Renamed to -scanWithStart:reduce:")));
- (instancetype)mapPreviousWithStart:(id)start reduce:(id (^)(id previous, id current))combineBlock __attribute__((deprecated("Renamed to -combinePreviousWithStart:reduce:")));

@end
