import { useContext, useState } from "react";
import GlButton from "../../../components/GlButton/GlButton";
import GlModal from "../../../components/GlModal/GlModal";

export const GetDataByNipNumber = ({ Context }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contextValue = Context && useContext(Context);
  const { record = {}, setRecord = () => {} } = contextValue || {};

  const [error, setError] = useState("");

  async function getDataFromGus(nip) {
    const today = new Date().toISOString().split("T")[0];
    const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${today}`;
    const response = await fetch(url);
    let result = response.json();

    return result;
  }

  const startImport = async () => {
    if (record.nip.length <= 0) {
      setError("Invalid NIP number!");
      return;
    }

    const gusRecord = await getDataFromGus(record.nip);
    if (gusRecord.result != null && gusRecord.result.subject != null) {
      console.log(gusRecord.result.subject);
      const subject = gusRecord.result.subject;
      setRecord((prev) => ({
        ...prev,
        name: subject.name,
        krs: subject.krs,
        regon: subject.regon,
        address: subject.workingAddress,
      }));
    } else {
      setError("No data found check NIP number");
    }
  };

  return (
    <>
      <GlButton color="secondary" record={record} action={() => startImport()}>
        Import Company Data from GUS
      </GlButton>
      <GlModal
        isOpen={error.length > 0}
        title={"Error importing from GUS"}
        onClose={() => setError("")}
      >
        {error}
      </GlModal>
    </>
  );
};

export class PhoneNumberValidator {
  constructor() {
    this.basicPattern = /^\+?\d{7,15}$/;

    this.usPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    this.internationalPattern =
      /^\+[1-9]{1}[0-9]{0,2}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  }

  validateFormat(phoneNumber) {
    const cleaned = phoneNumber.replace(/[^+\d]/g, "");
    return this.basicPattern.test(cleaned);
  }

  validateAdvanced(phoneNumber) {
    if (this.usPattern.test(phoneNumber)) {
      return {
        valid: true,
        format: "US",
        normalized: phoneNumber.replace(this.usPattern, "$1$2$3"),
      };
    }

    if (this.internationalPattern.test(phoneNumber)) {
      return {
        valid: true,
        format: "International",
        normalized: phoneNumber.replace(/[^+\d]/g, ""),
      };
    }

    return {
      valid: false,
      message: "Invalid phone number format",
    };
  }

  normalize(phoneNumber) {
    return phoneNumber.replace(/[^+\d]/g, "");
  }
}

export function ValidateNIP(nip) {
  const cleanNIP = nip.replace(/-/g, "");
  if (!/^\d{10}$/.test(cleanNIP)) {
    return false;
  }

  if (!["3", "5", "7", "9"].includes(cleanNIP[0])) {
    return false;
  }

  const weights = [6, 5, 7, 2, 3, 9, 8, 4, 1];
  const sumOfProducts = weights.reduce((acc, weight, index) => {
    return acc + parseInt(cleanNIP[index]) * weight;
  }, 0);

  const checkDigit = (11 - (sumOfProducts % 11)) % 10;

  return cleanNIP.slice(-1) === checkDigit.toString();
}

export function ValidateEmail(email) {
  const emailRegex = new RegExp(
    "^" +
      "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~]+" +
      "(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~]+)*" +
      "@" +
      "([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+" +
      "[a-zA-Z]{2,}" +
      "$"
  );

  return emailRegex.test(email);
}

export default GetDataByNipNumber;
