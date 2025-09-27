import React from "react";
import {useNavigate} from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css'
import HeaderController from './header-controller'

const AppHeader = () => {
    const navigate = useNavigate();

    const homePage = () => {
        navigate("/");
    }

    return (
        <header>
            <div className={headerStyles.app_header}>
                <div className={headerStyles.constructor_and_list_controllers}>
                    <HeaderController ComponentIcon={BurgerIcon} text={"Конструктор"} link={"/"} />
                    <HeaderController ComponentIcon={ListIcon} text={"Лента заказов"} link={"/feed"} />
                </div>
                <button className={headerStyles.logo_btn} onClick={homePage}>
                    <Logo />
                </button>
                <div className={headerStyles.profile_controller}>
                    <HeaderController ComponentIcon={ProfileIcon} text={"Личный кабинет"} link={"/profile"} />
                </div>
            </div>
        </header>
    )
}

export default React.memo(AppHeader);