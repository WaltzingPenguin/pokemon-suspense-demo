// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { derived } from 'svelte/store'
import { swr } from '@svelte-drama/swr'
import { suspend } from '@svelte-drama/swr/plugin'

function getIdFromUrl (url?: string) {
  if (url) {
    const parts = url.split('/')
    const id = parts[parts.length - 2]
    return parseInt(id, 10)
  }
}


export function getEvolutions (evolution_chain_id: string, species_id: string) {
  function getActiveLink (chain, species_id: string) {
    if (chain.species.name === species_id) {
      return chain.evolves_to
    }
  
    const link = chain.evolves_to.find(item => item.species.name === species_id)
    return link?.evolves_to
  }

  const { data } = swr(evolution_chain_id, {
    plugins: [suspend()]
  })

  return derived(data, $data => {
    if (!$data) return

    const link = getActiveLink($data.chain, species_id)
    return link?.map(item => getIdFromUrl(item.species.url)) as number[]
  })
}


export function getPokemon (id: number) {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${ id }/`
  const { data } = swr(url, {
    async fetcher (url) {
      const species = await fetch(url).then(r => r.json())
      return {
        id: species.name,
        default_variety: species.varieties.find(item => item.is_default).pokemon.url,
        description: species.flavor_text_entries.find(item => item.language.name === 'en').flavor_text.replace('', ' '),
        evolution_chain_id: species.evolution_chain.url,
        evolves_from: getIdFromUrl(species.evolves_from_species?.url),
        name: species.names.find(item => item.language.name === 'en').name
      }
    },
    plugins: [suspend()]
  })
  return data
}


export function getVariety (url: string) {
  const { data } = swr(url, {
    async fetcher (url) {
      const variety = await fetch(url).then(r => r.json())
      return {
        image: variety.sprites.front_default
      }
    },
    plugins: [suspend()]
  })
  return data
}
