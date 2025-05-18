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

export default GetDataByNipNumber;
