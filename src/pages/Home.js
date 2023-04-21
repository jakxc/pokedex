import { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Header from "../components/Header"
import Search from "../components/Search";
import Card from "../components/Card";

const Home = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [loading, setLoading] = useState(false);
    const pokemonListRef = useRef();

    const setAllData = async () => {
      // if (pokemonData.length > 0) {
      //   setPokemonData([]);
      // }
      setLoading(true);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      setCurrentPokemon(res.data.results);
      setLoading(false);
    };

    const setCurrentPokemon = async (results) => {
      results.forEach(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        setPokemonData((prevState) => {
          let newState = [...prevState, res.data];
          newState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return newState;
        });
      });
    };
  
    useEffect(() => {
      setAllData();
    }, [url]);

    const onScroll = () => {
      if (pokemonListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = pokemonListRef.current;
        if (scrollTop + clientHeight === scrollHeight) {
          setUrl(nextUrl);
        }
      }
    };

    const filteredPokemon = pokemonData.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase()) || pokemon.id === Number(query);
    }).sort((a, b) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    })
    
    const cardElements = filteredPokemon.map(pokemon => {
      return  ( 
                <>
                  <NavLink 
                    to={`/${pokemon.id}`} 
                    style={{ textDecoration: 'none' }}
                    state={{ pokemon: pokemon }}
                  >
                    <Card
                      key={pokemon.id}
                      pokemon={pokemon}
                    /> 
                  </NavLink>    
                </>
              )
    })

    return (
        <div className="home-container">  
          <Header />
          <Search 
            query={query}
            onQueryChange={(myQuery) => setQuery(myQuery)}
            sortBy={sortBy}
            onSortByChange={(mySort) => setSortBy(mySort)}
          />
          <div 
            onScroll={onScroll}
            ref={pokemonListRef}
            className="cards-container"
          >
            {loading ? <pre>Loading, please wait...</pre> : cardElements}  
          </div>      
        </div>
    )
}

export default Home;