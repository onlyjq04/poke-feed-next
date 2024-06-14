declare module Pokemon {
    type IndexResponse = {
        count: number
        next: string
        previous: string
        results: ListItem[]
    }
    type ListItem = {
        id: string
        name: string
        url: string
    }

    type Ability = {
        ability: {
            name: string
        },
        is_hidden: boolean
        slot: number
    }
    type Cries = {
        latest: string
        legacy: string
    }
    type Form = {
        name: string
    }
    type GameIndex = {
        game_index: number
        version: {
            name: string
        }
    }

    type Detail = {
        name: string
        order: number
        sprites: {
            front_default: string
        }
        abilities: Ability[]
        base_experience: number
        cries: Cries
        forms: Form[]
        game_indices: GameIndex[]
        height: number
        weight: number
    }
}