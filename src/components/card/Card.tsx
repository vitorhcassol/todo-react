import Icon from '@mdi/react'
import './Card.css'

function darkenColor(color: string, amount: number = 0.1): string {
    const hex = color.replace('#', '');

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const darkerR = Math.round(r * (1 - amount));
    const darkerG = Math.round(g * (1 - amount));
    const darkerB = Math.round(b * (1 - amount));

    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
}

function Card({ item }: { item: any }) {
    return (
        <div className="card-container"
            onClick={item.action}
            style={{ backgroundColor: item.color }}
        >
            <div className="card-icon">
                <Icon path={item.icon} size={1.2} color={darkenColor(item.color)} />
            </div>
            <div className="card-text">
                <h2>{item.title}</h2>
                <h3>{item.count}</h3>
            </div>
        </div>
    )
}

export default Card;