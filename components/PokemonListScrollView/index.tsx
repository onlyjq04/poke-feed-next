import { FC, useEffect, useRef } from 'react'
import PokemonListItem from './PokemonListItem'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'
import { UpdateIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import debounce from 'lodash.debounce'

const LIMIT = 40

interface PokemonListScrollViewProps {
    className?: string
}

const PokemonListScrollView: FC<PokemonListScrollViewProps> = ({
    className,
}) => {
    const router = useRouter()
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useSuspenseInfiniteQuery<Pokemon.ListItem[]>({
            queryKey: ['pokemon-index'],
            getNextPageParam: (last, all) => {
                return last.length === LIMIT ? all.length * LIMIT : undefined
            },
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            queryFn: async ({ pageParam }) => {
                const res = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${LIMIT}`
                )
                if (!res.ok) {
                    throw new Error('Failed to fetch pokemons')
                }
                const resData: Pokemon.IndexResponse = await res.json()
                return resData.results.map((pokemon, idx) => {
                    return {
                        ...pokemon,
                        id: String((pageParam as number) + idx + 1).padStart(
                            4,
                            '0'
                        ),
                    }
                })
            },
            initialPageParam: 0,
        })

    const { ref: observerableRef, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // scroll restoration handling
    useEffect(() => {
        const handleScrolling = () => {
            const setLocalStorage = debounce(
                () =>
                    !!scrollContainerRef.current &&
                    localStorage.setItem(
                        'scrollPosition',
                        String(scrollContainerRef.current.scrollTop)
                    ),
                200,
                { leading: true }
            )
            setLocalStorage()
        }

        const restoreScrollPosition = () => {
            const scrollPosition = localStorage.getItem('scrollPosition')
            if (scrollPosition && scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = parseInt(
                    scrollPosition,
                    10
                )
            }
        }

        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener(
                'scroll',
                handleScrolling
            )
        }
        restoreScrollPosition()

        return () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener(
                    'scroll',
                    handleScrolling
                )
                localStorage.removeItem('scrollPosition')
            }
        }
    }, [])

    return (
        <div
            ref={scrollContainerRef}
            className={clsx(
                className,
                'h-full overflow-auto pb-6',
                'shadow-[inset_0_-6px_6px_-6px_rgba(0,0,0,0.4)]'
            )}
        >
            {data.pages.map((page) => {
                return page.map((pokemon) => {
                    return (
                        <PokemonListItem
                            key={pokemon.name}
                            {...pokemon}
                            onOpen={(pname) => router.push(`/detail/${pname}`)}
                        />
                    )
                })
            })}
            <div ref={observerableRef} />
            {isFetchingNextPage && (
                <div className="flex justify-center py-3">
                    <UpdateIcon className="animate-spin h-6 w-6 text-gray-400" />
                </div>
            )}
        </div>
    )
}

export default PokemonListScrollView
