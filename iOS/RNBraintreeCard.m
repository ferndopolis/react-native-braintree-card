#import "RNBraintreeCard.h"

@implementation RNBraintreeCard

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initWithAuthorization: (NSString *)clientToken)
{
    self.braintreeClient = [[BTAPIClient alloc] initWithAuthorization: clientToken];
    self.cardClient = [[BTCardClient alloc] initWithAPIClient: self.braintreeClient];
}

RCT_EXPORT_METHOD(addCard: (NSString *)cardNumber
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

      NSLog(@"In Completion Method");
      NSArray *args = @[];
      if ( error == nil ) {
        args = @[[NSNull null], tokenizedCard.nonce];
      }

      callback(args);
  }];
}

@end
