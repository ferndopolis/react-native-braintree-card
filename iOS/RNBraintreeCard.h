#import <React/RCTBridgeModule.h>
#import "BraintreeCard.h"

@interface RNBraintreeCard : NSObject <RCTBridgeModule>

@property (nonatomic, strong) BTAPIClient *braintreeClient;
@property (nonatomic, strong) BTCardClient *cardClient;

@end
