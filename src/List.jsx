import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

function List () {
  const [names, setNames] = useState([]);


  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      if (response.ok) {
        const data = await response.json();
        console.log('data:', data);
        const nextNames = data.results.map((p) => p.name);
        setNames(nextNames);
      } else {
        console.error('bad response happened');
      }
    }

    fetchPokemon();
  }, [setNames]);

  return (
    <ListGroup>
      {
        names.map((name) => {
          return (
            <ListGroup.Item key={name}>
              {name}
            </ListGroup.Item>
          );
        })
      }
    </ListGroup>
  );
}

export default List;
