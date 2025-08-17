import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css'
import HeaderController from './header-controller'

const AppHeader = () => {
    return (
        <header>
            <div className={headerStyles.app_header}>
                <div className={headerStyles.constructor_and_list_controllers}>
                    <HeaderController ComponentIcon={BurgerIcon} text={"Конструктор"} link={"/constructor"} />
                    <HeaderController ComponentIcon={ListIcon} text={"Лента заказов"} link={"/list_orders"} />
                </div>
                <Logo />
                <div className={headerStyles.profile_controller}>
                    <HeaderController ComponentIcon={ProfileIcon} text={"Личный кабинет"} link={"/profile"} />
                </div>
            </div>
        </header>
    )
}

export default AppHeader