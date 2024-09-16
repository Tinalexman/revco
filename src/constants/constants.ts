export const states: string[] = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nassarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

export const PAYMENT_TARGET = "Revco-Payment-Target";

export interface iStateColors {
  name: string;
  state: string;
  paymentDetails: string;
  amount: string;
  pinContainer: string;
  pinContainerText: string;
  pinValueContainer: string;
  pinValueContainerText: string;
  border: string;
  footer: string;
}

export interface iStateColorData {
  [key: string]: iStateColors;
}

export const stateColorsData: iStateColorData = {
  Taraba: {
    name: "TARABA",
    state: "#DA251DB5",
    paymentDetails: "#F4BBB9",
    pinContainer: "#AE1E17",
    pinContainerText: "#FBE9E8",
    pinValueContainer: "#E5645F59",
    pinValueContainerText: "#1A0100",
    amount: "#F9DEDD",
    border: "#F9DEDD",
    footer: "#FBE9E86E",
  },
  Other: {
    name: "OTHER",
    state: "#87FE67",
    paymentDetails: "#AFFF12",
    pinContainer: "#AAF267",
    pinContainerText: "#000000",
    pinValueContainer: "#CCDDCC",
    pinValueContainerText: "#1A0100",
    amount: "#AFFF12",
    border: "#CCFFDD",
    footer: "#C5DDC5",
  },
};
