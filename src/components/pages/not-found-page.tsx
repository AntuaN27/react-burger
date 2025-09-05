import styles from "./not-found-page.module.css";

const NotFoundPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.error}>
                Ошибка 404
            </div>
            <div className={styles.info}>
                Страница не существует / находится в разработке.
            </div>
        </div>
    )
}

export default NotFoundPage;