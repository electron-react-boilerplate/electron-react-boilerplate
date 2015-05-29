//
//  MTLManagedObjectAdapter.h
//  Mantle
//
//  Created by Justin Spahr-Summers on 2013-03-29.
//  Copyright (c) 2013 GitHub. All rights reserved.
//

#import <CoreData/CoreData.h>

@class MTLModel;

// A MTLModel object that supports being serialized to and from Core Data as an
// NSManagedObject.
@protocol MTLManagedObjectSerializing
@required

// The name of the Core Data entity that the receiver serializes to and
// deserializes from.
//
// This method must not return nil.
+ (NSString *)managedObjectEntityName;

// Specifies how to map property keys to different keys on the receiver's
// +managedObjectEntity.
//
// Entity attributes will be mapped to and from the receiver's properties using
// +entityAttributeTransformerForKey:. Entity relationships will be mapped to
// and from MTLModel objects using +relationshipModelClassesByPropertyKey.
// Fetched properties are not supported.
//
// Subclasses overriding this method should combine their values with those of
// `super`.
//
// Any property keys not present in the dictionary are assumed to match the
// entity key that should be used. Any keys associated with NSNull will not
// participate in managed object serialization.
//
// Returns a dictionary mapping property keys to entity keys (as strings) or
// NSNull values.
+ (NSDictionary *)managedObjectKeysByPropertyKey;

@optional

// Specifies a set of property keys used by the adapter to check for an already
// existing managed object when converting the MTLModel to its related
// NSManagedObject.
//
// The adapter will first map any keys provided by this method to the correct
// keys in managedObjectKeysByPropertyKey.
//
// The adapter will then perform a fetch request in the provided context for a
// managed object that matches the MTLModel's managedObjectEntityName and has
// equal values set for the property keys on the MTLModel.
//
// The managed object returned by the fetch request will then be set with all
// values from the MTLModel that the managed object is being converted from.
//
// If a property value of our MTLModel is yet another MTLModel which needs to be
// converted to a managed object, the class for that MTLModel can also implement
// this method to perform its own uniqing.
//
// For example:
// 1. An MTLModel subclass has id_number = 10.
// 2. An NSManagedObject accessible to the adapter's context has idnumber = 10.
// 3. managedObjectKeysByPropertyKey returns @{@"id_number" : @"idnumber"}
// 4. propertyKeysForManagedObjectUniquing returns
//    [NSSet setWithObject:@"id_number"];
// 5. Then our fetch request may return this managed object (or another managed
//    object with idnumber = 10).
//
// NOTE: If multiple managed objects follow the same uniquing criteria only one
// of them will be set with our MTLModel's values.
+ (NSSet *)propertyKeysForManagedObjectUniquing;

// Specifies how to convert the given property key to a managed object
// attribute. If reversible, the transformer will also be used to convert the
// managed object attribute back to the property.
//
// If the receiver implements a `+<key>EntityAttributeTransformer` method,
// MTLManagedObjectAdapter will use the result of that method instead.
//
// Returns a value transformer, or nil if no transformation should be performed.
+ (NSValueTransformer *)entityAttributeTransformerForKey:(NSString *)key;

// Specifies the MTLModel subclasses that should be deserialized to the
// receiver's property keys when a property key corresponds to an entity
// relationship.
//
// In other words, the dictionary returned by this method is used to decode
// managed object relationships into MTLModels (or NSArrays or NSSets thereof)
// set on the receiver.
//
// If a property key is omitted from the returned dictionary, but present in
// +managedObjectKeysByPropertyKey, and the receiver's +managedObjectEntity has
// a relationship at the corresponding key, an exception will be thrown during
// deserialization.
//
// Subclasses overriding this method should combine their values with those of
// `super`.
//
// Returns a dictionary mapping property keys to the Class objects that should
// be used.
+ (NSDictionary *)relationshipModelClassesByPropertyKey;

// Overridden to deserialize a different class instead of the receiver, based on
// information in the provided object.
//
// This is mostly useful for class clusters, where the abstract base class would
// be passed into +[MTLManagedObjectAdapter
// modelOfClass:fromManagedObject:error:], but a subclass should be instantiated
// instead.
//
// managedObject - The object that will be deserialized.
//
// Returns the class that should be instantiated (which may be the receiver), or
// nil to abort parsing (e.g., if the data is invalid).
+ (Class)classForDeserializingManagedObject:(NSManagedObject *)managedObject;

