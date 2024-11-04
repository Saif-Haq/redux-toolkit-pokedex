import React from "react";
import { fetchPokemon } from "../redux/pokemonSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const dispatch = useDispatch();
  const { pokemon, status, error } = useSelector((state) => state.pokemon);

  const handleFetch = () => {
    dispatch(fetchPokemon(pokemonName));
  };
  return (
    <div>
      <input
        type="text"
        style={{ border: "1px solid red" }}
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
        placeholder="Enter Pokémon name"
      />
      <button onClick={handleFetch}>Fetch Pokémon</button>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
};
