#import "RNBraintreeCard.h"

@implementation RNBraintreeCard

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initWithAuthorization: (NSString *)clientToken callback:(RCTResponseSenderBlock)callback)
{
    self.braintreeClient = [[BTAPIClient alloc] initWithAuthorization: clientToken];
    self.cardClient = [[BTCardClient alloc] initWithAPIClient: self.braintreeClient];
}

RCT_EXPORT_METHOD(getCardNonce: (NSString *)cardNumber
          expirationMonth: (NSString *)expirationMonth
           expirationYear: (NSString *)expirationYear
                      cvv: (NSString *)cvv
                 callback: (RCTResponseSenderBlock)callback
                 )
{
  BTCard *card = [[BTCard alloc] initWithNumber:cardNumber
      expirationMonth:expirationMonth
      expirationYear:expirationYear
      cvv:cvv];

  [self.cardClient tokenizeCard: card
    completion:^(BTCardNonce *tokenizedCard, NSError *error) {
      NSArray *args = @[];
      if ( error == nil ) {
        args = @[[NSNull null], tokenizedCard.nonce];
      } else {
        args = @[error.description, [NSNull null]];
      }

      callback(args);
  }];
}

RCT_EXPORT_METHOD(
  getCardNonceObj: (NSDictionary *)parameters
  callback: (RCTResponseSenderBlock)callback
)
{
  BTCard *card = [[BTCard alloc] initWithParameters:parameters];

  [self.cardClient tokenizeCard: card
    completion:^(BTCardNonce *tokenizedCard, NSError *error) {
      NSArray *args = @[];
      if ( error == nil ) {
        args = @[[NSNull null], tokenizedCard.nonce];
      } else {
        args = @[error.description, [NSNull null]];
      }

      callback(args);
  }];
}

@end
