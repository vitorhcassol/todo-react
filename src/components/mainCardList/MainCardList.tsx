import { mdiClockAlert, mdiClock, mdiSyncCircle, mdiTimer } from "@mdi/js";
import Card from '../card/Card';
import './MainCardList.css';

function MainCardList() {
    const cardItems = [
        {
            title: 'Today',
            icon: mdiClock,
            count: 6,
            color: '#B4C4FE',
            action: () => console.log('Today clicked')
        },
        {
            title: 'Schedule',
            icon: mdiTimer,
            count: 5,
            color: '#FFF580',
            action: () => console.log('Schedule clicked')
        },
        {
            title: 'All',
            icon: mdiSyncCircle,
            count: 14,
            color: '#D0F4EA',
            action: () => console.log('All clicked')
        },
        {
            title: 'Overdue',
            icon: mdiClockAlert,
            count: 3,
            color: '#FFC0F5',
            action: () => console.log('Overdue clicked')
        }
    ]

    return (
        <div className="card-container-list">
            {cardItems.map((item, index) => (
                <Card key={index} item={item} />
            ))}
        </div>
    )
}

export default MainCardList;