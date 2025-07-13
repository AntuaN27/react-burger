import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css'
import HeaderController from './header-controller'

const AppHeader = () => {
    return (
        <div className={headerStyles.app_header}>
            <div className={headerStyles.constructor_and_list_controllers}>
                <HeaderController ComponentIcon={BurgerIcon} text={"Конструктор"} />
                <HeaderController ComponentIcon={ListIcon} text={"Лента заказов"} />
            </div>
            <Logo />
            <div className={headerStyles.profile_controller}>
                <HeaderController ComponentIcon={ProfileIcon} text={"Личный кабинет"} />
            </div>
        </div>
    )
}

export default AppHeader