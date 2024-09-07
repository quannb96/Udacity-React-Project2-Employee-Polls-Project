import { _saveQuestion, _saveQuestionAnswer } from "../apis/_DATA";

describe("_saveQuestion function", () => {
  it("should return the saved question with all expected fields populated when correctly formatted data is passed", async () => {
    const questionData = {
      optionOneText: "Option One Text",
      optionTwoText: "Option Two Text",
      author: "testUser",
    };

    const savedQuestion = await _saveQuestion(questionData);

    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion.author).toBe(questionData.author);
    expect(savedQuestion.optionOne.text).toBe(questionData.optionOneText);
    expect(savedQuestion.optionTwo.text).toBe(questionData.optionTwoText);
  });

  it("should return an error if incorrect data is passed", async () => {
    const incorrectData = {
      optionOneText: "",
      optionTwoText: "",
      author: "",
    };

    await expect(_saveQuestion(incorrectData)).rejects.toMatch(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer function", () => {
  it("should return true after saving the answer", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionTwo";

    const saved = await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(saved).toBe(true);
  });

  it("should return an error if incorrect data is passed", async () => {
    const incorrectData = {
      authedUser: "",
      qid: "",
      answer: "",
    };

    await expect(_saveQuestionAnswer(incorrectData)).rejects.toMatch(
      "Please provide authedUser, qid, and answer"
    );
  });
});
