import axios from "axios";

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  "Content-Type": "application/json",
};

export async function runCodeOnJudge0(language_id: number, source_code: string, stdin: string) {
  const submissionRes = await axios.post(
    `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
    {
      language_id,
      source_code,
      stdin,
    },
    { headers }
  );

  const token = submissionRes.data.token;

  // Poll until done
  while (true) {
    const resultRes = await axios.get(`${JUDGE0_API}/submissions/${token}?base64_encoded=false`, {
      headers,
    });

    const statusId = resultRes.data.status?.id;
    if (statusId === 1 || statusId === 2) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }

    return resultRes.data;
  }
}
