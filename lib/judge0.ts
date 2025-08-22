import axios from "axios";

const JUDGE0_API = "https://judge0-extra-ce.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
  "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
  "Content-Type": "application/json",
};

export async function runCodeOnJudge0(language_id: number, source_code: string, stdin: string) {
  console.log("Running code on Judge0:", { language_id, source_code, stdin });

  try {
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
    let attempts = 0;
    while (attempts < 10) {
      const resultRes = await axios.get(`${JUDGE0_API}/submissions/${token}?base64_encoded=false`, {
        headers,
      });

      const statusId = resultRes.data.status?.id;
      console.log("Judge0 result status:", resultRes.headers['x-ratelimit-submissions-remaining'], resultRes.data);
      if (statusId > 2) return resultRes.data;
      await new Promise((r) => setTimeout(r, 1000));
      attempts++;
    }
    throw new Error("Judge0 Timeout");
  } catch (error: any) {
    if (error.response.headers['x-ratelimit-submissions-remaining'] == 0) {
      throw new Error("Judge0 API rate limit exceeded. Please try again later.");
    }
    else {
      console.error("Error running code on Judge0:", error);
      throw new Error(error.response?.data?.message || "Failed to run code on Judge0");
    }
  }
}
