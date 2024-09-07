import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Card = ({ question }) => {
  return (
    <Link to={"questions/" + question.id}>
      <div>
        <div>
          {/* <img src={question.authorObject.avatarURL || ""} alt="Author" /> */}
        </div>
        <div>
          <div>{question.authorObject.name}</div>
          <p>{new Date(question.timestamp).toDateString()}</p>
          <Button variant="outlined" fullWidth>
            Show
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
