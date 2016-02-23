#import "RCTBridgeModule.h"
#import "BraintreeCard.h"

@interface RNBraintreeCard : NSObject <RCTBridgeModule>

@property (nonatomic, strong) BTAPIClient *braintreeClient;
@property (nonatomic, strong) BTCardClient *cardClient;
@property (nonatomic, strong) BTCard *card;
@property (nonatomic, strong) RCTResponseSenderBlock callback;

@end
