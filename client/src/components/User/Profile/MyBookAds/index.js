import { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Book from "./Book";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../../../redux/booksSlice";
import DataNotFound from "../../../DataNotFound";

const MyBookAds = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const user = useSelector((state) => state.auth.user);

  const filteredBooks = books.data.filter((book) => book.user === user.id);

  useEffect(() => {
    if (books.status === "idle") {
      const url = "/book";
      dispatch(fetchBooks(url));
    }
  }, [dispatch, books.status]);

  return (
    <>
      <Button component={Link} to="add" variant="contained" sx={{ mb: 3 }}>
        Kitap ilanı ver
      </Button>
      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} key={book._id}>
            <Book book={book} />
          </Grid>
        ))}
      </Grid>

      {books.status === "succeeded" && filteredBooks.length < 1 && (
        <DataNotFound message="Kitap ilanı bulunamadı" />
      )}
    </>
  );
};

export default MyBookAds;
