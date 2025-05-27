import { cost, costInfo, rp } from "./Cost.css";

type CostType = {
    type: string;
    amount: string;
    width: string;
    height: string;
};

function RPChargeBtn() {
    return (
        <button
            style={{
                border: "1px solid #c9b77c",
                borderRadius: "50%",
                padding: "3px 7px",
                marginLeft: "10px",
                background: "#23282d",
                fontSize: "8px",
                color: "#c9b77c",
            }}>
            +
        </button>
    );
}

export default function Cost({ type, amount, width, height }: CostType) {
    return (
        <div className={`${cost} ${type === "RP" && rp}`}>
            <div className={costInfo}>
                <img
                    src={`/image/${type}.png`}
                    alt={type}
                    style={{
                        width: width + "px",
                        height: height + "px",
                    }}
                />
                <span
                    style={{
                        color: "white",
                        fontSize: "12px",
                        marginLeft: "5px",
                        letterSpacing: "1px",
                    }}>
                    {amount}
                </span>
            </div>
            {type === "RP" && <RPChargeBtn />}
        </div>
    );
}
