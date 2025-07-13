import headerControllerStyles from "./header-controller.module.css";

const HeaderController = ({ComponentIcon, text}) => {
    return (
        <button className={headerControllerStyles.header_btn_wrapper}>
            <ComponentIcon type="primary" />
            <p className="text text_type_main-default">
                {text}
            </p>
        </button>
    )
}

export default HeaderController;