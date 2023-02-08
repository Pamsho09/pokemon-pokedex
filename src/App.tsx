import {
  Backdrop,
  Card,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useReducer, useState } from "react";
import ButtonCustom from "./components/Button";
import CardPokemon from "./components/CardPokemon";
import Input, { InputState } from "./components/input";
import usePokemon from "./hooks/usePokemon";

function App() {
  const { handleChange, handleSubmit, input, response,reTry } = usePokemon();
  console.log(response);
  return (
    <Container
      sx={{
      
       flex:1,
        width: "100%",

        boxSizing: "border-box",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={10}>
        <Stack direction={"column"} spacing={2} justifyContent={"space-between"}>
          <form onSubmit={handleSubmit} style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"flex-start",
            gap:"1rem"
          }}>
            <Input
              label="Search"
              name={input.id}
              value={input.value}
              onChange={handleChange}
              type="text"
              isError={response.error }
              sizes="small"
              errorMessage={"Pokemon not found, try again!"}
            />
            <ButtonCustom
              label="Search"
              onClick={() => console.log("search")}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={
              input.value.length<1 
              }
            />
          </form>
          {input.value.length>0&&response.error && (
          <ButtonCustom 
          label="Try again"
          size="small"
          color="error"
          variant="contained"
          onClick={reTry}
          />
        )}
        </Stack>
      
        <Stack>
          {!response.error &&response.data ? (
            <CardPokemon {...response.data} />
          ) : (
            !response.error&&  <Typography>please submit a pokemon!</Typography>
          )}
          {
            response.error && <img src={'https://media.tenor.com/uFyiB7WDYZ8AAAAM/pika-cry.gif'}
            alt="pikachu crying"
            />
          }
        </Stack>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={response.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default App;
