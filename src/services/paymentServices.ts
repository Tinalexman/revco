// import axios from "axios";

// const baseUrl = "https://sandbox.paysure.ng/api/v1/dev";
// const appId = "bea901f8-677e-4d29-ae17-b9850544ef2a";
// const paymentSecret = "REVCO_CLIENT_SECRET";

const publicKey = "LIVE_DZOB6UNILKQABWQYAA40";
const callbackUrl = "https://revco-zeta.vercel.app/dashboard/view-receipt/";

export function getCheckoutPage(
  email: string,
  name: string,
  phone: string,
  amount: number,
  invoiceNo: string
) {
  return `https://payments.paysure.ng/checkout/gateway?k=${publicKey}&a=${amount}&e=${email}&n=${name}&p=${phone}&cburl=${callbackUrl}${invoiceNo}&ref=${invoiceNo}&hasAccessTo=bank_card,ussd,bank_transfer`;
}
