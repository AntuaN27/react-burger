import {NavLink} from 'react-router-dom'
import headerControllerStyles from "./header-controller.module.css";

const HeaderController = ({ComponentIcon, text, link}) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? `${headerControllerStyles.header_btn_wrapper} ${headerControllerStyles.active_btn}`
                    : headerControllerStyles.header_btn_wrapper
        }
            to={link}
        >
            {({ isActive }) =>
                <>
                    <ComponentIcon type={isActive ? "primary": "secondary"} />
                    <p className="text text_type_main-default">
                        {text}
                    </p>
                </>
            }
        </NavLink>
    )
}

export default HeaderController;