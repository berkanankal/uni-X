import { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchThings } from "../../../../redux/thingsSlice";
import Thing from "./Thing";
import DataNotFound from "../../../DataNotFound";

const MyThingAds = () => {
  const dispatch = useDispatch();
  const { things } = useSelector((state) => state.things);
  const user = useSelector((state) => state.auth.user);

  const filteredThings = things.data.filter((thing) => thing.user === user.id);

  useEffect(() => {
    if (things.status === "idle") {
      const url = "/thing";
      dispatch(fetchThings(url));
    }
  }, [dispatch, things.status]);

  return (
    <>
      <Button component={Link} to="add" variant="contained" sx={{ mb: 3 }}>
        Eşya ilanı ver
      </Button>
      <Grid container spacing={2}>
        {filteredThings.map((thing) => (
          <Grid item xs={12} key={thing._id}>
            <Thing thing={thing} />
          </Grid>
        ))}
      </Grid>
      {things.status === "succeeded" && filteredThings.length < 1 && (
        <DataNotFound message="Eşya ilanı bulunamadı" />
      )}
    </>
  );
};

export default MyThingAds;
