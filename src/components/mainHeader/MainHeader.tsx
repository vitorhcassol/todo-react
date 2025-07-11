import './MainHeader.css'
import Icon from '@mdi/react'
import { mdiBellOutline, mdiGoogleCirclesExtended } from '@mdi/js'

function MainHeader() {
    const headerItems = [
        { icon: mdiBellOutline, label: 'Notifications', action: () => console.log('Notifications clicked') },
        { icon: mdiGoogleCirclesExtended, label: 'Home', action: () => console.log('Home clicked') },
    ]

    return (
        <div className="main-header-container">
            <div className="main-header-left">
                <div className="main-header-left-text">
                    <h3>Hello Jack,</h3>
                    <h4>You have work today</h4>
                </div>
            </div>
            <div className="main-header-right">
                <ul className="header-nav-list">
                    {headerItems.map((item, index) => (
                        <li key={index} className="header-nav-item">
                            <button 
                                className="header-nav-button"
                                onClick={item.action}
                            >
                                <Icon path={item.icon} size={1.2} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MainHeader;
