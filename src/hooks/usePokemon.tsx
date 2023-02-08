import { useState } from "react";
import { InputState } from "../components/input";
import { PokemonResponse } from "../services/pokemonResponse.dto";
import useFetch from "./useFetch";

const usePokemon = () => {
  const [input, setValue] = useState<InputState>({
    id: "search",
    value: "",
  });
  const handleChange = (data: InputState) => {
    setValue(data);
  };
  const { response, handleResquest, reset } = useFetch(
    {
      url: `https://pokeapi.co/api/v2/pokemon/${input.value}`,
      method: "GET",
      transformResponse: (data, h, s) => {
        if (s === 404) {
          return { message: "Pokemon not found, try again!" };
        }
        return PokemonResponse.fromJson(JSON.parse(data));
      },
    },
    true
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    handleResquest();
  };
  const reTry = () => {
    setValue({
      id: "search",
      value: "",
    });
    reset();
  };
  return { input, handleChange, handleSubmit, response, reTry };
};

export default usePokemon;
