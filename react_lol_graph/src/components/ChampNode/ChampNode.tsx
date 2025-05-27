import type { GraphViewProps } from "../../types/champion";

export default function ChampNode({ champ, champion }: GraphViewProps) {
	console.log(champ?.get(champion)?.image);
	console.log(champion);
    return (
        <div>
            <img src={champ.get(champion)?.image} alt={champion}/>
        </div>
    );
}
