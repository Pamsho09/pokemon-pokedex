export class PokemonResponse {
  description: PokemonDescription;
  stats: PokemonStat[];
  sprites: PokemonSprites;

  constructor(
    description: PokemonDescription,
    stats: PokemonStat[],
    sprites: PokemonSprites
  ) {
    this.description = description;
    this.stats = stats;
    this.sprites = sprites;
  }

  static fromJson(json: any): PokemonResponse {
 
    const { name, types, species, stats, sprites } = json;

    console.log({ name, types, species, stats, sprites })
    const description = new PokemonDescription(
      name,
      types?.map((item) => item?.type?.name)||[],
      species.name
    );

    const statsTransform = stats?.map(
      (item) => new PokemonStat(item?.stat?.name, item?.base_stat)
    );
    const spritesTransform = new PokemonSprites(
      sprites.front_default,
      sprites.front_shiny
    );

    return new PokemonResponse(description, statsTransform, spritesTransform);
  }
}

class PokemonSprites {
  front: string;
  frontShiny: string;

  constructor(front: string, frontShiny: string) {
    this.front = front;
    this.frontShiny = frontShiny;
  }
}

class PokemonStat {
  name: string;
  value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
class PokemonDescription {
  name: string;
  types: string[];
  Species: string;

  constructor(name: string, types: string[], Species: string) {
    this.name = name || "";
    this.types = types;
    this.Species = Species;
  }
}
