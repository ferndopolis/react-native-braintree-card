#import "RNBraintreeCard.h"
#import "RCTUtils.h"

@implementation RNBraintreeCard

/* this is what we need to do

  //Get your tokenization key from the control panel
  // or fetch a client token
  BTAPIClient *braintreeClient = [[BTAPIClient alloc] initWithAuthorization:@"<#tokenization_key_or_client_token#>"];

  BTCardClient *cardClient = [[BTCardClient alloc] initWithAPIClient:braintreeClient];

  BTCard *card = [[BTCard alloc] initWithNumber:@"4111111111111111"
      expirationMonth:@"12"
      expirationYear:@"2018"
      cvv:nil];

  [cardClient tokenizeCard:card
  completion:^(BTCardNonce *tokenizedCard, NSError *error) {
  // Communicate the tokenizedCard.nonce to your server, or handle error
  }];

*/

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initWithAuthorization: (NSString *)clientToken)
{
    self.braintreeClient = [[BTAPIClient alloc] initWithAuthorization: clientToken];
    self.cardClient = [[BTCardClient alloc] initWithAPIClient: self.braintreeClient];
}

RCT_EXPORT_METHOD(addCard: (NSString *)cardNumber
          expirationMonth: (NSString *)expirationMonth
           expirationYear: (NSString *)expirationYear
                      ccv: (NSString *)ccv
                 callback: (RCTResponseSenderBlock)callback
                 )
{
  //TODO: figure out this callback thing
  self.card = [[BTCard alloc] initWithNumber:cardNumber
      expirationMonth:expirationMonth
      expirationYear:expirationYear
      ccv:ccv];

  [self.cardClient tokenizeCard: self.card
    completion: (RCTResponseSenderBlock callback) {
      self.callback = callback;
  }];
}

@end
