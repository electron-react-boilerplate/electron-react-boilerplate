//
//  NSArray+RACSequenceAdditions.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2012-10-29.
//  Copyright (c) 2012 GitHub. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACSequence;

@interface NSArray (RACSequenceAdditions)

/// Creates and returns a sequence corresponding to the receiver.
///
/// Mutating the receiver will not affect the sequence after it's been created.
@property (nonatomic, copy, readonly) RACSequence *rac_sequence;

@end
