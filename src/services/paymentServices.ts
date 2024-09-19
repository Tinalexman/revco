// import axios from "axios";

// const baseUrl = "https://sandbox.paysure.ng/api/v1/dev";

// const appId = "bea901f8-677e-4d29-ae17-b9850544ef2a";
// const paymentSecret = "REVCO_CLIENT_SECRET";
const publicKey = "LIVE_DZOB6UNILKQABWQYAA40";

export function getCheckoutPage(
  email: string,
  name: string,
  phone: string,
  amount: number
) {
  return `https://payments.paysure.ng/checkout/gateway?k=${publicKey}&a=${amount}&e=${email}&n=${name}&p=${phone}&cburl=https://paysure.ng&hasAccessTo=bank_card,ussd,bank_transfer`;
}
