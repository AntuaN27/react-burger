import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import appStyles from './App.module.css'

const App = () => {
    return (
        <>
        <AppHeader />
        <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend} >
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </main>
        </>
    )
}

export default App;