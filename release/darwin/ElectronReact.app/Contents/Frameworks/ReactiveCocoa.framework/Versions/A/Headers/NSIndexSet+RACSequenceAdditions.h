//
//  NSIndexSet+RACSequenceAdditions.h
//  ReactiveCocoa
//
//  Created by Sergey Gavrilyuk on 12/17/13.
//  Copyright (c) 2013 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACSequence;

@interface NSIndexSet (RACSequenceAdditions)

/// Creates and returns a sequence of indexes (as `NSNumber`s) corresponding to
/// the receiver.
///
/// Mutating the receiver will not affect the sequence after it's been created.
@property (nonatomic, copy, readonly) RACSequence *rac_sequence;

@end
