package E_commerce.PaymentGateways_Backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// esta clase sirve para alojar los endpoints que va a usar la API:
@RestController
public class PaymentController {
    @GetMapping("/")
    public String prueba() {
        return "Prueba Realizada Con Éxito!!";
    }
}
