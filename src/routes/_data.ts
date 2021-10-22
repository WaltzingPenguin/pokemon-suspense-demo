// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { derived } from 'svelte/store'
import { swr } from '$lib/swr'
import type { Readable } from 'svelte/store'


export function getEvolutions (url: string, species_id: string) {
  function getActiveLink (chain, species_id: string) {
    if (chain.species.name === species_id) {
      return chain.evolves_to
    }
  
    const link = chain.evolves_to.find(item => item.species.name === species_id)
    return link?.evolves_to
  }

  const { data } = swr(url, {
    suspend: true
  })
  return derived(data, $data => {
    if (!$data) return

    const link = getActiveLink($data.chain, species_id)
    return link?.map(item => item.species.url)
  }) as Readable<string[] | undefined>
}


export function getPokemon (url: string) {
  const fetcher = async url => {
    const species = await fetch(url).then(r => r.json())
    return {
      id: species.name,
      default_variety: species.varieties.find(item => item.is_default).pokemon.url,
      description: species.flavor_text_entries.find(item => item.language.name === 'en').flavor_text.replace('', ' '),
      evolution_chain: species.evolution_chain.url,
      evolves_from: species.evolves_from_species?.url,
      name: species.names.find(item => item.language.name === 'en').name
    }
  }

  const { data } = swr(url, {
    fetcher,
    suspend: true
  })
  return data
}


export function getVariety (url: string) {
  const fetcher = async url => {
    const variety = await fetch(url).then(r => r.json())
    return {
      image: variety.sprites.front_default
    }
  }

  const { data } = swr(url, {
    fetcher,
    suspend: true
  })
  return data
}
