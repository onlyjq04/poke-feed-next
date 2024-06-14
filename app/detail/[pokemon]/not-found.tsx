'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PokemonNotFound() {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div>The Pokemon is Not Found</div>
            <Button variant={'default'}>
                <Link href={'/'}>Back to Home</Link>
            </Button>
        </div>
    )
}
