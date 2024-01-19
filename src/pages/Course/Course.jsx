import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
ace.config.set("basePath", "/path/to/ace-builds/src-noconflict");

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import {
  StyledCourse,
  Title,
  Subtitle,
  Description,
  ExerciseContainer,
  StyledButton,
  EditorContainer,
} from "./Course.style";

function Course() {
  const navigate = useNavigate("");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState("");

  const location = useLocation();
  const data = location.state?.data ? JSON.parse(location.state.data) : null;

  const goToNextExercise = () => {
    if (currentExerciseIndex < data.exercices.length) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowSolution(false);
      setUserCode("");
    }
  };

  const currentExercise =
    data?.exercices?.[
      currentExerciseIndex > 0 ? currentExerciseIndex - 1 : currentExerciseIndex
    ];

  const onUserCodeChange = (newValue) => {
    setUserCode(newValue);
  };

  const calculateEditorHeight = (code) => {
    const lines = code.split("\n").length;
    const lineHeight = 16;
    const padding = 10;
    return `${lines * lineHeight + padding}px`;
  };

  return (
    <StyledCourse>
      <ExerciseContainer>
        {currentExerciseIndex === 0 && (
          <div>
            <Title>{data?.cours?.titre}</Title>
            <Description>{data?.cours?.introduction}</Description>
            <Subtitle>{data?.cours?.notion?.nom}</Subtitle>
            <Description>{data?.cours?.notion?.description}</Description>
            {data?.cours?.notion?.exemples.map((exemple, index) => (
              <div key={index}>
                <Subtitle>{exemple.exemple}</Subtitle>
                <pre>{exemple.code}</pre>
                <Description>{exemple.desc}</Description>
              </div>
            ))}
            <StyledButton onClick={goToNextExercise}>
              Aller aux exercices ➡️
            </StyledButton>
          </div>
        )}

        {currentExerciseIndex > 0 && (
          <div>
            <Subtitle>Exercice {currentExercise.id}</Subtitle>
            <Description>{currentExercise.consigne}</Description>
            <EditorContainer>
              <AceEditor
                mode="javascript"
                theme="monokai"
                onChange={onUserCodeChange}
                name={`code_editor_${currentExercise.id}`}
                editorProps={{ $blockScrolling: true }}
                value={userCode}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </EditorContainer>
            <StyledButton onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? "Cacher la solution" : "Afficher la solution"}
            </StyledButton>
            {showSolution && (
              <EditorContainer>
                <Subtitle>Solution:</Subtitle>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  readOnly={true}
                  value={currentExercise.solution.code}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  style={{
                    height: calculateEditorHeight(
                      currentExercise.solution.code
                    ),
                  }}
                />
                <Description>
                  {currentExercise.solution.explication}
                </Description>
              </EditorContainer>
            )}
            {currentExerciseIndex < data.exercices.length ? (
              <StyledButton onClick={goToNextExercise}>
                Exercice suivant ➡️
              </StyledButton>
            ) : (
              <StyledButton onClick={() => navigate("/")}>
                Terminer le cours
              </StyledButton>
            )}
          </div>
        )}
      </ExerciseContainer>
    </StyledCourse>
  );
}

export default Course;
