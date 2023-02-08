import { Card, Stack, Grid, Typography, LinearProgress } from "@mui/material";
import React from "react";
import { PokemonResponse } from "../services/pokemonResponse.dto";

const CardPokemon = (props: PokemonResponse) => {
  const { description, sprites, stats } = props;
  const [isHover, setIsHover] = React.useState(false);
  return (
    <Card
      sx={{
        maxWidth:500,
        padding: "1rem",
      }}
    >
      <Stack spacing={2} >
        <Typography variant="h4" fontWeight={700}>
          {
            description.name
          }
        </Typography>

        <img alt="pokemon" src={
          isHover ? sprites.front : sprites.frontShiny
        }
      style={{
        width:"100%",
      }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)} 
        />
        <Grid container alignItems={"center"} sx={{
          width:"100%",
        }} alignContent={"center"} justifyContent={'center'}>
          {Object.keys(description).map((key) => {
            return (
              <Grid item xs={4} key={key} alignContent={"center"} justifyContent={'center'}>
                <Typography fontWeight={700} textTransform="capitalize">
                  {key}
                </Typography>
                <Typography fontWeight={400} textTransform="capitalize">
                  {description[key]}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="h6">Stats</Typography>
        <Grid container alignItems={"center"}>
          {stats.map((stat) => (
            <>
              <Grid item xs={4} key={stat.name}>
                <Typography fontWeight={700}>{stat.name} :</Typography>
              </Grid>
              <Grid item xs={8}>
                <LinearProgress variant="determinate" value={stat.value} />
              </Grid>
            </>
          ))}
        </Grid>
      </Stack>
    </Card>
  );
};

export default CardPokemon;
