import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import NavBar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);  // Estado original dos Pokémons
    const [filteredPokemons, setFilteredPokemons] = useState([]);  // Estado para os Pokémons filtrados

    useEffect(() => {
        getPokemon();
    }, []);  // Adicione o array vazio para evitar o loop infinito

    var pokemonQuantidade = 100;

    const getPokemon = () => {
        var endPoints = [];
        for (var i = 1; i < pokemonQuantidade; i++) {
            endPoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        axios
            .all(endPoints.map((endPoint) => axios.get(endPoint)))
            .then((res) => {
                setPokemons(res.map((pokemon) => pokemon));
                setFilteredPokemons(res.map((pokemon) => pokemon));  // Inicializa os filtrados com todos
            });
    };

    const pokemonFilter = (name) => {
        if (!name) {
            setFilteredPokemons(pokemons);  // Se não houver filtro, mostrar todos os Pokémons
            return;
        }

        const filtered = pokemons.filter((pokemon) =>
            pokemon.data.name.toLowerCase().includes(name.toLowerCase())
        );
        setFilteredPokemons(filtered);  // Atualiza o estado com os Pokémons filtrados
    };

    return (
        <div>
            <NavBar pokemonFilter={pokemonFilter} />  {/* Função de filtro passada como prop */}
            <Container maxWidth='false'>
                <Grid container spacing={5} padding={5}>
                    {filteredPokemons.map((pokemon, key) => (
                        <Grid item xs={2} key={key}>
                            <PokemonCard
                                name={pokemon.data.name}
                                image={pokemon.data.sprites.front_default}
                                types ={pokemon.data.types}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};
