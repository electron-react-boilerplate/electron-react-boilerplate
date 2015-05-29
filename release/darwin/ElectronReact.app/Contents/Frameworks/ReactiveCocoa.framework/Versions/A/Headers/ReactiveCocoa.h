//
//  ReactiveCocoa.h
//  ReactiveCocoa
//
//  Created by Josh Abernathy on 3/5/12.
//  Copyright (c) 2012 GitHub, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

//! Project version number for ReactiveCocoa.
FOUNDATION_EXPORT double ReactiveCocoaVersionNumber;

//! Project version string for ReactiveCocoa.
FOUNDATION_EXPORT const unsigned char ReactiveCocoaVersionString[];

#import <ReactiveCocoa/EXTKeyPathCoding.h>
#import <ReactiveCocoa/EXTScope.h>
#import <ReactiveCocoa/NSArray+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSData+RACSupport.h>
#import <ReactiveCocoa/NSDictionary+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSEnumerator+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSFileHandle+RACSupport.h>
#import <ReactiveCocoa/NSNotificationCenter+RACSupport.h>
#import <ReactiveCocoa/NSObject+RACDeallocating.h>
#import <ReactiveCocoa/NSObject+RACLifting.h>
#import <ReactiveCocoa/NSObject+RACPropertySubscribing.h>
#import <ReactiveCocoa/NSObject+RACSelectorSignal.h>
#import <ReactiveCocoa/NSOrderedSet+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSSet+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSString+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSString+RACSupport.h>
#import <ReactiveCocoa/NSIndexSet+RACSequenceAdditions.h>
#import <ReactiveCocoa/NSURLConnection+RACSupport.h>
#import <ReactiveCocoa/NSUserDefaults+RACSupport.h>
#import <ReactiveCocoa/RACBacktrace.h>
#import <ReactiveCocoa/RACBehaviorSubject.h>
#import <ReactiveCocoa/RACChannel.h>
#import <ReactiveCocoa/RACCommand.h>
#import <ReactiveCocoa/RACCompoundDisposable.h>
#import <ReactiveCocoa/RACDisposable.h>
#import <ReactiveCocoa/RACEvent.h>
#import <ReactiveCocoa/RACGroupedSignal.h>
#import <ReactiveCocoa/RACKVOChannel.h>
#import <ReactiveCocoa/RACMulticastConnection.h>
#import <ReactiveCocoa/RACQueueScheduler.h>
#import <ReactiveCocoa/RACQueueScheduler+Subclass.h>
#import <ReactiveCocoa/RACReplaySubject.h>
#import <ReactiveCocoa/RACScheduler.h>
#import <ReactiveCocoa/RACScheduler+Subclass.h>
#import <ReactiveCocoa/RACScopedDisposable.h>
#import <ReactiveCocoa/RACSequence.h>
#import <ReactiveCocoa/RACSerialDisposable.h>
#import <ReactiveCocoa/RACSignal+Operations.h>
#import <ReactiveCocoa/RACSignal.h>
#import <ReactiveCocoa/RACStream.h>
#import <ReactiveCocoa/RACSubject.h>
#import <ReactiveCocoa/RACSubscriber.h>
#import <ReactiveCocoa/RACSubscriptingAssignmentTrampoline.h>
#import <ReactiveCocoa/RACTargetQueueScheduler.h>
#import <ReactiveCocoa/RACTestScheduler.h>
#import <ReactiveCocoa/RACTuple.h>
#import <ReactiveCocoa/RACUnit.h>

#ifdef __IPHONE_OS_VERSION_MIN_REQUIRED
	#import <ReactiveCocoa/UIActionSheet+RACSignalSupport.h>
	#import <ReactiveCocoa/UIAlertView+RACSignalSupport.h>
	#import <ReactiveCocoa/UIBarButtonItem+RACCommandSupport.h>
	#import <ReactiveCocoa/UIButton+RACCommandSupport.h>
	#import <ReactiveCocoa/UICollectionReusableView+RACSignalSupport.h>
	#import <ReactiveCocoa/UIControl+RACSignalSupport.h>
	#import <ReactiveCocoa/UIDatePicker+RACSignalSupport.h>
	#import <ReactiveCocoa/UIGestureRecognizer+RACSignalSupport.h>
	#import <ReactiveCocoa/UIImagePickerController+RACSignalSupport.h>
	#import <ReactiveCocoa/UIRefreshControl+RACCommandSupport.h>
	#import <ReactiveCocoa/UISegmentedControl+RACSignalSupport.h>
	#import <ReactiveCocoa/UISlider+RACSignalSupport.h>
	#import <ReactiveCocoa/UIStepper+RACSignalSupport.h>
	#import <ReactiveCocoa/UISwitch+RACSignalSupport.h>
	#import <ReactiveCocoa/UITableViewCell+RACSignalSupport.h>
	#import <ReactiveCocoa/UITableViewHeaderFooterView+RACSignalSupport.h>
	#import <ReactiveCocoa/UITextField+RACSignalSupport.h>
	#import <ReactiveCocoa/UITextView+RACSignalSupport.h>
#elif TARGET_OS_MAC
	#import <ReactiveCocoa/NSControl+RACCommandSupport.h>
	#import <ReactiveCocoa/NSControl+RACTextSignalSupport.h>
	#import <ReactiveCocoa/NSObject+RACAppKitBindings.h>
	#import <ReactiveCocoa/NSText+RACSignalSupport.h>
#endif
