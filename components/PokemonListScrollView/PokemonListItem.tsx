import { FC } from 'react'
import { ArrowRightIcon } from '@radix-ui/react-icons'

interface PokemonListItemProps extends Pokemon.ListItem {
    onOpen: (name: string) => void
}

const PokemonListItem: FC<PokemonListItemProps> = ({ id, name, onOpen }) => {
    return (
        <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onOpen(name)}
        >
            <div>#{id}</div>
            <div className="capitalize">{name}</div>
            <div>
                <ArrowRightIcon />
            </div>
        </div>
    )
}

export default PokemonListItem
