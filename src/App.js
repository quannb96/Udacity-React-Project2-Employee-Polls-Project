import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Poll from "./pages/Poll";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import Nav from "./components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "./reducers/authedSlice";
import { fetchQuestionsAsync, selectPollState } from "./reducers/pollSlice";
import { fetchUsersAsync, selectUserState } from "./reducers/userSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuthState);
  const { status: userStatus } = useSelector(selectUserState);
  const { status: pollStatus } = useSelector(selectPollState);

  const isLoading = pollStatus === "waiting" || userStatus === "waiting";

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    dispatch(fetchQuestionsAsync());
    dispatch(fetchUsersAsync());
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/questions/:id" element={<Poll isLoading={isLoading} />} />
        <Route path="/add" element={<New />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
