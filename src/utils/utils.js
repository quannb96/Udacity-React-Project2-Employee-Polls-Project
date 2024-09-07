export const sortQuestionsByIds = (questionsById) => {
  const sortedQuestions = Object.values(questionsById).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return sortedQuestions.map((question) => question.id);
};

export const calculateQuestionStats = (question) => {
  const optionOneVotesCount = question.optionOne.votes.length;
  const optionTwoVotesCount = question.optionTwo.votes.length;
  const totalVotes = optionOneVotesCount + optionTwoVotesCount;
  const optionOnePercentage = calculatePercentage(
    totalVotes,
    optionOneVotesCount
  );
  const optionTwoPercentage = calculatePercentage(
    totalVotes,
    optionTwoVotesCount
  );

  return {
    optionOneVotesCount,
    optionTwoVotesCount,
    optionOnePercentage,
    optionTwoPercentage,
  };
};

const calculatePercentage = (total, value) => Math.round((100 / total) * value);

export const getValueForQuestion = (question, userId) => {
  if (question.optionOne.votes.includes(userId)) {
    return "optionOne";
  }

  if (question.optionTwo.votes.includes(userId)) {
    return "optionTwo";
  }

  return null;
};
