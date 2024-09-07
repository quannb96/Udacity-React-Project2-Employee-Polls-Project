import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeAnswerAsync, storeQuestionAsync } from "./pollSlice";
import { _getUsers } from "../apis/_DATA";

// Thunk action creator
export const fetchUsersAsync = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const users = await _getUsers();
    return users;
  } catch (error) {
    throw new Error(error);
  }
});

// Initial state
const initialState = {
  users: {
    byId: {},
    allIds: [],
  },
  status: "ready",
};

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "waiting";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "ready";
        state.users.byId = action.payload;
        state.users.allIds = Object.keys(action.payload);
      })
      .addCase(fetchUsersAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(storeAnswerAsync.fulfilled, (state, action) => ({
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [action.meta.arg.userId]: {
              ...state.users.byId[action.meta.arg.userId],
              answers: {
                ...state.users.byId[action.meta.arg.userId].answers,
                [action.meta.arg.questionId]: action.meta.arg.answer,
              },
            },
          },
        },
      }))
      .addCase(storeQuestionAsync.fulfilled, (state, action) => ({
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [action.meta.arg.author]: {
              ...state.users.byId[action.meta.arg.author],
              questions: [
                ...state.users.byId[action.meta.arg.author].questions,
                action.payload.id,
              ],
            },
          },
        },
      }));
  },
});

const calculateUserPoints = (user) =>
  user.questions.length + Object.keys(user.answers).length;

// Export actions and selectors
export const selectUserState = (state) => state.user;
export const selectLeaderboard = (state) => {
  const { users } = selectUserState(state);

  return users.allIds
    .reduce(
      (usersWithScores, userId) => [
        ...usersWithScores,
        {
          ...users.byId[userId],
          score: calculateUserPoints(users.byId[userId]),
        },
      ],
      []
    )
    .sort((userA, userB) => userB.score - userA.score);
};

// Export reducer
export default userSlice.reducer;
