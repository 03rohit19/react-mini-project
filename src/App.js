import React, { useEffect, useState } from "react";

const App = () => {
  const [option, setOption] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = async () => {
    try {
      const params = new URLSearchParams();
      params.append("q", input);
      params.append("source", from);
      params.append("target", to);

      const response = await fetch(
        "https://google-translate1.p.rapidapi.com/language/translate/v2",
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/gzip",
            "X-RapidAPI-Key":
              "8f46d37f4emshe575a719e143e63p12eb6bjsnf35f8dcad8f2",
            "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
          },
          body: params.toString(),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setOutput(data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://libretranslate.com/languages ");
        const data = await res.json();
        setOption(data);
      } catch (error) {
        console.error("Error while fetching data :", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        From ({from}):
        <select onChange={(e) => setFrom(e.target.value)}>
          {option.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}):
        <select onChange={(e) => setTo(e.target.value)}>
          {option.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" disabled defaultValue={output}></textarea>
      </div>
      <button onClick={(e) => translate()}>Translate</button>
    </div>
  );
};

export default App;
