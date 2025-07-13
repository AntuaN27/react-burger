import React, {useEffect, useState} from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import appStyles from './App.module.css'
import apiUrl from './utils/variables';

const App = () => {
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [countsIngredients, setCountsIngredients] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error("Ошибка при получении ингредиентов");
                }
                const data = await res.json();
                setData(data.data);
            } catch (error) {
                console.error("Ошибка при загрузке ингредиентов:", error);
            }
        };
        void getData();
    }, []);

    const handleAddIngredient = (ingredient) => {
        if (selectedIngredients.length === 0) {
            if (ingredient.type !== "bun") {
                alert("Сначала выберите булочку!");
                return false;
            }
        }

        if (ingredient.type === "bun" && selectedIngredients.find(ingredient => ingredient.type === "bun")) {
            alert("Булочка уже выбрана!");
            return false;
        }

        setSelectedIngredients([
            ...selectedIngredients,
            ingredient
        ]);
        setCountsIngredients(prev => ({
            ...prev,
            [ingredient._id]: (prev[ingredient._id] || 0) + 1
        }))
        return true;
    }

    const handleDeleteIngredient = (id) => {
        setSelectedIngredients(prev => prev.filter(ingredient => ingredient._id !== id))
        setCountsIngredients(prev => {
            const newCounts = {...prev};
            delete newCounts[id];
            return newCounts;
        })
    }

    return (
        <>
        <header>
            <AppHeader />
        </header>
        <main className={appStyles.main}>
            <BurgerIngredients data={data} countsIngredients={countsIngredients} onAdd={handleAddIngredient} />
            <BurgerConstructor ingredients={selectedIngredients} onDelete={handleDeleteIngredient} />
        </main>
        </>
    )
}

export default App;