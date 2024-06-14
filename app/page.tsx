'use client'

import PokemonListScrollView from '@/components/PokemonListScrollView'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Home() {
    return (
        <div className="flex h-screen flex-col justify-between">
            <div className="p-8">
                <h1 className="text-2xl text-center">Your Pokedex</h1>
            </div>
            <div className="h-1 flex-1 overflow-hidden p-2">
                <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                    <Suspense fallback={<div>Loading Pokemons...</div>}>
                        <PokemonListScrollView />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    )
}
