import PokemonDetailView from '@/components/PokemonDetailView'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'

async function getPokemonDetail(
    pokemon: string
): Promise<Pokemon.Detail | null> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (!res.ok) {
        console.error(JSON.stringify(res))
        return null
    }
    return res.json()
}

const PokemonDetailPage: NextPage<{
    params: { pokemon: string }
}> = async (context) => {
    const data = await getPokemonDetail(context.params.pokemon)
    if (!data) {
        notFound()
    }
    return (
        <ErrorBoundary fallback={<div>Something went wrong here...</div>}>
            <PokemonDetailView {...data} />
        </ErrorBoundary>
    )
}

export default PokemonDetailPage
