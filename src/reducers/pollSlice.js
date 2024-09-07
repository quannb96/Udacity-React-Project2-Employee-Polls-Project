import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../apis/_DATA";
import { sortQuestionsByIds } from "../utils/utils";

// Thunk action creator
export const fetchQuestionsAsync = createAsyncThunk(
  "poll/fetchQuestions",
  _getQuestions
);

export const storeQuestionAsync = createAsyncThunk(
  "poll/storeQuestion",
  _saveQuestion
);

export const storeAnswerAsync = createAsyncThunk(
  "poll/storeQuestionAnswer",
  async (args) =>
    await _saveQuestionAnswer({
      authedUser: args.userId,
      qid: args.questionId,
      answer: args.answer,
    })
);

// Initial state
const initialState = {
  questions: {
    byId: {},
    allIds: [],
  },
  status: "ready",
};

export const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    store: (state, action) => {
      const { id } = action.payload;
      state.questions.allIds.unshift(id);
      state.questions.byId[id] = action.payload;
    },
    update: (state, action) => {
      const { id } = action.payload;
      state.questions.byId[id] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.status = "waiting";
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.status = "ready";
        state.questions.byId = action.payload;
        state.questions.allIds = sortQuestionsByIds(action.payload);
      })
      .addCase(fetchQuestionsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(storeAnswerAsync.fulfilled, (state, action) => {
        const { questionId, answer, userId } = action.meta.arg;
        state.questions.byId[questionId][answer].votes.push(userId);
      })
      .addCase(storeQuestionAsync.pending, (state) => {
        state.status = "waiting";
      })
      .addCase(storeQuestionAsync.fulfilled, (state, action) => {
        state.status = "ready";
        const { id } = action.payload;
        state.questions.allIds.unshift(id);
        state.questions.byId[id] = action.payload;
      })
      .addCase(storeQuestionAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export actions and selectors
export const { store, update } = pollSlice.actions;
export const selectPollState = (state) => state.poll;

// Export reducer
export default pollSlice.reducer;
