//
//  NSObject+RACDeallocating.h
//  ReactiveCocoa
//
//  Created by Kazuo Koga on 2013/03/15.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACCompoundDisposable;
@class RACDisposable;
@class RACSignal;

@interface NSObject (RACDeallocating)

/// The compound disposable which will be disposed of when the receiver is
/// deallocated.
@property (atomic, readonly, strong) RACCompoundDisposable *rac_deallocDisposable;

/// Returns a signal that will complete immediately before the receiver is fully
/// deallocated. If already deallocated when the signal is subscribed to,
/// a `completed` event will be sent immediately.
- (RACSignal *)rac_willDeallocSignal;

@end

@interface NSObject (RACDeallocatingDeprecated)

- (RACSignal *)rac_didDeallocSignal __attribute__((deprecated("Use -rac_willDeallocSignal")));

- (void)rac_addDeallocDisposable:(RACDisposable *)disposable __attribute__((deprecated("Add disposables to -rac_deallocDisposable instead")));

@end
