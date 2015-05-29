//
//  RACSequence.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2012-10-29.
//  Copyright (c) 2012 GitHub. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RACStream.h"

@class RACScheduler;
@class RACSignal;

/// Represents an immutable sequence of values. Unless otherwise specified, the
/// sequences' values are evaluated lazily on demand. Like Cocoa collections,
/// sequences cannot contain nil.
///
/// Most inherited RACStream methods that accept a block will execute the block
/// _at most_ once for each value that is evaluated in the returned sequence.
/// Side effects are subject to the behavior described in
/// +sequenceWithHeadBlock:tailBlock:.
///
/// Implemented as a class cluster. A minimal implementation for a subclass
/// consists simply of -head and -tail.
@interface RACSequence : RACStream <NSCoding, NSCopying, NSFastEnumeration>

/// The first object in the sequence, or nil if the sequence is empty.
///
/// Subclasses must provide an implementation of this method.
@property (nonatomic, strong, readonly) id head;

/// All but the first object in the sequence, or nil if the sequence is empty.
///
/// Subclasses must provide an implementation of this method.
@property (nonatomic, strong, readonly) RACSequence *tail;

/// Evaluates the full sequence to produce an equivalently-sized array.
@property (nonatomic, copy, readonly) NSArray *array;

/// Returns an enumerator of all objects in the sequence.
@property (nonatomic, copy, readonly) NSEnumerator *objectEnumerator;

/// Converts a sequence into an eager sequence.
///
/// An eager sequence fully evaluates all of its values immediately. Sequences
/// derived from an eager sequence will also be eager.
///
/// Returns a new eager sequence, or the receiver if the sequence is already
/// eager.
@property (nonatomic, copy, readonly) RACSequence *eagerSequence;

/// Converts a sequence into a lazy sequence.
///
/// A lazy sequence evaluates its values on demand, as they are accessed.
/// Sequences derived from a lazy sequence will also be lazy.
///
/// Returns a new lazy sequence, or the receiver if the sequence is already lazy.
@property (nonatomic, copy, readonly) RACSequence *lazySequence;

/// Invokes -signalWithScheduler: with a new RACScheduler.
- (RACSignal *)signal;

/// Evaluates the full sequence on the given scheduler.
///
/// Each item is evaluated in its own scheduled block, such that control of the
/// scheduler is yielded between each value.
///
/// Returns a signal which sends the receiver's values on the given scheduler as
/// they're evaluated.
- (RACSignal *)signalWithScheduler:(RACScheduler *)scheduler;

/// Applies a left fold to the sequence.
///
/// This is the same as iterating the sequence along with a provided start value.
/// This uses a constant amount of memory. A left fold is left-associative so in
/// the sequence [1,2,3] the block would applied in the following order:
///  reduce(reduce(reduce(start, 1), 2), 3)
///
/// start  - The starting value for the fold. Used as `accumulator` for the
///          first fold.
/// reduce - The block used to combine the accumulated value and the next value.
///          Cannot be nil.
///
/// Returns a reduced value.
- (id)foldLeftWithStart:(id)start reduce:(id (^)(id accumulator, id value))reduce;

/// Applies a right fold to the sequence.
///
/// A right fold is equivalent to recursion on the list. The block is evaluated
/// from the right to the left in list. It is right associative so it's applied
/// to the rightmost elements first. For example, in the sequence [1,2,3] the
/// block is applied in the order:
///   reduce(1, reduce(2, reduce(3, start)))
///
/// start  - The starting value for the fold.
/// reduce - The block used to combine the accumulated value and the next head.
///          The block is given the accumulated value and the value of the rest
///          of the computation (result of the recursion). This is computed when
///          you retrieve its value using `rest.head`. This allows you to
///          prevent unnecessary computation by not accessing `rest.head` if you
///          don't need to.
///
/// Returns a reduced value.
- (id)foldRightWithStart:(id)start reduce:(id (^)(id first, RACSequence *rest))reduce;

/// Check if any value in sequence passes the block.
///
/// block - The block predicate used to check each item. Cannot be nil.
///
/// Returns a boolean indiciating if any value in the sequence passed.
- (BOOL)any:(BOOL (^)(id value))block;

/// Check if all values in the sequence pass the block.
///
/// block - The block predicate used to check each item. Cannot be nil.
///
/// Returns a boolean indicating if all values in the sequence passed.
- (BOOL)all:(BOOL (^)(id value))block;

/// Returns the first object that passes the block.
///
/// block - The block predicate used to check each item. Cannot be nil.
///
/// Returns an object that passes the block or nil if no objects passed.
- (id)objectPassingTest:(BOOL (^)(id value))block;

/// Creates a sequence that dynamically generates its values.
///
/// headBlock - Invoked the first time -head is accessed.
/// tailBlock - Invoked the first time -tail is accessed.
///
/// The results from each block are memoized, so each block will be invoked at
/// most once, no matter how many times the head and tail properties of the
/// sequence are accessed.
///
/// Any side effects in `headBlock` or `tailBlock` should be thread-safe, since
/// the sequence may be evaluated at any time from any thread. Not only that, but
/// -tail may be accessed before -head, or both may be accessed simultaneously.
/// As noted above, side effects will only be triggered the _first_ time -head or
/// -tail is invoked.
///
/// Returns a sequence that lazily invokes the given blocks to provide head and
/// tail. `headBlock` must not be nil.
+ (RACSequence *)sequenceWithHeadBlock:(id (^)(void))headBlock tailBlock:(RACSequence *(^)(void))tailBlock;

@end

@interface RACSequence (Deprecated)

- (id)foldLeftWithStart:(id)start combine:(id (^)(id accumulator, id value))combine __attribute__((deprecated("Renamed to -foldLeftWithStart:reduce:")));
- (id)foldRightWithStart:(id)start combine:(id (^)(id first, RACSequence *rest))combine __attribute__((deprecated("Renamed to -foldRightWithStart:reduce:")));

@end
