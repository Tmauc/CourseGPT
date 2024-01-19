import styled from "styled-components";

export const StyledCourse = styled.div`
  width: 100vw;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const Subtitle = styled.h2`
  color: #666;
  margin-bottom: 15px;
`;

export const Description = styled.p`
  color: #444;
  margin-bottom: 15px;
`;

export const ExerciseContainer = styled.div`
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EditorContainer = styled.div`
  margin-top: 20px;
`;
