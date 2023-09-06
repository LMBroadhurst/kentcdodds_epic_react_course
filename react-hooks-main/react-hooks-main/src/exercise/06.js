import * as React from 'react'
import {PokemonDataView, PokemonForm, PokemonInfoFallback, fetchPokemon} from '../pokemon'


class ErrorBoundary extends React.Component {

  state = {error: null}

  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    const {error} = this.state
    if (error) {
      return (
        <div role="alert">
          There was an error: 
          <pre style={{whiteSpace: 'normal'}}>
            {error.message}
          </pre>
        </div>
      )
    }
    console.log("ErrorBoundary Hit", this.state.error)
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  })

  const {status, pokemon, error} = state

  React.useEffect(() => {
    
    if (!pokemonName) return

    setState({status: 'pending'})

    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      }, 
      error => {
        setState({error, status: 'rejected'})
      })

  }, [pokemonName])


  if (!pokemonName) return 'Submit a pokemon'

  if (status === 'idle') {

    return 'Submit a pokemon'

  } else if (status === 'pending') {
  
    return <PokemonInfoFallback name={pokemonName} />

  } else if (status === 'resolved') {

    return <PokemonDataView pokemon={pokemon} />

  } else if (status === 'error') {
    
    return (
      <div role="alert">
        There was an error: 
        <pre style={{whiteSpace: 'normal'}}>{error.message}
        </pre>
      </div>
    )
  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
        <div className="pokemon-info">
          <ErrorBoundary>
            <PokemonInfo pokemonName={pokemonName}  />
          </ErrorBoundary>
        </div>
    </div>
  )
}

export default App
