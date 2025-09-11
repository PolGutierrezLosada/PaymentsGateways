package E_commerce.PaymentGateways_Backend;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

// this class is for locating the endpoint that I'm going to use in the API:
@RestController
public class PaymentController {
    private final Gson gson;

    // constructor of the class:
    public PaymentController() {
        // the port that I'm in is 8080 (default) => http://localhost:8080
        // secret key:
        Stripe.apiKey = "sk_test_51S2DDw95S5T5YpVt07HbEi7JdXt1muJWRL0GUFQgB7sowAltFMiX97iE7s4SwI25d3GT6ybfWPKRpm4oqudrWWaP00Ydp8Ecqb";

        // initialize the Gson variable:
        this.gson = new Gson();
    }

    // endpoint to make the petition about creating the checkout session:
    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession() throws StripeException {
        // I do create the necessary parameters that will be passed to the checkout session once created:
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT) // I set the mode to do a unique payment.
                        .setUiMode(SessionCreateParams.UiMode.EMBEDDED) // I declare that I'm going to embed the form.
                        .setReturnUrl("http://localhost:5173/") // I set the url the user will be returned to, once the payment has ended.
                        .addLineItem(  // shoes:
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L) // it must be a variable from the frontend.
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(3999L)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Zapatillas")
                                                                        .build())
                                                        .build())
                                        .build())

                        .addLineItem(  // phone:
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(2L) // it must be a variable from the frontend.
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(29999L)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Móvil")
                                                                        .build())
                                                        .build())
                                        .build())

                        .addLineItem(  // carpet:
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L) // it must be a variable from the frontend.
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("eur")
                                                        .setUnitAmount(6999L)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Alfombra-Felpudo")
                                                                        .build())
                                                        .build())
                                        .build())
                        .build();

        // I do finally create the checkout session:
        Session session = Session.create(params);

        // I prepare the json that I'm going to return with the process information:
        Map<String, String> map = new HashMap<>();
        //map.put("clientSecret", session.getRawJsonObject().getAsJsonObject("client_secret").getAsString());
        map.put("clientSecret", session.getClientSecret());

        return map;
    }
}

/*
* Necessary attributes to create the Checkout Session:
* line-ítems
* mode
* return url
* success url
* */