// Overriden when merging the value of the given key on the receiver with the
// value of the same key from the given `NSManagedObject` requires custom
// handling.
//
// By default, this method is not implemented, and precedence will be given to
// the value of the receiving model implicitly.
//
// When implemented, this method is called when an existing `NSManagedObject`
// is found for the receiving model, before updating the `NSManagedObject`'s
// properties.
//
// When implementing, you should use `+managedObjectKeysByPropertyKey` to map
// the given `key` to the appropriate `NSManagedObject` property.
- (void)mergeValueForKey:(NSString *)key fromManagedObject:(NSManagedObject *)managedObject;

// Overriden when merging values on the receiver with the given
// `NSManagedObject` requires custom handling.
//
// By default, this method is not implemented, and precedence will be given to
// the values of the receiving model implicitly.
//
// When implemented, this method is called when an existing `NSManagedObject`
// is found for the receiving model, before updating the `NSManagedObject`'s
// properties.
//
// When implementing, you should use `+managedObjectKeysByPropertyKey` to map
// the given `key` to the appropriate `NSManagedObject` property.
//
// If you have also implemented `mergeValueForKey:fromManagedObject:` you have
// to make sure to call `mergeValueForKey:fromManagedObject:` from this method
// when appropriate.
- (void)mergeValuesForKeysFromManagedObject:(NSManagedObject *)managedObject;

@end

// The domain for errors originating from MTLManagedObjectAdapter.
extern NSString * const MTLManagedObjectAdapterErrorDomain;

// +classForDeserializingManagedObject: returned nil for the given object.
extern const NSInteger MTLManagedObjectAdapterErrorNoClassFound;

// An NSManagedObject failed to initialize.
extern const NSInteger MTLManagedObjectAdapterErrorInitializationFailed;

// The managed object key specified by +managedObjectKeysByPropertyKey does not
// exist in the NSEntityDescription.
extern const NSInteger MTLManagedObjectAdapterErrorInvalidManagedObjectKey;

// The managed object property specified has a type that isn't supported by
// MTLManagedObjectAdapter.
extern const NSInteger MTLManagedObjectAdapterErrorUnsupportedManagedObjectPropertyType;

// The fetch request to find an existing managed object based on
// `+propertyKeysForManagedObjectUniquing` failed.
extern const NSInteger MTLManagedObjectAdapterErrorUniqueFetchRequestFailed;

// A MTLModel property cannot be serialized to or deserialized from an
// NSManagedObject relationship.
//
// For a to-one relationship, this means that the property does not contain
// a MTLModel, or the MTLModel does not conform to <MTLManagedObjectSerializing>.
//
// For a to-many relationship, this means that the property does not contain an
// NSArray or NSSet of MTLModel<MTLManagedObjectSerializing> instances.
extern const NSInteger MTLManagedObjectAdapterErrorUnsupportedRelationshipClass;

// The model's implementation of +managedObjectKeysByPropertyKey included a key
// which does not actually exist in +propertyKeys.
extern const NSInteger MTLManagedObjectAdapterErrorInvalidManagedObjectMapping;

// Converts a MTLModel object to and from an NSManagedObject.
@interface MTLManagedObjectAdapter : NSObject

// Attempts to deserialize an NSManagedObject into a MTLModel object.
//
// modelClass    - The MTLModel subclass to return. This class must conform to
//                 <MTLManagedObjectSerializing>. This argument must not be nil.
// managedObject - The managed object to deserialize. If this argument is nil,
//                 the method returns nil.
// error         - If not NULL, this may be set to an error that occurs during
//                 deserialization or initializing an instance of `modelClass`.
//
// Returns an instance of `modelClass` upon success, or nil if an error
// occurred.
+ (id)modelOfClass:(Class)modelClass fromManagedObject:(NSManagedObject *)managedObject error:(NSError **)error;

// Serializes a MTLModel into an NSManagedObject.
//
// model   - The model object to serialize. This argument must not be nil.
// context - The context into which to insert the created managed object. This
//           argument must not be nil.
// error   - If not NULL, this may be set to an error that occurs during
//           serialization or insertion.
+ (id)managedObjectFromModel:(MTLModel<MTLManagedObjectSerializing> *)model insertingIntoContext:(NSManagedObjectContext *)context error:(NSError **)error;

@end
