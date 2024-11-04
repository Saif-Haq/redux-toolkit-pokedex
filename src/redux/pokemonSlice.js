import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch Pokémon data
export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemon: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default pokemonSlice.reducer;
