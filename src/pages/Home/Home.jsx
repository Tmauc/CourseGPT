import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { StyledHome, Title, Label, Input, Slider, Button } from "./Home.style";

import promptPath from "../../prompt.txt";

import exampleData from "../exampleData.json";

function Home() {
  const navigate = useNavigate("");
  const [theme, setTheme] = useState("");
  const [notion, setNotion] = useState("");
  const [language, setLanguage] = useState("");
  const [promptTemplate, setPromptTemplate] = useState();

  const replacePlaceholders = (template, values) => {
    return template
      .replace("[THEME]", values.theme)
      .replace("[NOTION]", values.notion)
      .replace("[LANGUAGE]", values.language);
  };

  const sendPromptToGPT4 = async (prompt) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "Vous êtes un assistant AI utile." },
            { role: "user", content: prompt },
          ],
        },

        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );
      console.log("oui", response?.data?.choices[0]?.message?.content);
      return response?.data?.choices[0]?.message?.content;
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API OpenAI", error);
      return null;
    }
  };

  useEffect(() => {
    fetch(promptPath)
      .then((response) => response.text())
      .then((textContent) => {
        setPromptTemplate(textContent);
      });
  }, [promptTemplate]);

  const handleSubmit = async () => {
    if (theme && notion && language) {
      /*var promptTXT = replacePlaceholders(promptTemplate, {
        theme,
        notion,
        language,
      });
      const gptResponse = await sendPromptToGPT4(promptTXT);
      navigate("/course", { state: { data: gptResponse } });*/
      navigate("/course", { state: { data: JSON.stringify(exampleData) } });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <StyledHome>
      <Title>Créer votre cours personnalisé</Title>
      <Label>
        Thématique:
        <Input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </Label>
      <Label>
        Notion:
        <Input
          type="text"
          value={notion}
          onChange={(e) => setNotion(e.target.value)}
        />
      </Label>
      <Label>
        Langue:
        <Input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </Label>
      {theme && notion && language && (
        <Button onClick={handleSubmit}>Aller au cours</Button>
      )}
    </StyledHome>
  );
}

export default Home;
