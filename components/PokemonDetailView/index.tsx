import { FC } from 'react'
import Image from 'next/image'

const PokemonDetailView: FC<Pokemon.Detail> = (pokemon) => {
    return (
        <div className="p-4">
            <h1>{pokemon.name}</h1>
            <Image
                width={210}
                height={210}
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <h2>Abilities</h2>
            <ul className="ml-2">
                {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name} className="capitalize">
                        {ability.ability.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PokemonDetailView
