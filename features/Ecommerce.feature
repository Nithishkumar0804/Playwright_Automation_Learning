Feature: Ecommerce Validation

Scenario: Placing the Order
    Given  login to Ecommerce application with "rnithishkumar080421@gmail.com" and "Rnithish21##"
    When Add "iphone 13 pro" to Cart
    Then Verify "iphone 13 pro" is displayed in the Cart
    When Enter valid card details and Place the Order
    Then Verify order is present in the OrderHistory
