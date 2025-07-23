import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import appStyles from './App.module.css'

const App = () => {
    return (
        <>
        <header>
            <AppHeader />
        </header>
        <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
        </>
    )
}

export default App;