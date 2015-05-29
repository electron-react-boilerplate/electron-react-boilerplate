//
//  RACCompoundDisposable.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 11/30/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import "RACDisposable.h"

/// A disposable of disposables. When it is disposed, it disposes of all its
/// contained disposables.
///
/// If -addDisposable: is called after the compound disposable has been disposed
/// of, the given disposable is immediately disposed. This allows a compound
/// disposable to act as a stand-in for a disposable that will be delivered
/// asynchronously.
@interface RACCompoundDisposable : RACDisposable

/// Creates and returns a new compound disposable.
+ (instancetype)compoundDisposable;

/// Creates and returns a new compound disposable containing the given
/// disposables.
+ (instancetype)compoundDisposableWithDisposables:(NSArray *)disposables;

/// Adds the given disposable. If the receiving disposable has already been
/// disposed of, the given disposable is disposed immediately.
///
/// This method is thread-safe.
///
/// disposable - The disposable to add. This may be nil, in which case nothing
///              happens.
- (void)addDisposable:(RACDisposable *)disposable;

/// Removes the specified disposable from the compound disposable (regardless of
/// its disposed status), or does nothing if it's not in the compound disposable.
///
/// This is mainly useful for limiting the memory usage of the compound
/// disposable for long-running operations.
///
/// This method is thread-safe.
///
/// disposable - The disposable to remove. This argument may be nil (to make the
///              use of weak references easier).
- (void)removeDisposable:(RACDisposable *)disposable;

@end
