//
//  RACScopedDisposable.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 3/28/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import "RACDisposable.h"

/// A disposable that calls its own -dispose when it is dealloc'd.
@interface RACScopedDisposable : RACDisposable

/// Creates a new scoped disposable that will also dispose of the given
/// disposable when it is dealloc'd.
+ (instancetype)scopedDisposableWithDisposable:(RACDisposable *)disposable;

@end
