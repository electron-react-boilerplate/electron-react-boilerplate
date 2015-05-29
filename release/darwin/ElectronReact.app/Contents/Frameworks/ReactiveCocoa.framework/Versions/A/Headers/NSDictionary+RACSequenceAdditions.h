//
//  NSDictionary+RACSequenceAdditions.h
//  ReactiveCocoa
//
//  Created by Justin Spahr-Summers on 2012-10-29.
//  Copyright (c) 2012 GitHub. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RACSequence;

@interface NSDictionary (RACSequenceAdditions)

/// Creates and returns a sequence of RACTuple key/value pairs. The key will be
/// the first element in the tuple, and the value will be the second.
///
/// Mutating the receiver will not affect the sequence after it's been created.
@property (nonatomic, copy, readonly) RACSequence *rac_sequence;

/// Creates and returns a sequence corresponding to the keys in the receiver.
///
/// Mutating the receiver will not affect the sequence after it's been created.
@property (nonatomic, copy, readonly) RACSequence *rac_keySequence;

/// Creates and returns a sequence corresponding to the values in the receiver.
///
/// Mutating the receiver will not affect the sequence after it's been created.
@property (nonatomic, copy, readonly) RACSequence *rac_valueSequence;

@end
