export interface ChampionRelation {
    [key: string]: string;
}

export interface ChampionData {
    image: string;
    relation: ChampionRelation;
}

export interface ChampionMap {
    [key: string]: ChampionData;
}

export interface GraphViewProps {
    champ: Map<string, ChampionData>;
    champion: string;
}
