import {Link} from 'react-router-dom'
import headerControllerStyles from "./header-controller.module.css";

const HeaderController = ({ComponentIcon, text, link}) => {
    return (
        <Link className={headerControllerStyles.header_btn_wrapper} to={link}>
            <ComponentIcon type="primary" />
            <p className="text text_type_main-default">
                {text}
            </p>
        </Link>
    )
}

export default HeaderController;